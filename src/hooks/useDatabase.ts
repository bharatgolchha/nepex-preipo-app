import { useState, useEffect, useCallback } from 'react'
import { db, Company } from '@/lib/database'

// Hook for company management
export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load companies
  const loadCompanies = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await db.getCompanies()
      setCompanies(data)
    } catch (err) {
      console.error('Error loading companies:', err)
      setError(err instanceof Error ? err.message : 'Failed to load companies')
    } finally {
      setLoading(false)
    }
  }, [])

  // Create company
  const createCompany = useCallback(async (companyData: Omit<Company, 'id' | 'createdDate' | 'lastActivity'>) => {
    try {
      setError(null)
      const newCompany = await db.createCompany(companyData)
      setCompanies(prev => [...prev, newCompany])
      return newCompany
    } catch (err) {
      console.error('Error creating company:', err)
      setError(err instanceof Error ? err.message : 'Failed to create company')
      throw err
    }
  }, [])

  // Update company
  const updateCompany = useCallback(async (id: string, updates: Partial<Company>) => {
    try {
      setError(null)
      const updatedCompany = await db.updateCompany(id, updates)
      if (updatedCompany) {
        setCompanies(prev => prev.map(c => c.id === id ? updatedCompany : c))
        return updatedCompany
      }
      return null
    } catch (err) {
      console.error('Error updating company:', err)
      setError(err instanceof Error ? err.message : 'Failed to update company')
      throw err
    }
  }, [])

  // Delete company
  const deleteCompany = useCallback(async (id: string) => {
    try {
      setError(null)
      const success = await db.deleteCompany(id)
      if (success) {
        setCompanies(prev => prev.filter(c => c.id !== id))
      }
      return success
    } catch (err) {
      console.error('Error deleting company:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete company')
      throw err
    }
  }, [])

  // Load companies on mount
  useEffect(() => {
    loadCompanies()
  }, [loadCompanies])

  // Listen for external updates (for localStorage compatibility)
  useEffect(() => {
    const handleRefresh = () => {
      loadCompanies()
    }

    window.addEventListener('refreshCompanies', handleRefresh)
    window.addEventListener('storage', handleRefresh)

    return () => {
      window.removeEventListener('refreshCompanies', handleRefresh)
      window.removeEventListener('storage', handleRefresh)
    }
  }, [loadCompanies])

  return {
    companies,
    loading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
    refresh: loadCompanies,
    isUsingSupabase: db.isUsingSupabase()
  }
}

// Hook for database connection status
export function useDatabaseStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isUsingSupabase, setIsUsingSupabase] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await db.testConnection()
      setIsConnected(connected)
      setIsUsingSupabase(db.isUsingSupabase())
    }

    checkConnection()
  }, [])

  return {
    isConnected,
    isUsingSupabase,
    connectionType: isUsingSupabase ? 'Supabase' : 'localStorage'
  }
} 