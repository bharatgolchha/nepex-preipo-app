import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Building2,
  ChevronDown
} from 'lucide-react';

// Interface for companies from localStorage
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

// Interface for offering display
interface Offering {
  id: string;
  companyName: string;
  logo: string;
  sector: string;
  description: string;
  minInvestment: number;
  maxInvestment: number;
  targetRaise: number;
  raisedAmount: number;
  preIPOValuation: number;
  expectedIPODate: string;
  closingDate: string;
  investorsCount: number;
  status: string;
  highlights: string[];
}

// Function to convert company data to offering format
const convertCompanyToOffering = (company: Company): Offering => {
  // Generate some realistic data based on company info
  const baseAmount = Math.floor(Math.random() * 100000000) + 20000000; // 20M - 120M
  const raisedPercentage = Math.random() * 0.8 + 0.1; // 10% - 90%
  
  return {
    id: company.id,
    companyName: company.name,
    logo: company.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=64&background=f3f4f6&color=374151&format=svg`,
    sector: company.sector,
    description: `${company.name} is an innovative company in the ${company.sector.toLowerCase()} sector, offering exciting pre-IPO investment opportunities.`,
    minInvestment: 10000,
    maxInvestment: 500000,
    targetRaise: company.fundingTarget || baseAmount,
    raisedAmount: Math.floor((company.fundingTarget || baseAmount) * raisedPercentage),
    preIPOValuation: (company.fundingTarget || baseAmount) * (Math.random() * 3 + 2), // 2x - 5x of target raise
    expectedIPODate: new Date(Date.now() + Math.random() * 365 * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random date within 2 years
    closingDate: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random date within 6 months
    investorsCount: Math.floor(Math.random() * 200) + 20,
    status: 'active',
    highlights: [
      'Verified by NepEx',
      'Strong market position',
      'Experienced management team'
    ]
  };
};

// Fallback mock data for demo purposes
const fallbackOfferings: Offering[] = [
  {
    id: 'demo-1',
    companyName: 'TechCo Nepal Pvt. Ltd.',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=entropy&auto=format&q=60',
    sector: 'Technology',
    description: 'Leading software development company specializing in fintech solutions for the Nepalese market.',
    minInvestment: 10000,
    maxInvestment: 500000,
    targetRaise: 50000000,
    raisedAmount: 35000000,
    preIPOValuation: 200000000,
    expectedIPODate: '2026-06-30',
    closingDate: '2025-03-15',
    investorsCount: 156,
    status: 'active',
    highlights: ['20% YoY growth', 'Profitable since 2022', 'Market leader in segment']
  },
  {
    id: 'demo-2',
    companyName: 'Green Energy Solutions',
    logo: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=64&h=64&fit=crop&crop=entropy&auto=format&q=60',
    sector: 'Renewable Energy',
    description: 'Pioneer in solar energy solutions with projects across Nepal, focusing on rural electrification.',
    minInvestment: 25000,
    maxInvestment: 1000000,
    targetRaise: 100000000,
    raisedAmount: 45000000,
    preIPOValuation: 500000000,
    expectedIPODate: '2026-12-31',
    closingDate: '2025-04-30',
    investorsCount: 89,
    status: 'active',
    highlights: ['Government contracts', 'International partnerships', '15MW capacity']
  }
];

const Offerings: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);

  // Load companies from localStorage and convert to offerings
  useEffect(() => {
    const loadOfferings = () => {
      console.log('Offerings: Loading companies from localStorage...');
      const savedCompanies = localStorage.getItem('nepex_companies');
      
      if (savedCompanies) {
        try {
          const companies: Company[] = JSON.parse(savedCompanies);
          console.log('Loaded companies:', companies);
          
          // Filter for active companies only and convert to offerings
          const activeCompanies = companies.filter(company => 
            company.status === 'active' && 
            company.documentsStatus === 'approved' &&
            company.kycStatus === 'approved'
          );
          
          console.log('Active companies for offerings:', activeCompanies);
          
          const companyOfferings = activeCompanies.map(convertCompanyToOffering);
          
          // Combine with fallback offerings for demo
          const allOfferings = [...companyOfferings, ...fallbackOfferings];
          
          console.log('Total offerings available:', allOfferings.length);
          setOfferings(allOfferings);
        } catch (error) {
          console.error('Error loading companies:', error);
          setOfferings(fallbackOfferings);
        }
      } else {
        console.log('No companies found, using fallback offerings');
        setOfferings(fallbackOfferings);
      }
      
      setLoading(false);
    };

    loadOfferings();

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log('Storage changed, reloading offerings...');
      loadOfferings();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refreshCompanies', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshCompanies', handleStorageChange);
    };
  }, []);

  // Get unique sectors from offerings
  const sectors = ['All', ...Array.from(new Set(offerings.map(o => o.sector)))];

  const filteredOfferings = offerings.filter(offering => {
    const matchesSearch = offering.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offering.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'All' || offering.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investment Opportunities</h1>
          <p className="text-gray-600 mt-2">Explore pre-IPO investment opportunities from verified companies</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search companies or sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sector</label>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <Button
                        key={sector}
                        variant={selectedSector === sector ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSector(sector)}
                      >
                        {sector}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Opportunities</p>
            <p className="text-2xl font-bold text-gray-900">{filteredOfferings.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Target Raise</p>
            <p className="text-2xl font-bold text-gray-900">
              NPR {(filteredOfferings.reduce((sum, o) => sum + o.targetRaise, 0) / 10000000).toFixed(1)} Cr
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Average Min. Investment</p>
            <p className="text-2xl font-bold text-gray-900">
              NPR {Math.round(filteredOfferings.reduce((sum, o) => sum + o.minInvestment, 0) / filteredOfferings.length).toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOfferings.map((offering) => (
            <Card key={offering.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={offering.logo}
                        alt={`${offering.companyName} logo`}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offering.companyName)}&size=48&background=f3f4f6&color=374151&format=svg`;
                        }}
                      />
                    </div>
                    {/* Company Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{offering.companyName}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Building2 className="h-4 w-4" />
                        {offering.sector}
                      </p>
                    </div>
                  </div>
                  {offering.status === 'closing_soon' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Closing Soon
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">{offering.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {offering.highlights.map((highlight, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-medium">
                      {((offering.raisedAmount / offering.targetRaise) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(offering.raisedAmount / offering.targetRaise) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">
                      NPR {(offering.raisedAmount / 10000000).toFixed(1)} Cr
                    </span>
                    <span className="text-gray-600">
                      of {(offering.targetRaise / 10000000).toFixed(1)} Cr
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Min. Investment
                    </p>
                    <p className="font-semibold">NPR {offering.minInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Investors
                    </p>
                    <p className="font-semibold">{offering.investorsCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Closing Date
                    </p>
                    <p className="font-semibold">{new Date(offering.closingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Expected IPO
                    </p>
                    <p className="font-semibold">{new Date(offering.expectedIPODate).getFullYear()}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => navigate(`/investor/offerings/${offering.id}`)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOfferings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No offerings found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedSector('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offerings;