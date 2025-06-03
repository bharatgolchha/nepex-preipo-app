import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/store/adminAuthContext';
import {
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle,
  AlertCircle,
  Save,
  Send
} from 'lucide-react';

interface CompanyFormData {
  // Basic Information
  companyName: string;
  registrationNumber: string;
  establishedDate: string;
  companyType: string;
  panNumber: string;
  
  // Contact Information
  contactPersonName: string;
  contactPersonDesignation: string;
  email: string;
  phone: string;
  alternatePhone: string;
  website: string;
  
  // Address
  address: string;
  city: string;
  district: string;
  province: string;
  
  // Business Information
  sector: string;
  subSector: string;
  employeeCount: string;
  businessDescription: string;
  
  // Initial Setup
  assignedManager: string;
  initialPassword: string;
  sendCredentials: boolean;
  notes: string;
}

const CreateCompany: React.FC = () => {
  const navigate = useNavigate();
  const { adminUser } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    registrationNumber: '',
    establishedDate: '',
    companyType: '',
    panNumber: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    address: '',
    city: '',
    district: '',
    province: '',
    sector: '',
    subSector: '',
    employeeCount: '',
    businessDescription: '',
    assignedManager: adminUser?.name || '',
    initialPassword: '',
    sendCredentials: true,
    notes: ''
  });

  const sectors = [
    'Technology',
    'Financial Services',
    'Healthcare',
    'Education',
    'Renewable Energy',
    'Manufacturing',
    'Agriculture',
    'Tourism',
    'Real Estate',
    'Retail',
    'Transportation',
    'Food & Beverage'
  ];

  const companyTypes = [
    'Private Limited Company',
    'Public Limited Company',
    'Partnership',
    'Sole Proprietorship'
  ];

  const provinces = [
    'Province 1',
    'Madhesh Province',
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province'
  ];

  const handleInputChange = (field: keyof CompanyFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('initialPassword', password);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.registrationNumber && formData.establishedDate && formData.companyType);
      case 2:
        return !!(formData.contactPersonName && formData.email && formData.phone);
      case 3:
        return !!(formData.address && formData.city && formData.district && formData.province);
      case 4:
        return !!(formData.sector && formData.businessDescription);
      case 5:
        return !!(formData.assignedManager && formData.initialPassword);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (saveOnly: boolean = false) => {
    setIsLoading(true);
    
    try {
      // Validate final step first
      if (!validateStep(currentStep)) {
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new company object
      const newCompany = {
        id: Date.now().toString(), // Simple ID generation
        name: formData.companyName,
        registrationNumber: formData.registrationNumber,
        sector: formData.sector,
        status: saveOnly ? 'pending' : 'pending' as const, // New companies start as pending
        createdDate: new Date().toISOString().split('T')[0],
        contactPerson: formData.contactPersonName,
        email: formData.email,
        phone: formData.phone,
        documentsStatus: 'pending' as const,
        lastActivity: new Date().toISOString(),
        assignedManager: formData.assignedManager,
        fundingTarget: 0,
        kycStatus: 'pending' as const
      };

      // Get existing companies from localStorage
      const existingCompanies = localStorage.getItem('nepex_companies');
      let companies = [];
      
      console.log('CreateCompany: Getting existing companies from localStorage...');
      console.log('Raw existing companies data:', existingCompanies);
      
      if (existingCompanies) {
        try {
          companies = JSON.parse(existingCompanies);
          console.log('Parsed existing companies:', companies);
          console.log('Number of existing companies:', companies.length);
        } catch (error) {
          console.error('Error parsing existing companies:', error);
          companies = [];
        }
      } else {
        console.log('No existing companies found, starting with empty array');
      }

      // Add new company to the list
      companies.push(newCompany);
      console.log('Added new company to list. Total companies now:', companies.length);
      console.log('New company data:', newCompany);
      
      // Save back to localStorage
      localStorage.setItem('nepex_companies', JSON.stringify(companies));
      console.log('Saved companies to localStorage successfully');
      
      // Verify the save worked
      const verifyData = localStorage.getItem('nepex_companies');
      console.log('Verification - localStorage after save:', verifyData);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('refreshCompanies'));
      console.log('Dispatched refreshCompanies event');
      
      console.log('Company creation data:', { ...formData, action: saveOnly ? 'save' : 'save_and_send' });
      console.log('New company added:', newCompany);
      
      if (saveOnly) {
        // Show success message for draft save
        const successMsg = `Company "${formData.companyName}" saved as draft successfully!`;
        
        // Create a simple success modal
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900">Draft Saved</h3>
              </div>
              <p class="text-gray-600 mb-4">${successMsg}</p>
              <button onclick="this.closest('div').closest('div').remove()" class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                OK
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modalDiv);
      } else {
        // Show success message for complete creation
        const successMsg = `Company "${formData.companyName}" created successfully! ${formData.sendCredentials ? 'Login credentials will be sent to ' + formData.email : 'Company has been added to the system.'}`;
        
        // Create a simple success modal
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900">Company Created</h3>
              </div>
              <p class="text-gray-600 mb-4">${successMsg}</p>
              <button onclick="window.location.href='/admin/companies'" class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Go to Company Management
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modalDiv);

        // Auto-navigate after 3 seconds
        setTimeout(() => {
          navigate('/admin/companies');
        }, 3000);
      }
    } catch (error) {
      console.error('Company creation error:', error);
      
      // Show error modal
      const modalDiv = document.createElement('div');
      modalDiv.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">Error</h3>
            </div>
            <p class="text-gray-600 mb-4">Error creating company. Please check all fields and try again.</p>
            <button onclick="this.closest('div').closest('div').remove()" class="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              OK
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modalDiv);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="Company registration number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="companyType">Company Type *</Label>
                <select
                  id="companyType"
                  value={formData.companyType}
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company type</option>
                  {companyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="establishedDate">Established Date *</Label>
                <Input
                  id="establishedDate"
                  type="date"
                  value={formData.establishedDate}
                  onChange={(e) => handleInputChange('establishedDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  placeholder="PAN number"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                  placeholder="Primary contact person"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contactPersonDesignation">Designation</Label>
                <Input
                  id="contactPersonDesignation"
                  value={formData.contactPersonDesignation}
                  onChange={(e) => handleInputChange('contactPersonDesignation', e.target.value)}
                  placeholder="CEO, Managing Director, etc."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="company@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+977-1-XXXXXXX"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                  placeholder="Alternative contact number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://www.company.com"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="District"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="province">Province *</Label>
                <select
                  id="province"
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select province</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sector">Sector *</Label>
                <select
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select sector</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="subSector">Sub Sector</Label>
                <Input
                  id="subSector"
                  value={formData.subSector}
                  onChange={(e) => handleInputChange('subSector', e.target.value)}
                  placeholder="Specific business area"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="employeeCount">Employee Count</Label>
                <select
                  id="employeeCount"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="businessDescription">Business Description *</Label>
                <textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="Describe the company's business model, products/services, and market"
                  rows={4}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Account Setup</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="assignedManager">Assigned Account Manager *</Label>
                <Input
                  id="assignedManager"
                  value={formData.assignedManager}
                  onChange={(e) => handleInputChange('assignedManager', e.target.value)}
                  placeholder="Account manager name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="initialPassword">Initial Password *</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="initialPassword"
                    value={formData.initialPassword}
                    onChange={(e) => handleInputChange('initialPassword', e.target.value)}
                    placeholder="Generated password"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={generatePassword}>
                    Generate
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sendCredentials"
                    checked={formData.sendCredentials}
                    onChange={(e) => handleInputChange('sendCredentials', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="sendCredentials">Send login credentials via email</Label>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes (Internal)</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Internal notes about this company (not visible to company)"
                  rows={3}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/companies')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Company</h1>
            <p className="text-gray-600 mt-2">Add a new company to the platform</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              {step < 5 && (
                <div className={`w-16 h-0.5 ml-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          Step {currentStep} of 5: {
            currentStep === 1 ? 'Basic Information' :
            currentStep === 2 ? 'Contact Information' :
            currentStep === 3 ? 'Address Information' :
            currentStep === 4 ? 'Business Information' :
            'Account Setup'
          }
        </div>
      </Card>

      {/* Form Content */}
      <Card className="p-8">
        {renderStepContent()}

        {/* Validation Errors */}
        {!validateStep(currentStep) && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-sm text-red-700">Please fill in all required fields before proceeding.</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-3">
            {currentStep === 5 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading || !validateStep(currentStep)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={isLoading || !validateStep(currentStep)}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Create & Send Credentials
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateCompany; 