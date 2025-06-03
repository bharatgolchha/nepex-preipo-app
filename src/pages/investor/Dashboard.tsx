import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertCircle,
  ArrowRight,
  Clock,
  Eye,
  Building2
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

// Sample data
const portfolioSummary = {
  totalInvested: 250000,
  currentValue: 285000,
  totalReturns: 35000,
  returnsPercentage: 14,
  activeInvestments: 3,
  pendingInvestments: 1
};

const recentInvestments = [
  {
    id: 1,
    company: 'TechCo Nepal Pvt. Ltd.',
    amount: 50000,
    investmentUnits: 5,
    date: '2024-01-15',
    status: 'Active',
    currentValue: 55000
  },
  {
    id: 2,
    company: 'GreenEnergy Solutions',
    amount: 100000,
    investmentUnits: 10,
    date: '2024-01-10',
    status: 'Active',
    currentValue: 115000
  },
  {
    id: 3,
    company: 'FinTech Innovations',
    amount: 75000,
    investmentUnits: 7,
    date: '2024-01-05',
    status: 'Active',
    currentValue: 82000
  }
];

const InvestorDashboard: React.FC = () => {
  const [availableCompanies, setAvailableCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const kycStatus = 'approved'; // Sample KYC status

  // Load companies from localStorage
  useEffect(() => {
    const loadCompanies = () => {
      console.log('Dashboard: Loading companies from localStorage...');
      const savedCompanies = localStorage.getItem('nepex_companies');
      
      if (savedCompanies) {
        try {
          const companies: Company[] = JSON.parse(savedCompanies);
          
          // Filter for active companies only
          const activeCompanies = companies.filter(company => 
            company.status === 'active' && 
            company.documentsStatus === 'approved' &&
            company.kycStatus === 'approved'
          );
          
          console.log('Active companies for dashboard:', activeCompanies);
          setAvailableCompanies(activeCompanies);
        } catch (error) {
          console.error('Error loading companies:', error);
          setAvailableCompanies([]);
        }
      } else {
        console.log('No companies found');
        setAvailableCompanies([]);
      }
      
      setLoading(false);
    };

    loadCompanies();

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log('Storage changed, reloading companies in dashboard...');
      loadCompanies();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refreshCompanies', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshCompanies', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Track your investments and explore new opportunities.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/investor/offerings">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Browse Opportunities</h3>
                  <p className="text-sm text-gray-600">Find new investment opportunities</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </Card>
          </Link>
          
          <Link to="/investor/portfolio">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Portfolio</h3>
                  <p className="text-sm text-gray-600">Track your investments</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </Card>
          </Link>
          
          <Link to="/investor/profile">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Update Profile</h3>
                  <p className="text-sm text-gray-600">Manage your account</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </Card>
          </Link>
        </div>

        {/* KYC Alert */}
        {kycStatus !== 'approved' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Complete your KYC verification</p>
                  <p className="text-sm text-gray-600">KYC approval is required before you can invest</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Complete KYC
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-500">Total Invested</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">NPR {portfolioSummary.totalInvested.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="text-sm text-gray-500">Current Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">NPR {portfolioSummary.currentValue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+{portfolioSummary.returnsPercentage}%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-gray-500">Active Investments</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{portfolioSummary.activeInvestments}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{portfolioSummary.pendingInvestments}</p>
          </Card>
        </div>

        {/* Recent Investments */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Investments</h2>
              <Link to="/investor/portfolio">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Investment Units</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Current Value</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvestments.map((investment) => (
                    <tr key={investment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{investment.company}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(investment.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-900">
                        NPR {investment.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-900">
                        {investment.investmentUnits}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-gray-900">NPR {investment.currentValue.toLocaleString()}</span>
                        <span className="text-green-600 text-sm block">
                          +{((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {investment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link to={`/investor/offerings/${investment.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Upcoming Opportunities */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Investment Opportunities</h2>
              <Link to="/investor/offerings">
                <Button variant="ghost" size="sm">
                  Browse All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading opportunities...</p>
              </div>
            ) : availableCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCompanies.slice(0, 4).map((company) => (
                  <div key={company.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=40&background=f3f4f6&color=374151&format=svg`;
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.sector}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Registration:</span>
                        <span className="font-medium">{company.registrationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Raise:</span>
                        <span className="font-medium">
                          NPR {company.fundingTarget ? (company.fundingTarget / 10000000).toFixed(1) + ' Cr' : 'TBD'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Link to={`/investor/offerings/${company.id}`}>
                      <Button className="w-full mt-4" variant="outline" size="sm">
                        View Investment Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Investment Opportunities Available</h3>
                <p className="text-gray-600 mb-4">New investment opportunities will appear here once companies are approved by our team.</p>
                <Link to="/investor/offerings">
                  <Button variant="outline">
                    Check Available Offerings
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestorDashboard;