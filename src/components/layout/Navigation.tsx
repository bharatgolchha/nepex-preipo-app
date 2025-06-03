import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authContext';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  User,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items based on user type
  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { path: '/', label: 'Home', icon: Home, userType: 'both' }
      ];
    }

    if (user?.userType === 'investor') {
      return [
        { path: '/investor/dashboard', label: 'Dashboard', icon: LayoutDashboard, userType: 'investor' },
        { path: '/investor/offerings', label: 'Browse Offerings', icon: TrendingUp, userType: 'investor' },
        { path: '/investor/portfolio', label: 'My Portfolio', icon: Briefcase, userType: 'investor' },
        { path: '/investor/profile', label: 'Profile', icon: User, userType: 'investor' },
      ];
    } else if (user?.userType === 'company') {
      return [
        { path: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard, userType: 'company' },
        { path: '/company/profile', label: 'Company Profile', icon: User, userType: 'company' },
      ];
    }

    return [
      { path: '/', label: 'Home', icon: Home, userType: 'both' }
    ];
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
            <Link 
              to={isAuthenticated ? (user?.userType === 'investor' ? '/investor/dashboard' : user?.userType === 'company' ? '/company/dashboard' : '/') : '/'} 
              className="text-xl font-bold text-blue-600"
            >
              NepEx
            </Link>
            {/* Desktop Navigation */}
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
          
          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
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
                <span className="text-sm text-gray-600">
                  Welcome, {user?.userType === 'investor' ? 'Investor' : 'Company'} User
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              
              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, {user?.userType === 'investor' ? 'Investor' : 'Company'} User
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/auth/register"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;