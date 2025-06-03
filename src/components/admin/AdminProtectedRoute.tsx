import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/store/adminAuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { adminUser, isLoading, hasPermission } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute; 