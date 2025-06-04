import { supabase } from './supabase'

export interface InvestorRegistrationData {
  email: string
  password: string
  fullName: string
  phone: string
  dateOfBirth: string
}

export interface AuthUser {
  id: string
  email: string
  role: 'investor' | 'company' | 'admin'
  emailVerified: boolean
  profile?: {
    firstName: string
    lastName: string
    phone?: string
    dateOfBirth?: string
  }
}

export class AuthService {
  /**
   * Development helper: Auto-verify email for testing
   */
  private async autoVerifyEmailInDev(userId: string): Promise<void> {
    if (import.meta.env.DEV) {
      try {
        console.log('🔧 Development mode: Auto-verifying email for user:', userId)
        await supabase.rpc('verify_user_email', { user_id: userId })
      } catch (error) {
        console.log('📧 Note: Email auto-verification failed, but this is normal in development')
        // Don't throw error - this is just a dev convenience
      }
    }
  }

  /**
   * Create a new investor account in Supabase
   */
  async createInvestorAccount(data: InvestorRegistrationData): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      console.log('🚀 Starting clean registration for:', data.email)
      
      // Check if email is already registered in our database
      const emailExists = await this.isEmailRegistered(data.email)
      if (emailExists) {
        return { 
          success: false, 
          error: 'An account with this email already exists. Please try signing in instead.' 
        }
      }
      
