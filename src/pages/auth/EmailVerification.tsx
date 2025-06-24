import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authContext';
import {
  Mail,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, resendEmailVerification, logout } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  // Get email from location state or user
  const email = location.state?.email || user?.email;

  useEffect(() => {
    // If no email or user is already verified, redirect
    if (!email) {
      navigate('/auth/login');
      return;
    }

    if (user?.emailVerified) {
      navigate('/investor/dashboard');
      return;
    }

    // Check verification status every 5 seconds
    const interval = setInterval(async () => {
      if (user && !user.emailVerified) {
        setIsChecking(true);
        // Refresh user data to check verification status
        window.location.reload();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [email, user, navigate]);

  const handleResendEmail = async () => {
    if (!email) return;

    setIsResending(true);
    setResendMessage('');

    try {
      const result = await resendEmailVerification(email);
      if (result.success) {
        setResendMessage('Verification email sent! Please check your inbox and spam folder.');
      } else {
        setResendMessage(result.error || 'Failed to resend verification email.');
      }
    } catch (error) {
      setResendMessage('An error occurred while resending the email.');
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            onClick={handleBackToLogin}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification link to your email address
          </p>
        </div>

        <Card className="p-8">
          <div className="text-center space-y-6">
            {/* Email Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>

            {/* Email Address */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Verification email sent to:</p>
              <p className="text-lg font-semibold text-gray-900 break-all">{email}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <h4 className="font-medium text-blue-900">What's Next?</h4>
                    <ul className="mt-2 text-sm text-blue-800 space-y-1">
                      <li>• Check your email inbox for our verification message</li>
                      <li>• Don't forget to check your spam/junk folder</li>
                      <li>• Click the verification link in the email</li>
                      <li>• You'll be automatically redirected to your dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Checking */}
              {isChecking && (
                <div className="flex items-center justify-center space-x-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Checking verification status...</span>
                </div>
              )}

              {/* Resend Section */}
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Didn't receive the email?
                </p>
                
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  variant="outline"
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                {resendMessage && (
                  <div className={`flex items-start space-x-2 p-3 rounded-lg ${
                    resendMessage.includes('sent') 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {resendMessage.includes('sent') ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    )}
                    <p className={`text-sm ${
                      resendMessage.includes('sent') ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {resendMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Troubleshooting Tips:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your spam/junk/promotions folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• Add noreply@supabase.io to your contacts</li>
                <li>• The verification link expires after 24 hours</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="text-blue-600 hover:text-blue-500">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 