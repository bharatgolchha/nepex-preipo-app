import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/authContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  Calendar,
  Shield,
  TrendingUp,
  FileText
} from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  riskAcknowledgment: boolean;
}

const InvestorRegister: React.FC = () => {
  const navigate = useNavigate();
  const { registerInvestor, checkEmailAvailability, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    dateOfBirth: '',
    acceptTerms: false,
    acceptPrivacy: false,
    riskAcknowledgment: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'general', string>>>({});
  const [emailChecking, setEmailChecking] = useState(false);

  const validateStep = async () => {
    const newErrors: typeof errors = {};
    
    if (step === 1) {
      // Personal Information
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().split(' ').length < 2) {
        newErrors.fullName = 'Please enter your first and last name';
      }
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^(\+977[-.\s]?)?[0-9]{10}$/.test(formData.phone.replace(/[-.\s]/g, ''))) {
        newErrors.phone = 'Please enter a valid Nepalese phone number';
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          newErrors.dateOfBirth = 'You must be at least 18 years old to invest';
        }
      }
    } else if (step === 2) {
      // Account Details
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Check email availability
      if (!newErrors.email && formData.email) {
        setEmailChecking(true);
        try {
          const isAvailable = await checkEmailAvailability(formData.email);
          if (!isAvailable) {
            newErrors.email = 'This email is already registered. Please try signing in instead.';
          }
        } catch (error) {
          newErrors.email = 'Unable to verify email availability. Please try again.';
        } finally {
          setEmailChecking(false);
        }
      }
    } else if (step === 3) {
      // Terms and Risk Acknowledgment
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
      if (!formData.acceptPrivacy) {
        newErrors.acceptPrivacy = 'You must accept the privacy policy';
      }
      if (!formData.riskAcknowledgment) {
        newErrors.riskAcknowledgment = 'You must acknowledge the investment risks';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (await validateStep()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('🚀 Starting registration submission...');
      
      const result = await registerInvestor({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      });

      console.log('📋 Registration result:', result);

      if (result.success) {
        console.log('✅ Registration successful! Navigating to dashboard...');
        // Registration successful - redirect directly to dashboard (email verification disabled)
        navigate('/investor/dashboard');
      } else {
        console.error('❌ Registration failed:', result.error);
        setErrors({ general: result.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('❌ Unexpected registration error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
            <h2 className="text-2xl font-semibold text-gray-900">Create Investor Account</h2>
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
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
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
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Let's start with some basic information about you
                </p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className={errors.fullName ? 'border-red-500' : ''}
                    placeholder="First Last Name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+977-98XXXXXXXX"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      className={`pl-10 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                      max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                  <p className="mt-1 text-xs text-gray-500">You must be at least 18 years old</p>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Create your login credentials
                </p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    {emailChecking && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                      </div>
                    )}
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
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
                  <p className="mt-1 text-xs text-gray-500">
                    Must contain uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
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
                    disabled={emailChecking}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Terms and Risk Acknowledgment */}
          {step === 3 && (
            <div>
              <div className="text-center mb-6">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Terms & Risk Acknowledgment</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Please review and accept our terms
                </p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                {/* Risk Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm">
                      <h4 className="font-medium text-yellow-800 mb-2">Investment Risk Warning</h4>
                      <ul className="text-yellow-700 space-y-1">
                        <li>• Pre-IPO investments are high-risk and illiquid</li>
                        <li>• You may lose some or all of your investment</li>
                        <li>• Returns are not guaranteed</li>
                        <li>• Only invest money you can afford to lose</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Investment Benefits */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm">
                      <h4 className="font-medium text-blue-800 mb-2">Investment Opportunities</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Access to exclusive pre-IPO companies</li>
                        <li>• Professional due diligence and research</li>
                        <li>• Potential for higher returns</li>
                        <li>• Support for Nepal's growing economy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                      I accept the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500 underline">
                        Terms and Conditions
                      </Link>
                    </Label>
                  </div>
                  {errors.acceptTerms && <p className="text-sm text-red-600 ml-7">{errors.acceptTerms}</p>}

                  <div className="flex items-start">
                    <input
                      id="acceptPrivacy"
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={(e) => updateFormData('acceptPrivacy', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <Label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
                      I accept the{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.acceptPrivacy && <p className="text-sm text-red-600 ml-7">{errors.acceptPrivacy}</p>}

                  <div className="flex items-start">
                    <input
                      id="riskAcknowledgment"
                      type="checkbox"
                      checked={formData.riskAcknowledgment}
                      onChange={(e) => updateFormData('riskAcknowledgment', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <Label htmlFor="riskAcknowledgment" className="ml-3 text-sm text-gray-700">
                      I understand the risks involved in pre-IPO investments and acknowledge that I may lose my entire investment
                    </Label>
                  </div>
                  {errors.riskAcknowledgment && <p className="text-sm text-red-600 ml-7">{errors.riskAcknowledgment}</p>}
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

export default InvestorRegister; 