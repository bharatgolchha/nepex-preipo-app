import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit2,
  Save,
  Upload,
  X
} from 'lucide-react';

// Sample company data
const companyData = {
  basicInfo: {
    companyName: 'TechCo Nepal Pvt. Ltd.',
    registrationNumber: '123456789',
    panNumber: 'TECH123456',
    establishedDate: '2018-03-15',
    industry: 'Technology',
    sector: 'Software Development',
    website: 'https://techconepal.com',
    email: 'info@techconepal.com',
    phone: '+977-1-4567890',
    employeeCount: 156
  },
  address: {
    street: 'Durbar Marg',
    city: 'Kathmandu',
    province: 'Bagmati',
    postalCode: '44600',
    country: 'Nepal'
  },
  businessInfo: {
    description: 'TechCo Nepal is a pioneering software development company specializing in fintech solutions for the Nepalese market. We develop innovative digital banking and payment solutions.',
    vision: 'To be the leading technology enabler for financial inclusion in Nepal.',
    mission: 'Empowering businesses and individuals with cutting-edge financial technology solutions.',
    coreProducts: [
      'Digital Banking Platform',
      'Mobile Wallet Solution',
      'AI-powered Credit Scoring',
      'Merchant Payment Gateway'
    ],
    targetMarket: 'Banks, Financial Institutions, and Fintech Companies in Nepal'
  },
  financialHighlights: {
    annualRevenue: 150000000,
    profitMargin: 22,
    yearOverYearGrowth: 35,
    marketShare: 15
  },
  teamMembers: [
    {
      id: 1,
      name: 'Ram Prasad Sharma',
      position: 'CEO & Founder',
      email: 'ram.sharma@techconepal.com',
      experience: '15 years in fintech'
    },
    {
      id: 2,
      name: 'Sita Devi Pradhan',
      position: 'CTO',
      email: 'sita.pradhan@techconepal.com',
      experience: '12 years in software development'
    },
    {
      id: 3,
      name: 'Hari Bahadur Thapa',
      position: 'CFO',
      email: 'hari.thapa@techconepal.com',
      experience: '18 years in finance'
    }
  ],
  verificationStatus: {
    status: 'verified',
    verifiedDate: '2024-01-15',
    nextReviewDate: '2025-01-15'
  },
  documents: [
    { name: 'Company Registration Certificate', uploaded: true, verified: true },
    { name: 'PAN Certificate', uploaded: true, verified: true },
    { name: 'Tax Clearance Certificate', uploaded: true, verified: true },
    { name: 'Audited Financial Statements', uploaded: true, verified: true },
    { name: 'Board Resolution', uploaded: true, verified: true }
  ]
};

const CompanyProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'business' | 'team' | 'documents'>('basic');
  const [editedData, setEditedData] = useState(companyData);

  const handleSave = () => {
    console.log('Saving company data:', editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(companyData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
              <p className="text-gray-600 mt-2">Manage your company information and documents</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Company Verified</p>
                <p className="text-sm text-gray-600">
                  Verified on {new Date(companyData.verificationStatus.verifiedDate).toLocaleDateString()} " 
                  Next review: {new Date(companyData.verificationStatus.nextReviewDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'basic', label: 'Basic Information', icon: Building2 },
              { id: 'business', label: 'Business Details', icon: FileText },
              { id: 'team', label: 'Team Members', icon: Users },
              { id: 'documents', label: 'Documents', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
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

        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={editedData.basicInfo.companyName}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      basicInfo: { ...editedData.basicInfo, companyName: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={editedData.basicInfo.registrationNumber}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={editedData.basicInfo.panNumber}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="establishedDate">Established Date</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={editedData.basicInfo.establishedDate}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      basicInfo: { ...editedData.basicInfo, establishedDate: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={editedData.basicInfo.industry}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      basicInfo: { ...editedData.basicInfo, industry: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={editedData.basicInfo.employeeCount}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      basicInfo: { ...editedData.basicInfo, employeeCount: parseInt(e.target.value) }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      type="url"
                      value={editedData.basicInfo.website}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        basicInfo: { ...editedData.basicInfo, website: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={editedData.basicInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        basicInfo: { ...editedData.basicInfo, email: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={editedData.basicInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        basicInfo: { ...editedData.basicInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Company Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={editedData.address.street}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        address: { ...editedData.address, street: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={editedData.address.city}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        address: { ...editedData.address, city: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province</Label>
                    <Input
                      id="province"
                      value={editedData.address.province}
                      disabled={!isEditing}
                      onChange={(e) => setEditedData({
                        ...editedData,
                        address: { ...editedData.address, province: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Business Details Tab */}
        {activeTab === 'business' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Details</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <textarea
                    id="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    rows={4}
                    value={editedData.businessInfo.description}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      businessInfo: { ...editedData.businessInfo, description: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <textarea
                    id="vision"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    rows={2}
                    value={editedData.businessInfo.vision}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      businessInfo: { ...editedData.businessInfo, vision: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <textarea
                    id="mission"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    rows={2}
                    value={editedData.businessInfo.mission}
                    disabled={!isEditing}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      businessInfo: { ...editedData.businessInfo, mission: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <Label>Core Products/Services</Label>
                  <div className="mt-2 space-y-2">
                    {editedData.businessInfo.coreProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{product}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Highlights */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Financial Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Annual Revenue</p>
                      <p className="text-lg font-semibold">NPR {(editedData.financialHighlights.annualRevenue / 10000000).toFixed(1)} Cr</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-lg font-semibold">{editedData.financialHighlights.profitMargin}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">YoY Growth</p>
                      <p className="text-lg font-semibold">{editedData.financialHighlights.yearOverYearGrowth}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Market Share</p>
                      <p className="text-lg font-semibold">{editedData.financialHighlights.marketShare}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
              <div className="space-y-4">
                {editedData.teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                        <p className="text-sm text-gray-500 mt-1">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.experience}</p>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Documents</h2>
              <div className="space-y-3">
                {editedData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          {doc.uploaded ? (
                            <span className="text-sm text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">Not uploaded</span>
                          )}
                          {doc.verified && (
                            <span className="text-sm text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Document Requirements</p>
                    <p className="text-sm text-blue-800 mt-1">
                      All documents must be clear, legible, and up-to-date. Financial statements must be audited by a registered CA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;