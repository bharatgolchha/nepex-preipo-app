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
  profile?: {
    firstName: string
    lastName: string
    phone?: string
    dateOfBirth?: string
  }
}

export class AuthService {
  /**
   * Create a new investor account in Supabase
   */
  async createInvestorAccount(data: InvestorRegistrationData): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      console.log('🚀 Creating investor account for:', data.email)
      
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
        return { success: false, error: authError.message }
      }

      if (!authData.user) {
        return { success: false, error: 'Failed to create user account' }
      }

      console.log('✅ Auth user created:', authData.user.id)

      // 2. Create user profile in public.users table
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: data.email,
          phone: data.phone,
          role: 'investor',
          status: 'active',
          email_verified: false,
          phone_verified: false
        })

      if (userError) {
        console.error('❌ User profile creation error:', userError)
        return { success: false, error: 'Failed to create user profile' }
      }

      console.log('✅ User profile created in public.users')

      // 3. Create detailed user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: data.dateOfBirth,
          nationality: 'Nepalese'
        })

      if (profileError) {
        console.error('❌ User profile creation error:', profileError)
        // This is not critical, continue anyway
      } else {
        console.log('✅ Detailed user profile created')
      }

      // 4. Initialize KYC status
      const { error: kycError } = await supabase
        .from('kyc_status')
        .insert({
          user_id: authData.user.id,
          overall_status: 'not_started',
          personal_info_complete: false,
          address_verified: false,
          documents_uploaded: false,
          documents_verified: false,
          risk_assessment_complete: false
        })

      if (kycError) {
        console.error('❌ KYC status creation error:', kycError)
        // This is not critical, continue anyway
      } else {
        console.log('✅ KYC status initialized')
      }

      // 5. Create notification for welcome
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: authData.user.id,
          type: 'system_update',
          title: 'Welcome to NepEx!',
          message: 'Your investor account has been created successfully. Please complete your KYC verification to start investing.',
          priority: 'medium'
        })

      if (notificationError) {
        console.error('❌ Welcome notification error:', notificationError)
        // This is not critical, continue anyway
      }

      const user: AuthUser = {
        id: authData.user.id,
        email: data.email,
        role: 'investor',
        profile: {
          firstName,
          lastName,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth
        }
      }

      console.log('✅ Investor account created successfully!')
      return { success: true, user }
      
    } catch (error) {
      console.error('❌ Unexpected error in createInvestorAccount:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Sign in existing user
   */
  async signIn(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
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
          user_profiles (
            first_name,
            last_name,
            date_of_birth,
            phone
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
        profile: userProfile.user_profiles ? {
          firstName: userProfile.user_profiles.first_name || '',
          lastName: userProfile.user_profiles.last_name || '',
          phone: userProfile.user_profiles.phone || '',
          dateOfBirth: userProfile.user_profiles.date_of_birth || ''
        } : undefined
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
          user_profiles (
            first_name,
            last_name,
            date_of_birth,
            phone
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
        profile: userProfile.user_profiles ? {
          firstName: userProfile.user_profiles.first_name || '',
          lastName: userProfile.user_profiles.last_name || '',
          phone: userProfile.user_profiles.phone || '',
          dateOfBirth: userProfile.user_profiles.date_of_birth || ''
        } : undefined
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
}

export const authService = new AuthService() 