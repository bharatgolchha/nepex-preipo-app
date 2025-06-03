import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authContext';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  User,
  Home,
  LogOut
} from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Define navigation items based on user type
  const getNavItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home, userType: 'both' }
    ];

    if (!isAuthenticated) {
      return baseItems;
    }

    if (user?.userType === 'investor') {
      return [
        ...baseItems,
        { path: '/investor/dashboard', label: 'Dashboard', icon: LayoutDashboard, userType: 'investor' },
        { path: '/investor/offerings', label: 'Browse Offerings', icon: TrendingUp, userType: 'investor' },
        { path: '/investor/portfolio', label: 'My Portfolio', icon: Briefcase, userType: 'investor' },
        { path: '/investor/profile', label: 'Profile', icon: User, userType: 'investor' },
      ];
    } else if (user?.userType === 'company') {
      return [
        ...baseItems,
        { path: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard, userType: 'company' },
        { path: '/company/profile', label: 'Company Profile', icon: User, userType: 'company' },
      ];
    }

    return baseItems;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              NepEx
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600 hidden md:inline">
                  Welcome, {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;