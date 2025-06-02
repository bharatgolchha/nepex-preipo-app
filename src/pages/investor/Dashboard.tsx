import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Briefcase,
  FileText,
  AlertCircle,
  ArrowRight,
  DollarSign,
  Users,
  Clock
} from 'lucide-react';

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
    companyName: 'TechCo Nepal Pvt. Ltd.',
    investmentDate: '2024-12-15',
    amount: 50000,
    spvUnits: 5,
    status: 'active',
    currentValue: 58000
  },
  {
    id: 2,
    companyName: 'Green Energy Solutions',
    investmentDate: '2024-11-20',
    amount: 100000,
    spvUnits: 10,
    status: 'active',
    currentValue: 112000
  },
  {
    id: 3,
    companyName: 'FinTech Innovations Nepal',
    investmentDate: '2024-10-10',
    amount: 100000,
    spvUnits: 10,
    status: 'active',
    currentValue: 115000
  }
];

const upcomingOpportunities = [
  {
    id: 1,
    companyName: 'EduTech Nepal',
    sector: 'Education Technology',
    minInvestment: 10000,
    targetRaise: 50000000,
    closingDate: '2025-02-15',
    preIPOValuation: 200000000
  },
  {
    id: 2,
    companyName: 'HealthPlus Hospitals',
    sector: 'Healthcare',
    minInvestment: 25000,
    targetRaise: 100000000,
    closingDate: '2025-02-28',
    preIPOValuation: 500000000
  }
];

const InvestorDashboard: React.FC = () => {
  const kycStatus = 'approved'; // Sample KYC status

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Track your investments and explore new opportunities.</p>
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
              <Briefcase className="h-8 w-8 text-purple-600" />
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
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">SPV Units</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Current Value</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvestments.map((investment) => (
                    <tr key={investment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{investment.companyName}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(investment.investmentDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-900">
                        NPR {investment.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-900">
                        {investment.spvUnits}
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
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Opportunities</h2>
              <Button variant="ghost" size="sm">
                Browse All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{opportunity.companyName}</h3>
                  <p className="text-sm text-gray-600 mb-3">{opportunity.sector}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min. Investment:</span>
                      <span className="font-medium">NPR {opportunity.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Raise:</span>
                      <span className="font-medium">NPR {(opportunity.targetRaise / 10000000).toFixed(1)} Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Date:</span>
                      <span className="font-medium">{new Date(opportunity.closingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvestorDashboard;