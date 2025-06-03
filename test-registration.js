// Simple test script to validate investor registration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yscjphjknufvxzjqwaqn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzY2pwaGprbnVmdnhqcXdhcW4iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzIyNzM5MSwiZXhwIjoyMDQ4ODAzMzkxfQ.XBdKf8gfCfaLlbhK8FfS1q8NkKYOl-_MJjyWdl5ZYBI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testRegistration() {
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'TestPassword123!',
    fullName: 'Test User',
    phone: '+977-9841234567',
    dateOfBirth: '1995-01-01'
  }

  console.log('🧪 Testing registration for:', testUser.email)

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          role: 'investor',
          first_name: 'Test',
          last_name: 'User'
        }
      }
    })

    if (authError) {
      console.error('❌ Auth error:', authError)
      return
    }

    console.log('✅ Auth user created:', authData.user.id)

    // 2. Create public.users record
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: testUser.email,
        phone: testUser.phone,
        role: 'investor',
        status: 'active',
        email_verified: false,
        phone_verified: false
      })

    if (userError) {
      console.error('❌ User profile error:', userError)
      return
    }

    console.log('✅ Public user record created')

    // 3. Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: authData.user.id,
        first_name: 'Test',
        last_name: 'User',
        date_of_birth: testUser.dateOfBirth,
        nationality: 'Nepalese'
      })

    if (profileError) {
      console.error('❌ Profile error:', profileError)
    } else {
      console.log('✅ User profile created')
    }

    // 4. Initialize KYC
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
      console.error('❌ KYC error:', kycError)
    } else {
      console.log('✅ KYC status initialized')
    }

    console.log('🎉 Registration test completed successfully!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testRegistration() 