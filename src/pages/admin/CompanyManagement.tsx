import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/store/adminAuthContext';
import {
  Building2,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Users,
  Trash,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  sector: string;
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  createdDate: string;
  contactPerson: string;
  email: string;
  phone: string;
  documentsStatus: 'pending' | 'approved' | 'rejected' | 'incomplete';
  lastActivity: string;
  assignedManager: string;
  fundingTarget?: number;
  kycStatus: 'pending' | 'approved' | 'rejected';
  logo?: string;
}

// Initial mock company data
const initialMockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCo Nepal Pvt. Ltd.',
    registrationNumber: 'PVT-2023-001',
    sector: 'Technology',
    status: 'active',
    createdDate: '2024-01-10',
    contactPerson: 'Ram Prasad Sharma',
    email: 'contact@techco.com.np',
    phone: '+977-9841234567',
    documentsStatus: 'approved',
    lastActivity: '2024-01-15T10:30:00Z',
    assignedManager: 'Sita Thapa',
    fundingTarget: 50000000,
    kycStatus: 'approved',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop'
  },
  {
    id: '2',
    name: 'GreenEnergy Solutions',
    registrationNumber: 'PVT-2023-002',
    sector: 'Renewable Energy',
    status: 'pending',
    createdDate: '2024-01-12',
    contactPerson: 'Hari Bahadur Rai',
    email: 'info@greenenergy.np',
    phone: '+977-9841234568',
    documentsStatus: 'pending',
    lastActivity: '2024-01-14T16:20:00Z',
    assignedManager: 'Ram Sharma',
    fundingTarget: 120000000,
    kycStatus: 'pending'
  },
  {
    id: '3',
    name: 'FinTech Innovations',
    registrationNumber: 'PVT-2023-003',
    sector: 'Financial Services',
    status: 'active',
    createdDate: '2024-01-08',
    contactPerson: 'Maya Gurung',
    email: 'hello@fintech.com.np',
    phone: '+977-9841234569',
    documentsStatus: 'approved',
    lastActivity: '2024-01-13T09:15:00Z',
    assignedManager: 'Sita Thapa',
    fundingTarget: 75000000,
    kycStatus: 'approved'
  },
  {
    id: '4',
    name: 'EduTech Nepal',
    registrationNumber: 'PVT-2024-001',
    sector: 'Education',
    status: 'suspended',
    createdDate: '2024-01-05',
    contactPerson: 'Bikash Chhetri',
    email: 'contact@edutech.np',
    phone: '+977-9841234570',
    documentsStatus: 'rejected',
    lastActivity: '2024-01-11T14:45:00Z',
    assignedManager: 'Ram Sharma',
    kycStatus: 'rejected'
  }
];

