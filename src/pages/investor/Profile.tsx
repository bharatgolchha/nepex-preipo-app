import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/authContext';
import {
  User,
  MapPin,
  Calendar,
  Building2,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit2,
  Save,
  X
} from 'lucide-react';

// Sample user data
const userData = {
  personalInfo: {
    fullName: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '+977-9841234567',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    citizenshipNumber: '12-34-56-78901',
    panNumber: '123456789'
  },
  address: {
    permanent: {
      province: 'Bagmati',
      district: 'Kathmandu',
      municipality: 'Kathmandu Metropolitan City',
      ward: '16',
      tole: 'Baneshwor',
      houseNumber: '123'
    },
    current: {
      sameAsPermanent: true
    }
  },
  investmentProfile: {
    investorType: 'Retail Investor',
    annualIncome: 'NPR 10,00,000 - 25,00,000',
    sourceOfFunds: 'Salary/Business Income',
    investmentExperience: '3-5 years',
    riskTolerance: 'Moderate'
  },
  kycStatus: {
    status: 'approved',
    verifiedDate: '2024-01-15',
    expiryDate: '2025-01-15'
  },
  accountStatus: {
    emailVerified: true,
    phoneVerified: true,
    twoFactorEnabled: false,
    diasporaAccount: false
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    investmentAlerts: true,
    newsletterSubscription: true
  }
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [activeSection, setActiveSection] = useState<'personal' | 'investment' | 'security' | 'preferences'>('personal');

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving profile data:', editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        {/* KYC Status Card */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">KYC Verified</p>
                <p className="text-sm text-gray-600">
                  Verified on {new Date(userData.kycStatus.verifiedDate).toLocaleDateString()} " 
                  Expires on {new Date(userData.kycStatus.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View KYC Details
            </Button>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'investment', label: 'Investment Profile', icon: Building2 },
              { id: 'security', label: 'Security', icon: Calendar },
              { id: 'preferences', label: 'Preferences', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeSection === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Personal Information Section */}
        {activeSection === 'personal' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editedData.personalInfo.fullName}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      personalInfo: { ...editedData.personalInfo, fullName: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || editedData.personalInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        personalInfo: { ...editedData.personalInfo, email: e.target.value }
                      })}
                    />
                    <div className="flex items-center gap-1">
                      {/* Email verification disabled for development - show as verified */}
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-green-600">Active</span>
                    </div>
                  </div>
                  {/* Email verification message removed - disabled for development */}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      value={editedData.personalInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        personalInfo: { ...editedData.personalInfo, phone: e.target.value }
                      })}
                    />
                    {userData.accountStatus.phoneVerified && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={editedData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      personalInfo: { ...editedData.personalInfo, dateOfBirth: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="citizenship">Citizenship Number</Label>
                  <Input
                    id="citizenship"
                    value={editedData.personalInfo.citizenshipNumber}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    value={editedData.personalInfo.panNumber}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Permanent Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Province</Label>
                    <Input value={userData.address.permanent.province} disabled />
                  </div>
                  <div>
                    <Label>District</Label>
                    <Input value={userData.address.permanent.district} disabled />
                  </div>
                  <div>
                    <Label>Municipality</Label>
                    <Input value={userData.address.permanent.municipality} disabled />
                  </div>
                  <div>
                    <Label>Ward No.</Label>
                    <Input value={userData.address.permanent.ward} disabled />
                  </div>
                  <div>
                    <Label>Tole/Street</Label>
                    <Input value={userData.address.permanent.tole} disabled />
                  </div>
                  <div>
                    <Label>House No.</Label>
                    <Input value={userData.address.permanent.houseNumber} disabled />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Investment Profile Section */}
        {activeSection === 'investment' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Profile</h2>
              <div className="space-y-6">
                <div>
                  <Label>Investor Type</Label>
                  <p className="mt-1 text-lg font-medium text-gray-900">{userData.investmentProfile.investorType}</p>
                </div>
                <div>
                  <Label>Annual Income Range</Label>
                  <p className="mt-1 text-lg font-medium text-gray-900">{userData.investmentProfile.annualIncome}</p>
                </div>
                <div>
                  <Label>Source of Funds</Label>
                  <p className="mt-1 text-lg font-medium text-gray-900">{userData.investmentProfile.sourceOfFunds}</p>
                </div>
                <div>
                  <Label>Investment Experience</Label>
                  <p className="mt-1 text-lg font-medium text-gray-900">{userData.investmentProfile.investmentExperience}</p>
                </div>
                <div>
                  <Label>Risk Tolerance</Label>
                  <p className="mt-1 text-lg font-medium text-gray-900">{userData.investmentProfile.riskTolerance}</p>
                </div>
                <Button variant="outline" className="mt-4">
                  Update Investment Profile
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">
                      {userData.accountStatus.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                    </p>
                  </div>
                  <Button variant={userData.accountStatus.twoFactorEnabled ? 'outline' : 'default'}>
                    {userData.accountStatus.twoFactorEnabled ? 'Manage' : 'Enable'}
                  </Button>
                </div>

                <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900">Security Reminder</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Always use a strong password and enable two-factor authentication for maximum security.
                        Never share your login credentials with anyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Preferences Section */}
        {activeSection === 'preferences' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries({
                  emailNotifications: 'Email Notifications',
                  smsNotifications: 'SMS Notifications',
                  investmentAlerts: 'Investment Alerts',
                  newsletterSubscription: 'Newsletter Subscription'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{label}</h3>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Receive updates and alerts via email'}
                        {key === 'smsNotifications' && 'Get important notifications via SMS'}
                        {key === 'investmentAlerts' && 'New opportunities and investment updates'}
                        {key === 'newsletterSubscription' && 'Weekly market insights and company news'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={userData.preferences[key as keyof typeof userData.preferences]}
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <Button className="mt-6">Save Preferences</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;