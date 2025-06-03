import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/authContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'investor' | 'company';
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
  requireAuth = true
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If specific user type is required but user doesn't match
  if (requiredUserType && user?.userType !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = user?.userType === 'investor' ? '/investor/dashboard' : '/company/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
