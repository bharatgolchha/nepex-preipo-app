import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Environment check - only log in development
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Environment Check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined'
  })
}

// Create Supabase client with better error handling
let supabase: any = null

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables not set. Using localStorage mode.')
    // Create a mock client that won't cause errors
    supabase = {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
        insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      })
    }
  } else {
    if (import.meta.env.DEV) {
      console.log('✅ Creating Supabase client...')
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
    if (import.meta.env.DEV) {
      console.log('✅ Supabase client created successfully')
    }
  }
} catch (error) {
  console.error('❌ Error creating Supabase client:', error)
  // Fallback to mock client
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase initialization failed') }),
      signIn: () => Promise.resolve({ data: null, error: new Error('Supabase initialization failed') })
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error('Supabase initialization failed') }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase initialization failed') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase initialization failed') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Supabase initialization failed') })
    })
  }
}

export { supabase }

// Database Types (based on your schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          role: 'investor' | 'company' | 'admin'
          status: 'active' | 'inactive' | 'suspended'
          email_verified: boolean
          phone_verified: boolean
          created_at: string
          updated_at: string
          last_login: string | null
          two_factor_enabled: boolean
          two_factor_secret: string | null
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          role: 'investor' | 'company' | 'admin'
          status?: 'active' | 'inactive' | 'suspended'
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
          two_factor_enabled?: boolean
          two_factor_secret?: string | null
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          role?: 'investor' | 'company' | 'admin'
          status?: 'active' | 'inactive' | 'suspended'
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
          two_factor_enabled?: boolean
          two_factor_secret?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          company_name: string
          registration_number: string
          pan_number: string
          established_date: string | null
          industry: string | null
          sector: string | null
          website: string | null
          email: string | null
          phone: string | null
          employee_count: number | null
          description: string | null
          vision: string | null
          mission: string | null
          target_market: string | null
          status: 'draft' | 'pending_verification' | 'verified' | 'rejected' | 'suspended'
          verified_by: string | null
          verified_at: string | null
          next_review_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          registration_number: string
          pan_number: string
          established_date?: string | null
          industry?: string | null
          sector?: string | null
          website?: string | null
          email?: string | null
          phone?: string | null
          employee_count?: number | null
          description?: string | null
          vision?: string | null
          mission?: string | null
          target_market?: string | null
          status?: 'draft' | 'pending_verification' | 'verified' | 'rejected' | 'suspended'
          verified_by?: string | null
          verified_at?: string | null
          next_review_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          registration_number?: string
          pan_number?: string
          established_date?: string | null
          industry?: string | null
          sector?: string | null
          website?: string | null
          email?: string | null
          phone?: string | null
          employee_count?: number | null
          description?: string | null
          vision?: string | null
          mission?: string | null
          target_market?: string | null
          status?: 'draft' | 'pending_verification' | 'verified' | 'rejected' | 'suspended'
          verified_by?: string | null
          verified_at?: string | null
          next_review_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add more table types as needed
    }
  }
}

// Type the supabase client
export type SupabaseClient = typeof supabase

// Helper functions for common operations
export const auth = supabase.auth