const CompanyManagement: React.FC = () => {
  const { hasPermission } = useAdminAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Function to load companies from localStorage
  const loadCompanies = () => {
    console.log('CompanyManagement: Loading companies from localStorage...');
    const savedCompanies = localStorage.getItem('nepex_companies');
    console.log('Raw localStorage data:', savedCompanies);
    
    if (savedCompanies) {
      try {
        const parsedCompanies = JSON.parse(savedCompanies);
        console.log('Parsed companies:', parsedCompanies);
        console.log('Number of companies loaded:', parsedCompanies.length);
        setCompanies(parsedCompanies);
        setIsInitialLoadComplete(true);
        return parsedCompanies;
      } catch (error) {
        console.error('Error parsing existing companies:', error);
        // If parsing fails, initialize with mock data
        console.log('Initializing with mock data due to parsing error');
        setCompanies(initialMockCompanies);
        localStorage.setItem('nepex_companies', JSON.stringify(initialMockCompanies));
        setIsInitialLoadComplete(true);
        return initialMockCompanies;
      }
    } else {
      // If no saved companies exist, initialize with mock data
      console.log('No saved companies found, initializing with mock data');
      setCompanies(initialMockCompanies);
      localStorage.setItem('nepex_companies', JSON.stringify(initialMockCompanies));
      setIsInitialLoadComplete(true);
      return initialMockCompanies;
    }
  };

  // Load companies from localStorage on component mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Listen for localStorage changes (in case data is updated from another tab or component)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nepex_companies') {
        console.log('Storage event detected, reloading companies...');
        loadCompanies();
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for a custom event we can dispatch
    const handleCustomRefresh = () => {
      console.log('Custom refresh event detected, reloading companies...');
      loadCompanies();
    };
    
    window.addEventListener('refreshCompanies', handleCustomRefresh);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshCompanies', handleCustomRefresh);
    };
  }, []);

  // Save companies to localStorage whenever companies change
  useEffect(() => {
    if (companies.length > 0 && isInitialLoadComplete) { // Only save if we have companies and initial load is complete
      console.log('CompanyManagement: Saving companies to localStorage...', companies.length, 'companies');
      localStorage.setItem('nepex_companies', JSON.stringify(companies));
    }
  }, [companies, isInitialLoadComplete]);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionMenu && !(event.target as Element).closest('.action-menu')) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionMenu]);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    
    return matchesSearch && matchesStatus && matchesSector;
  });

  const updateCompanyStatus = (companyId: string, newStatus: Company['status']) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId
          ? { ...company, status: newStatus, lastActivity: new Date().toISOString() }
          : company
      )
    );
    setShowActionMenu(null);
  };

  const updateDocumentStatus = (companyId: string, newStatus: Company['documentsStatus']) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId
          ? { ...company, documentsStatus: newStatus, lastActivity: new Date().toISOString() }
          : company
      )
    );
    setShowActionMenu(null);
  };

  const updateKycStatus = (companyId: string, newStatus: Company['kycStatus']) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId
          ? { ...company, kycStatus: newStatus, lastActivity: new Date().toISOString() }
          : company
      )
    );
    setShowActionMenu(null);
  };

  const quickApproveCompany = (companyId: string) => {
    // Approve all statuses at once to make company visible to investors
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId
          ? { 
              ...company, 
              status: 'active',
              documentsStatus: 'approved',
              kycStatus: 'approved',
              lastActivity: new Date().toISOString() 
            }
          : company
      )
    );
    setShowActionMenu(null);
    
    // Show success message
    alert(`Company fully approved! It will now be visible to investors.`);
  };

  const deleteCompany = (companyId: string) => {
    if (window.confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
      setCompanies(prevCompanies =>
        prevCompanies.filter(company => company.id !== companyId)
      );
      setShowActionMenu(null);
    }
  };

  const getDocumentStatusBadge = (status: Company['documentsStatus']) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'incomplete':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  };

  const getStatusBadge = (status: Company['status']) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'rejected':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (status: Company['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const sectors = Array.from(new Set(companies.map(c => c.sector)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-600 mt-2">Manage and monitor all companies on the platform</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={loadCompanies}
            className="flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {/* Debug button - can be removed later */}
          <Button 
            variant="outline" 
            onClick={() => {
              const data = localStorage.getItem('nepex_companies');
              console.log('=== DEBUG localStorage ===');
              console.log('Raw data:', data);
              if (data) {
                try {
                  const parsed = JSON.parse(data);
                  console.log('Parsed data:', parsed);
                  console.log('Company count:', parsed.length);
                  parsed.forEach((company: any, index: number) => {
                    console.log(`Company ${index + 1}:`, company.name, company.registrationNumber);
                  });
                } catch (e) {
                  console.log('Error parsing:', e);
                }
              } else {
                console.log('No data in localStorage');
              }
              console.log('Current companies state:', companies);
              console.log('=========================');
            }}
            className="flex items-center text-blue-600 border-blue-300"
          >
            Debug Storage
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const confirm = window.confirm('This will clear all localStorage data and reset to initial mock companies. Continue?');
              if (confirm) {
                localStorage.removeItem('nepex_companies');
                setIsInitialLoadComplete(false);
                loadCompanies();
                console.log('localStorage cleared and reset');
              }
            }}
            className="flex items-center text-orange-600 border-orange-300"
          >
            Reset Data
          </Button>
          {hasPermission('companies.create') && (
            <Link to="/admin/companies/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {companies.filter(c => c.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {companies.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Issues</p>
              <p className="text-2xl font-bold text-red-600">
                {companies.filter(c => c.status === 'suspended' || c.status === 'rejected').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sectors</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Companies Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {company.logo ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                          src={company.logo}
                          alt={company.name}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=40&background=f3f4f6&color=374151&format=svg`;
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <Building2 className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.registrationNumber}</div>
                        <div className="text-xs text-gray-400">{company.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.contactPerson}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {company.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {company.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(company.status)}
                      <span className={getStatusBadge(company.status)}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      KYC: {company.kycStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getDocumentStatusBadge(company.documentsStatus)}>
                      {company.documentsStatus.charAt(0).toUpperCase() + company.documentsStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      {company.assignedManager}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(company.lastActivity).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(company.lastActivity).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCompany(company)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasPermission('companies.edit') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // For now, show an alert. In a real app, this would open an edit modal
                            alert(`Edit functionality for ${company.name} would open here`);
                          }}
                          title="Edit Company"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <div className="relative">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowActionMenu(showActionMenu === company.id ? null : company.id)}
                          title="More Actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                        
                        {showActionMenu === company.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border action-menu">
                            <div className="py-1">
                              {/* Quick Approve - if not fully approved */}
                              {!(company.status === 'active' && company.documentsStatus === 'approved' && company.kycStatus === 'approved') && (
                                <button
                                  onClick={() => quickApproveCompany(company.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 flex items-center"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  🚀 Full Approval (Investors)
                                </button>
                              )}
                              
                              {/* Company Status Actions */}
                              {company.status === 'pending' && (
                                <button
                                  onClick={() => updateCompanyStatus(company.id, 'active')}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                                  Activate Company
                                </button>
                              )}
                              {company.status === 'active' && (
                                <button
                                  onClick={() => updateCompanyStatus(company.id, 'suspended')}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <UserX className="h-4 w-4 mr-2 text-orange-600" />
                                  Suspend Company
                                </button>
                              )}
                              {company.status === 'suspended' && (
                                <button
                                  onClick={() => updateCompanyStatus(company.id, 'active')}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <UserCheck className="h-4 w-4 mr-2 text-green-600" />
                                  Reactivate Company
                                </button>
                              )}
                              
                              <hr className="my-1" />
                              
                              {/* Document Status Actions */}
                              {company.documentsStatus === 'pending' && (
                                <>
                                  <button
                                    onClick={() => updateDocumentStatus(company.id, 'approved')}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                    Approve Documents
                                  </button>
                                  <button
                                    onClick={() => updateDocumentStatus(company.id, 'rejected')}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                    Reject Documents
                                  </button>
                                </>
                              )}
                              
                              {/* KYC Status Actions */}
                              {company.kycStatus === 'pending' && (
                                <>
                                  <button
                                    onClick={() => updateKycStatus(company.id, 'approved')}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                                    Approve KYC
                                  </button>
                                  <button
                                    onClick={() => updateKycStatus(company.id, 'rejected')}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                    Reject KYC
                                  </button>
                                </>
                              )}
                              
                              <hr className="my-1" />
                              <button
                                onClick={() => deleteCompany(company.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Company
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </Card>

      {/* Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
              <button
                onClick={() => setSelectedCompany(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Registration:</strong> {selectedCompany.registrationNumber}</div>
                  <div><strong>Sector:</strong> {selectedCompany.sector}</div>
                  <div><strong>Created:</strong> {new Date(selectedCompany.createdDate).toLocaleDateString()}</div>
                  <div><strong>Status:</strong> 
                    <span className={`ml-2 ${getStatusBadge(selectedCompany.status)}`}>
                      {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Contact Person:</strong> {selectedCompany.contactPerson}</div>
                  <div><strong>Email:</strong> {selectedCompany.email}</div>
                  <div><strong>Phone:</strong> {selectedCompany.phone}</div>
                  <div><strong>Manager:</strong> {selectedCompany.assignedManager}</div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Documents:</strong> 
                    <span className={`ml-2 ${getDocumentStatusBadge(selectedCompany.documentsStatus)}`}>
                      {selectedCompany.documentsStatus.charAt(0).toUpperCase() + selectedCompany.documentsStatus.slice(1)}
                    </span>
                  </div>
                  <div><strong>KYC Status:</strong> {selectedCompany.kycStatus}</div>
                  <div><strong>Funding Target:</strong> NPR {selectedCompany.fundingTarget?.toLocaleString() || 'Not set'}</div>
                  <div><strong>Last Activity:</strong> {new Date(selectedCompany.lastActivity).toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedCompany(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement; 