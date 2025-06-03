import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';

interface FormData {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
  
  // Investor specific
  fullName?: string;
  dateOfBirth?: string;
  
  // Company specific
  companyName?: string;
  registrationNumber?: string;
  establishedDate?: string;
  contactPersonName?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'investor' | 'company' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'general', string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep = () => {
    const newErrors: typeof errors = {};
    
    if (step === 1) {
      if (!userType) {
        newErrors.general = 'Please select user type';
      }
    } else if (step === 2) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (step === 3) {
      if (userType === 'investor') {
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.contactPersonName) newErrors.contactPersonName = 'Contact person name is required';
      }
      
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', { ...formData, userType });
      
      // Show success message and redirect to login
      alert('Registration successful! Please check your email to verify your account.');
      navigate('/auth/login');
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
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
            <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join Nepal's premier pre-IPO investment platform
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                {i < step ? <CheckCircle className="h-5 w-5" /> : i}
              </div>
              {i < 3 && <div className={`w-16 h-0.5 ${i < step ? 'bg-blue-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>

        <Card className="p-8">
          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Select Account Type</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setUserType('investor')}
                  className={`w-full p-6 border-2 rounded-lg transition-colors text-left ${
                    userType === 'investor'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <User className={`h-12 w-12 ${userType === 'investor' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">Individual Investor</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Invest in pre-IPO opportunities starting from NPR 10,000
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType('company')}
                  className={`w-full p-6 border-2 rounded-lg transition-colors text-left ${
                    userType === 'company'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <Building2 className={`h-12 w-12 ${userType === 'company' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium text-gray-900">Company</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Raise pre-IPO funding from verified investors
                      </p>
                      <Link 
                        to="/auth/company-register" 
                        className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Use detailed company registration →
                      </Link>
                    </div>
                  </div>
                </button>
              </div>
              
              {errors.general && (
                <p className="mt-4 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.general}
                </p>
              )}

              <Button
                onClick={handleNext}
                className="w-full mt-6"
                size="lg"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Account Details</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+977-98XXXXXXXX"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
                      placeholder="Minimum 8 characters"
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

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Re-enter password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Personal/Company Info */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {userType === 'investor' ? 'Personal Information' : 'Company Information'}
              </h3>
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                {userType === 'investor' ? (
                  <>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName || ''}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={errors.fullName ? 'border-red-500' : ''}
                        placeholder="As per citizenship"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className={errors.dateOfBirth ? 'border-red-500' : ''}
                      />
                      {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName || ''}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={errors.companyName ? 'border-red-500' : ''}
                        placeholder="Registered company name"
                      />
                      {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input
                        id="registrationNumber"
                        value={formData.registrationNumber || ''}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        className={errors.registrationNumber ? 'border-red-500' : ''}
                        placeholder="Company registration number"
                      />
                      {errors.registrationNumber && <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="contactPersonName">Contact Person Name</Label>
                      <Input
                        id="contactPersonName"
                        value={formData.contactPersonName || ''}
                        onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                        className={errors.contactPersonName ? 'border-red-500' : ''}
                        placeholder="Primary contact name"
                      />
                      {errors.contactPersonName && <p className="mt-1 text-sm text-red-600">{errors.contactPersonName}</p>}
                    </div>
                  </>
                )}

                {/* Terms and Conditions */}
                <div className="mt-6">
                  <div className="flex items-start">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                        Terms and Conditions
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
                </div>

                {/* KYC Notice */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All accounts require KYC verification as per standard
                    investment platform requirements. You'll need to submit documents after registration.
                  </p>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;