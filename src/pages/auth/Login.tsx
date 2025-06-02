import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  LogIn,
  Building2,
  User
} from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'investor' | 'company' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!userType) {
      newErrors.general = 'Please select whether you are an investor or company';
      setErrors(newErrors);
      return;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would make an API call to authenticate
      console.log('Login attempt:', { ...formData, userType });
      
      // Navigate based on user type
      if (userType === 'investor') {
        navigate('/investor/dashboard');
      } else {
        navigate('/company/dashboard');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Back Button */}
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">NepEx</h1>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Sign in to access your account
            </p>
          </div>
        </div>

        {/* User Type Selection */}
        {!userType && (
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">I am a...</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('investor')}
                className="p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <User className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Investor</p>
                <p className="text-sm text-gray-500 mt-1">Access investment opportunities</p>
              </button>
              <button
                onClick={() => setUserType('company')}
                className="p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <Building2 className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Company</p>
                <p className="text-sm text-gray-500 mt-1">Raise pre-IPO funding</p>
              </button>
            </div>
          </Card>
        )}

        {/* Login Form */}
        {userType && (
          <Card className="p-8">
            <div className="mb-6">
              <button
                onClick={() => setUserType(null)}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Change user type
              </button>
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                Sign in as {userType === 'investor' ? 'Investor' : 'Company'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="mt-1 relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@example.com"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </Label>
                </div>

                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Investor: investor@demo.com / demo123</p>
                  <p>Company: company@demo.com / demo123</p>
                </div>
              </div>
            </form>
          </Card>
        )}

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center text-sm text-gray-500">
          <Link to="/terms" className="hover:text-gray-700">Terms</Link>
          <span className="mx-2">•</span>
          <Link to="/privacy" className="hover:text-gray-700">Privacy</Link>
          <span className="mx-2">•</span>
          <Link to="/help" className="hover:text-gray-700">Help</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;