      // Split full name into first and last name
      const nameParts = data.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: 'investor',
            first_name: firstName,
            last_name: lastName
          }
        }
      })

      if (authError) {
        console.error('❌ Auth signup error:', authError)
        if (authError.message.includes('User already registered')) {
          return { success: false, error: 'An account with this email already exists. Please try signing in instead.' }
        }
        if (authError.message.includes('too many requests') || authError.status === 429) {
          return { success: false, error: 'Too many registration attempts. Please wait a few minutes and try again.' }
        }
        if (authError.message.includes('email_address_invalid') || authError.code === 'email_address_invalid') {
          return { success: false, error: 'Please enter a valid email address.' }
        }
        if (authError.message.includes('password')) {
          return { success: false, error: 'Password must be at least 6 characters long.' }
        }
        return { success: false, error: authError.message }
      }

      if (!authData.user) {
        return { success: false, error: 'Failed to create user account' }
      }

      console.log('✅ Auth user created:', authData.user.id)

      // 2. Create user profile - simple direct insertion (RLS disabled)
      console.log('📝 Creating user profile in database...')
      
      try {
        // Insert/update user record
        const { error: usersError } = await supabase.from('users').upsert({
          id: authData.user.id,
          email: data.email,
          phone: data.phone,
          role: 'investor',
          status: 'active',
          email_verified: false,
          phone_verified: false
        }, { onConflict: 'id' })

        if (usersError) throw usersError

        // Insert into user_profiles table (check for existing record first)
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', authData.user.id)
          .single()

        if (existingProfile) {
          // Update existing profile
          const { error: profilesError } = await supabase
            .from('user_profiles')
            .update({
              first_name: firstName,
              last_name: lastName,
              date_of_birth: data.dateOfBirth,
              nationality: 'Nepalese'
            })
            .eq('user_id', authData.user.id)
          
          if (profilesError) throw profilesError
        } else {
          // Insert new profile
          const { error: profilesError } = await supabase.from('user_profiles').insert({
            user_id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: data.dateOfBirth,
            nationality: 'Nepalese'
          })
          
          if (profilesError) throw profilesError
        }

        // Insert into kyc_status table (with conflict handling)
        const { error: kycError } = await supabase.from('kyc_status').upsert({
          user_id: authData.user.id,
          overall_status: 'not_started',
          personal_info_complete: false,
          address_verified: false,
          documents_uploaded: false,
          documents_verified: false,
          risk_assessment_complete: false
        }, { onConflict: 'user_id' })

        if (kycError) throw kycError

        // Insert welcome notification (ignore conflicts)
        await supabase.from('notifications').insert({
          user_id: authData.user.id,
          type: 'system_update',
          title: 'Welcome to NepEx!',
          message: 'Your investor account has been created successfully. Please complete your KYC verification to start investing.',
          priority: 'medium'
        })

        console.log('✅ All profile data created successfully!')

      } catch (profileError: any) {
        console.error('❌ Profile creation failed:', profileError)
        return { success: false, error: 'Failed to create user profile: ' + (profileError.message || 'Unknown error') }
      }

      console.log('✅ Investor account created successfully!')
      console.log('🚀 Email verification disabled - signing user in directly')
      
      // Sign in the user automatically (skip email verification for development)
      const signInResult = await this.signIn(data.email, data.password)
      if (signInResult.success && signInResult.user) {
        return { success: true, user: signInResult.user }
      }
      
      return { success: true }
      
    } catch (error) {
      console.error('❌ Unexpected error in createInvestorAccount:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Sign in existing user (email verification disabled for development)
   */
  async signIn(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // In development, bypass email confirmation errors
        if (error.message === 'Email not confirmed' && import.meta.env.DEV) {
          console.log('🔧 Development mode: Bypassing email confirmation requirement')
          
          // Try to get user info directly from database
          const { data: userRecord, error: userError } = await supabase
            .from('users')
            .select(`
              id,
              email,
              role,
              phone,
              user_profiles (
                first_name,
                last_name,
                date_of_birth
              )
            `)
            .eq('email', email)
            .single()
            
          if (userError || !userRecord) {
            return { success: false, error: 'User not found in database' }
          }
          
          // Create user object for development bypass
          const user: AuthUser = {
            id: userRecord.id,
            email: userRecord.email,
            role: userRecord.role,
            emailVerified: false, // We know it's not verified, but we're bypassing
            profile: userRecord.user_profiles ? {
              firstName: userRecord.user_profiles.first_name || '',
              lastName: userRecord.user_profiles.last_name || '',
              phone: userRecord.phone || '',
              dateOfBirth: userRecord.user_profiles.date_of_birth || ''
            } : {
              firstName: '',
              lastName: '',
              phone: userRecord.phone || '',
              dateOfBirth: ''
            }
          }
          
          console.log('✅ Development bypass successful')
          return { success: true, user }
        }
        return { success: false, error: error.message }
      }

      if (!data.user) {
        return { success: false, error: 'Failed to sign in' }
      }

      // Get user profile from database
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select(`
          id,
          email,
          role,
          phone,
          user_profiles (
            first_name,
            last_name,
            date_of_birth
          )
        `)
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('Error fetching user profile:', profileError)
        return { success: false, error: 'Failed to load user profile' }
      }

      const user: AuthUser = {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        emailVerified: !!data.user.email_confirmed_at,
        profile: userProfile.user_profiles ? {
          firstName: userProfile.user_profiles.first_name || '',
          lastName: userProfile.user_profiles.last_name || '',
          phone: userProfile.phone || '',
          dateOfBirth: userProfile.user_profiles.date_of_birth || ''
        } : {
          firstName: '',
          lastName: '',
          phone: userProfile.phone || '',
          dateOfBirth: ''
        }
      }

      return { success: true, user }
    } catch (error) {
      console.error('Unexpected error in signIn:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await supabase.auth.signOut()
  }

  /**
   * Get current session
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        return null
      }

      // Get user profile from database
      const { data: userProfile, error } = await supabase
        .from('users')
        .select(`
          id,
          email,
          role,
          phone,
          user_profiles (
            first_name,
            last_name,
            date_of_birth
          )
        `)
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching current user profile:', error)
        return null
      }

      return {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        emailVerified: !!session.user.email_confirmed_at,
        profile: userProfile.user_profiles ? {
          firstName: userProfile.user_profiles.first_name || '',
          lastName: userProfile.user_profiles.last_name || '',
          phone: userProfile.phone || '',
          dateOfBirth: userProfile.user_profiles.date_of_birth || ''
        } : {
          firstName: '',
          lastName: '',
          phone: userProfile.phone || '',
          dateOfBirth: ''
        }
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Check if email is already registered
   */
  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking email:', error)
        return false
      }

      return !!data
    } catch (error) {
      console.error('Unexpected error checking email:', error)
      return false
    }
  }

  /**
   * Resend email verification
   */
  async resendEmailVerification(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Error resending verification email:', error)
      return { success: false, error: 'Failed to resend verification email' }
    }
  }

}

export const authService = new AuthService() 