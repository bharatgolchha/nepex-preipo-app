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

      // 1.5. Sign in the user immediately to establish auth context for RLS
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (signInError) {
        console.error('❌ Auto sign-in error:', signInError)
        // Continue anyway, we'll try the insert without auth context
      } else {
        console.log('✅ User signed in for RLS context')
      }

      // 2. Create user profile in public.users table
      console.log('📝 Attempting to create user profile for:', authData.user.id)
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
        console.error('❌ Error details:', JSON.stringify(userError, null, 2))
        return { success: false, error: 'Failed to create user profile: ' + userError.message }
      }

      console.log('✅ User profile created in public.users')

      // 3. Create detailed user profile
      console.log('📝 Attempting to create detailed user profile for:', authData.user.id)
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
        console.error('❌ Profile error details:', JSON.stringify(profileError, null, 2))
        // This is not critical, continue anyway
      } else {
        console.log('✅ Detailed user profile created')
      }

      // 4. Initialize KYC status
      console.log('📝 Attempting to initialize KYC status for:', authData.user.id)
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
        console.error('❌ KYC error details:', JSON.stringify(kycError, null, 2))
        // This is not critical, continue anyway
      } else {
        console.log('✅ KYC status initialized')
      }

      // 5. Create notification for welcome
      console.log('📝 Attempting to create welcome notification for:', authData.user.id)
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
        console.error('❌ Notification error details:', JSON.stringify(notificationError, null, 2))
        // This is not critical, continue anyway
      } else {
        console.log('✅ Welcome notification created')
      }

      const user: AuthUser = {
        id: authData.user.id,
        email: data.email,
        role: 'investor',
        emailVerified: !!authData.user.email_confirmed_at,
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


}

export const authService = new AuthService() 