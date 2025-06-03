import { supabase } from './supabase'

// Company interface matching our current localStorage structure
export interface Company {
  id: string
  name: string
  registrationNumber: string
  sector: string
  status: 'pending' | 'active' | 'suspended' | 'rejected'
  createdDate: string
  contactPerson: string
  email: string
  phone: string
  documentsStatus: 'pending' | 'approved' | 'rejected' | 'incomplete'
  lastActivity: string
  assignedManager: string
  fundingTarget?: number
  kycStatus: 'pending' | 'approved' | 'rejected'
  logo?: string
}

// Database service class
export class DatabaseService {
  private useSupabase: boolean

  constructor() {
    // Check if Supabase is configured
    this.useSupabase = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
    
    console.log('📊 Database Service Initialized:', {
      useSupabase: this.useSupabase,
      mode: this.useSupabase ? 'Supabase' : 'localStorage'
    })
    
    if (!this.useSupabase) {
      console.warn('⚠️ Supabase not configured. Using localStorage for data persistence.')
    }
  }

  // Company CRUD operations
  async getCompanies(): Promise<Company[]> {
    if (this.useSupabase) {
      return this.getCompaniesFromSupabase()
    } else {
      return this.getCompaniesFromLocalStorage()
    }
  }

  async createCompany(company: Omit<Company, 'id' | 'createdDate' | 'lastActivity'>): Promise<Company> {
    const newCompany: Company = {
      ...company,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }

    if (this.useSupabase) {
      return this.createCompanyInSupabase(newCompany)
    } else {
      return this.createCompanyInLocalStorage(newCompany)
    }
  }

  async updateCompany(id: string, updates: Partial<Company>): Promise<Company | null> {
    const updatedData = {
      ...updates,
      lastActivity: new Date().toISOString()
    }

    if (this.useSupabase) {
      return this.updateCompanyInSupabase(id, updatedData)
    } else {
      return this.updateCompanyInLocalStorage(id, updatedData)
    }
  }

  async deleteCompany(id: string): Promise<boolean> {
    if (this.useSupabase) {
      return this.deleteCompanyFromSupabase(id)
    } else {
      return this.deleteCompanyFromLocalStorage(id)
    }
  }

  // Supabase implementations
  private async getCompaniesFromSupabase(): Promise<Company[]> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select(`
          id,
          company_name,
          registration_number,
          sector,
          status,
          created_at,
          email,
          phone,
          updated_at
        `)

      if (error) {
        console.error('Error fetching companies from Supabase:', error)
        return []
      }

