import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/authContext';
import {
  Building2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Upload,
  Users,
  FileText,
  Globe,
  Phone,
  Mail,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface CompanyFormData {
  // Basic Company Info
  companyName: string;
  registrationNumber: string;
  panNumber: string;
  establishedDate: string;
  companyType: string;
  
  // Contact Info
  email: string;
  phone: string;
  website: string;
  
  // Address
  streetAddress: string;
  city: string;
  district: string;
  province: string;
  
  // Business Details
  industry: string;
  sector: string;
  employeeCount: string;
  description: string;
  vision: string;
  mission: string;
  targetMarket: string;
  
  // Team Members
  teamMembers: Array<{
    name: string;
    position: string;
    email: string;
    experience: string;
    bio: string;
  }>;
  
  // Financial Info
  currentRevenue: string;
  projectedRevenue: string;
  fundingHistory: string;
  useOfFunds: string;
  
  // Documents
  documents: {
    registrationCertificate: File | null;
    panCertificate: File | null;
    financialStatements: File | null;
    businessPlan: File | null;
  };
}

const CompanyRegister: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    registrationNumber: '',
    panNumber: '',
    establishedDate: '',
    companyType: '',
    email: '',
    phone: '',
    website: '',
    streetAddress: '',
    city: '',
    district: '',
    province: '',
    industry: '',
    sector: '',
    employeeCount: '',
    description: '',
    vision: '',
    mission: '',
    targetMarket: '',
    teamMembers: [{ name: '', position: '', email: '', experience: '', bio: '' }],
    currentRevenue: '',
    projectedRevenue: '',
    fundingHistory: '',
    useOfFunds: '',
    documents: {
      registrationCertificate: null,
      panCertificate: null,
      financialStatements: null,
      businessPlan: null,
    }
  });

  const totalSteps = 7;
  
  const stepTitles = [
    'Company Type',
    'Basic Information', 
    'Business Details',
    'Team Members',
    'Financial Information',
    'Document Upload',
    'Review & Submit'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Agriculture',
    'Education', 'Tourism', 'Energy', 'Construction', 'Retail', 'Other'
  ];

  const provinces = [
    'Province 1', 'Madhesh Province', 'Bagmati Province', 'Gandaki Province',
    'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', position: '', email: '', experience: '', bio: '' }]
    }));
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: file }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};
    
    switch (step) {
      case 1:
        if (!formData.companyType) newErrors.companyType = 'Company type is required';
        break;
      case 2:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData.establishedDate) newErrors.establishedDate = 'Established date is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        break;
      case 3:
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.description) newErrors.description = 'Company description is required';
        break;
      case 4:
        if (formData.teamMembers.length === 0 || !formData.teamMembers[0].name) {
          newErrors.teamMembers = 'At least one team member is required';
        }
        break;
      case 5:
        if (!formData.useOfFunds) newErrors.useOfFunds = 'Use of funds is required';
        break;
      case 6:
        if (!formData.documents.registrationCertificate) {
          newErrors.registrationCertificate = 'Registration certificate is required';
        }
        if (!formData.documents.panCertificate) {
          newErrors.panCertificate = 'PAN certificate is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Register and login
      await login(formData.email, 'temp_password');
      
      // Redirect to company dashboard
      navigate('/company/dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-blue-600 mb-2">NepEx</h1>
          <h2 className="text-2xl font-semibold text-gray-900">Company Registration</h2>
          <p className="mt-2 text-gray-600">Join Nepal's premier pre-IPO investment platform</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted ? 'bg-green-600 text-white' : 
                    isCurrent ? 'bg-blue-600 text-white' : 
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : stepNumber}
                  </div>
                  <span className="text-xs mt-2 text-center text-gray-600">{title}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8">
          {/* Step 1: Company Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Company Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'private_limited', label: 'Private Limited Company', desc: 'Pvt. Ltd. registered in Nepal' },
                  { value: 'public_limited', label: 'Public Limited Company', desc: 'Public Ltd. registered in Nepal' },
                  { value: 'partnership', label: 'Partnership Firm', desc: 'Partnership business entity' },
                  { value: 'proprietorship', label: 'Sole Proprietorship', desc: 'Individual business ownership' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateFormData('companyType', type.value)}
                    className={`p-6 border-2 rounded-lg text-left transition-colors ${
                      formData.companyType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Building2 className={`h-8 w-8 ${formData.companyType === type.value ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.companyType && (
                <p className="mt-4 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.companyType}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className={errors.companyName ? 'border-red-500' : ''}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                    className={errors.registrationNumber ? 'border-red-500' : ''}
                    placeholder="Company registration number"
                  />
                  {errors.registrationNumber && <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>}
                </div>
                
                <div>
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => updateFormData('panNumber', e.target.value)}
                    className={errors.panNumber ? 'border-red-500' : ''}
                    placeholder="PAN number"
                  />
                  {errors.panNumber && <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>}
                </div>
                
                <div>
                  <Label htmlFor="establishedDate">Established Date *</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => updateFormData('establishedDate', e.target.value)}
                    className={errors.establishedDate ? 'border-red-500' : ''}
                  />
                  {errors.establishedDate && <p className="mt-1 text-sm text-red-600">{errors.establishedDate}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Company Email *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="company@example.com"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+977-1-XXXXXXX"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                      className="pl-10"
                      placeholder="https://yourcompany.com"
                    />
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label>Company Address</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="md:col-span-2">
                      <Input
                        value={formData.streetAddress}
                        onChange={(e) => updateFormData('streetAddress', e.target.value)}
                        placeholder="Street Address"
                      />
                    </div>
                    <Input
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      placeholder="City/Municipality"
                    />
                    <Input
                      value={formData.district}
                      onChange={(e) => updateFormData('district', e.target.value)}
                      placeholder="District"
                    />
                    <select
                      value={formData.province}
                      onChange={(e) => updateFormData('province', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Details</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => updateFormData('industry', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="sector">Business Sector</Label>
                    <Input
                      id="sector"
                      value={formData.sector}
                      onChange={(e) => updateFormData('sector', e.target.value)}
                      placeholder="e.g., Fintech, Healthtech"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <select
                      id="employeeCount"
                      value={formData.employeeCount}
                      onChange={(e) => updateFormData('employeeCount', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Range</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Company Description *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    rows={4}
                    placeholder="Describe your business, products/services, and market position"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                <div>
                  <Label htmlFor="vision">Company Vision</Label>
                  <textarea
                    id="vision"
                    value={formData.vision}
                    onChange={(e) => updateFormData('vision', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Your company's long-term vision and aspirations"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mission">Company Mission</Label>
                  <textarea
                    id="mission"
                    value={formData.mission}
                    onChange={(e) => updateFormData('mission', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Your company's mission and core purpose"
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <textarea
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={(e) => updateFormData('targetMarket', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe your target customers and market segments"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Team Members */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Team Members</h3>
              <p className="text-gray-600 mb-6">Add information about your key personnel and leadership team</p>
              
              {formData.teamMembers.map((member, index) => (
                <Card key={index} className="p-6 mb-6 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Team Member {index + 1}</h4>
                    {formData.teamMembers.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTeamMember(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <Label>Position/Title *</Label>
                      <Input
                        value={member.position}
                        onChange={(e) => updateTeamMember(index, 'position', e.target.value)}
                        placeholder="e.g., CEO, CTO, CFO"
                      />
                    </div>
                    
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                        placeholder="email@company.com"
                      />
                    </div>
                    
                    <div>
                      <Label>Years of Experience</Label>
                      <Input
                        value={member.experience}
                        onChange={(e) => updateTeamMember(index, 'experience', e.target.value)}
                        placeholder="e.g., 10 years"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label>Brief Bio</Label>
                      <textarea
                        value={member.bio}
                        onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Brief background and expertise"
                      />
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button
                variant="outline"
                onClick={addTeamMember}
                className="w-full flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4" />
                Add Another Team Member
              </Button>
              
              {errors.teamMembers && (
                <p className="mt-4 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.teamMembers}
                </p>
              )}
            </div>
          )}

          {/* Step 5: Financial Information */}
          {currentStep === 5 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentRevenue">Current Annual Revenue (NPR)</Label>
                    <div className="relative">
                      <Input
                        id="currentRevenue"
                        value={formData.currentRevenue}
                        onChange={(e) => updateFormData('currentRevenue', e.target.value)}
                        placeholder="e.g., 50000000"
                        className="pl-10"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="projectedRevenue">Projected Revenue (Next 3 Years)</Label>
                    <div className="relative">
                      <Input
                        id="projectedRevenue"
                        value={formData.projectedRevenue}
                        onChange={(e) => updateFormData('projectedRevenue', e.target.value)}
                        placeholder="e.g., 150000000"
                        className="pl-10"
                      />
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="fundingHistory">Previous Funding History</Label>
                  <textarea
                    id="fundingHistory"
                    value={formData.fundingHistory}
                    onChange={(e) => updateFormData('fundingHistory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe any previous funding rounds, investors, or financial partnerships"
                  />
                </div>
                
                <div>
                  <Label htmlFor="useOfFunds">Proposed Use of Funds *</Label>
                  <textarea
                    id="useOfFunds"
                    value={formData.useOfFunds}
                    onChange={(e) => updateFormData('useOfFunds', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.useOfFunds ? 'border-red-500' : 'border-gray-300'}`}
                    rows={4}
                    placeholder="Explain how you plan to use the investment funds"
                  />
                  {errors.useOfFunds && <p className="mt-1 text-sm text-red-600">{errors.useOfFunds}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Document Upload */}
          {currentStep === 6 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h3>
              <p className="text-gray-600 mb-6">Please upload the following documents for verification</p>
              
              <div className="space-y-6">
                {[
                  { key: 'registrationCertificate', label: 'Company Registration Certificate', required: true },
                  { key: 'panCertificate', label: 'PAN Certificate', required: true },
                  { key: 'financialStatements', label: 'Latest Financial Statements', required: false },
                  { key: 'businessPlan', label: 'Business Plan', required: false }
                ].map((doc) => (
                  <div key={doc.key} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">
                        {doc.label} {doc.required && <span className="text-red-500">*</span>}
                      </Label>
                      {formData.documents[doc.key as keyof typeof formData.documents] && (
                        <span className="text-green-600 text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Uploaded
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                        className="hidden"
                        id={`file-${doc.key}`}
                      />
                      <label
                        htmlFor={`file-${doc.key}`}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </label>
                      
                      {formData.documents[doc.key as keyof typeof formData.documents] && (
                        <span className="text-sm text-gray-600">
                          {formData.documents[doc.key as keyof typeof formData.documents]?.name}
                        </span>
                      )}
                    </div>
                    
                    {errors[doc.key] && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors[doc.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Document Requirements</h4>
                    <ul className="mt-2 text-sm text-blue-800 space-y-1">
                      <li>• All documents must be in PDF, JPG, or PNG format</li>
                      <li>• Maximum file size: 10MB per document</li>
                      <li>• Documents should be clear and legible</li>
                      <li>• Financial statements should be for the last 2 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review & Submit */}
          {currentStep === 7 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Review & Submit</h3>
              <p className="text-gray-600 mb-6">Please review your information before submitting</p>
              
              <div className="space-y-6">
                {/* Company Information Summary */}
                <Card className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Company Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Company Name:</strong> {formData.companyName}</div>
                    <div><strong>Type:</strong> {formData.companyType}</div>
                    <div><strong>Registration No:</strong> {formData.registrationNumber}</div>
                    <div><strong>PAN:</strong> {formData.panNumber}</div>
                    <div><strong>Industry:</strong> {formData.industry}</div>
                    <div><strong>Employees:</strong> {formData.employeeCount}</div>
                  </div>
                </Card>
                
                {/* Team Summary */}
                <Card className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Key Team Members ({formData.teamMembers.length})
                  </h4>
                  <div className="space-y-2 text-sm">
                    {formData.teamMembers.map((member, index) => (
                      <div key={index}>
                        <strong>{member.name}</strong> - {member.position}
                      </div>
                    ))}
                  </div>
                </Card>
                
                {/* Documents Summary */}
                <Card className="p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Uploaded Documents
                  </h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(formData.documents).map(([key, file]) => (
                      file && (
                        <div key={key} className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {file.name}
                        </div>
                      )
                    ))}
                  </div>
                </Card>
                
                {/* Terms and Conditions */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. I understand that my application
                      will be reviewed and I may be contacted for additional information.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {currentStep === totalSteps ? (
                isLoading ? 'Submitting...' : 'Submit Registration'
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegister; 