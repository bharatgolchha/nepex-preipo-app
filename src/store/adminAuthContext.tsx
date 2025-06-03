import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'account_manager' | 'compliance_officer';
  department: string;
  permissions: string[];
  lastLogin?: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_PERMISSIONS = {
  super_admin: [
    'companies.create',
    'companies.edit',
    'companies.delete',
    'companies.approve',
    'companies.suspend',
    'documents.verify',
    'users.manage',
    'settings.manage',
    'audit.view'
  ],
  account_manager: [
    'companies.create',
    'companies.edit',
    'companies.view',
    'documents.upload',
    'companies.contact'
  ],
  compliance_officer: [
    'companies.view',
    'companies.approve',
    'companies.suspend',
    'documents.verify',
    'audit.view'
  ]
};

// Mock admin users for demo
const MOCK_ADMINS = [
  {
    id: '1',
    email: 'admin@nepex.com',
    name: 'Ram Prasad Sharma',
    role: 'super_admin' as const,
    department: 'Operations',
    permissions: ADMIN_PERMISSIONS.super_admin,
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'manager@nepex.com',
    name: 'Sita Devi Thapa',
    role: 'account_manager' as const,
    department: 'Business Development',
    permissions: ADMIN_PERMISSIONS.account_manager,
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    email: 'compliance@nepex.com',
    name: 'Hari Bahadur Rai',
    role: 'compliance_officer' as const,
    department: 'Compliance',
    permissions: ADMIN_PERMISSIONS.compliance_officer,
    lastLogin: '2024-01-15T11:45:00Z'
  }
];

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = localStorage.getItem('nepex_admin_user');
    if (storedAdmin) {
      try {
        setAdminUser(JSON.parse(storedAdmin));
      } catch (error) {
        localStorage.removeItem('nepex_admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find admin user
    const admin = MOCK_ADMINS.find(a => a.email === email);
    
    if (!admin || password !== 'admin123') {
      throw new Error('Invalid credentials');
    }
    
    const adminWithLogin = {
      ...admin,
      lastLogin: new Date().toISOString()
    };
    
    setAdminUser(adminWithLogin);
    localStorage.setItem('nepex_admin_user', JSON.stringify(adminWithLogin));
    setIsLoading(false);
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('nepex_admin_user');
  };

  const hasPermission = (permission: string): boolean => {
    return adminUser?.permissions.includes(permission) || false;
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      isLoading,
      login,
      logout,
      hasPermission
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}; 