      // Transform Supabase data to match our Company interface
      return data.map((company: any) => ({
        id: company.id,
        name: company.company_name,
        registrationNumber: company.registration_number,
        sector: company.sector || '',
        status: this.mapSupabaseStatusToLocalStatus(company.status),
        createdDate: company.created_at,
        contactPerson: '', // We'll need to get this from user_profiles
        email: company.email || '',
        phone: company.phone || '',
        documentsStatus: 'pending', // We'll need to derive this from company_documents
        lastActivity: company.updated_at,
        assignedManager: '', // We'll need to implement this
        kycStatus: 'pending' // We'll need to derive this from kyc_status
      }))
    } catch (error) {
      console.error('Error in getCompaniesFromSupabase:', error)
      return []
    }
  }

  private async createCompanyInSupabase(company: Company): Promise<Company> {
    try {
      // First, we need to create a user account for the company
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: company.email,
        password: 'temp_password_123', // In real app, generate secure password
        options: {
          data: {
            role: 'company'
          }
        }
      })

      if (authError) {
        console.error('Error creating company user:', authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error('Failed to create user')
      }

      // Insert company data
      const { data, error } = await supabase
        .from('companies')
        .insert({
          user_id: authData.user.id,
          company_name: company.name,
          registration_number: company.registrationNumber,
          pan_number: company.registrationNumber, // Using registration as PAN for now
          sector: company.sector,
          email: company.email,
          phone: company.phone,
          status: this.mapLocalStatusToSupabaseStatus(company.status)
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating company in Supabase:', error)
        throw error
      }

      return {
        ...company,
        id: data.id
      }
    } catch (error) {
      console.error('Error in createCompanyInSupabase:', error)
      throw error
    }
  }

  private async updateCompanyInSupabase(id: string, updates: Partial<Company>): Promise<Company | null> {
    try {
      const supabaseUpdates: any = {}
      
      if (updates.name) supabaseUpdates.company_name = updates.name
      if (updates.sector) supabaseUpdates.sector = updates.sector
      if (updates.email) supabaseUpdates.email = updates.email
      if (updates.phone) supabaseUpdates.phone = updates.phone
      if (updates.status) supabaseUpdates.status = this.mapLocalStatusToSupabaseStatus(updates.status)

      const { data, error } = await supabase
        .from('companies')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating company in Supabase:', error)
        return null
      }

      // Return updated company in our format
      return {
        id: data.id,
        name: data.company_name,
        registrationNumber: data.registration_number,
        sector: data.sector || '',
        status: this.mapSupabaseStatusToLocalStatus(data.status),
        createdDate: data.created_at,
        contactPerson: '',
        email: data.email || '',
        phone: data.phone || '',
        documentsStatus: 'pending',
        lastActivity: data.updated_at,
        assignedManager: '',
        kycStatus: 'pending'
      }
    } catch (error) {
      console.error('Error in updateCompanyInSupabase:', error)
      return null
    }
  }

  private async deleteCompanyFromSupabase(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting company from Supabase:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deleteCompanyFromSupabase:', error)
      return false
    }
  }

  // localStorage implementations (fallback)
  private getCompaniesFromLocalStorage(): Company[] {
    try {
      const saved = localStorage.getItem('nepex_companies')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }

  private createCompanyInLocalStorage(company: Company): Company {
    try {
      const companies = this.getCompaniesFromLocalStorage()
      companies.push(company)
      localStorage.setItem('nepex_companies', JSON.stringify(companies))
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('refreshCompanies'))
      
      return company
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      throw error
    }
  }

  private updateCompanyInLocalStorage(id: string, updates: Partial<Company>): Company | null {
    try {
      const companies = this.getCompaniesFromLocalStorage()
      const index = companies.findIndex(c => c.id === id)
      
      if (index === -1) return null
      
      companies[index] = { ...companies[index], ...updates }
      localStorage.setItem('nepex_companies', JSON.stringify(companies))
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('refreshCompanies'))
      
      return companies[index]
    } catch (error) {
      console.error('Error updating localStorage:', error)
      return null
    }
  }

  private deleteCompanyFromLocalStorage(id: string): boolean {
    try {
      const companies = this.getCompaniesFromLocalStorage()
      const filtered = companies.filter(c => c.id !== id)
      
      localStorage.setItem('nepex_companies', JSON.stringify(filtered))
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('refreshCompanies'))
      
      return true
    } catch (error) {
      console.error('Error deleting from localStorage:', error)
      return false
    }
  }

  // Status mapping helpers
  private mapSupabaseStatusToLocalStatus(supabaseStatus: string): Company['status'] {
    switch (supabaseStatus) {
      case 'verified': return 'active'
      case 'pending_verification': return 'pending'
      case 'suspended': return 'suspended'
      case 'rejected': return 'rejected'
      default: return 'pending'
    }
  }

  private mapLocalStatusToSupabaseStatus(localStatus: Company['status']): string {
    switch (localStatus) {
      case 'active': return 'verified'
      case 'pending': return 'pending_verification'
      case 'suspended': return 'suspended'
      case 'rejected': return 'rejected'
      default: return 'pending_verification'
    }
  }

  // Utility methods
  isUsingSupabase(): boolean {
    return this.useSupabase
  }

  async testConnection(): Promise<boolean> {
    if (!this.useSupabase) return true // localStorage always works
    
    try {
      const { error } = await supabase.from('companies').select('count').limit(1)
      return !error
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const db = new DatabaseService() 