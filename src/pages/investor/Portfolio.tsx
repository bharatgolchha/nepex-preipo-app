import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  PieChart,
  BarChart3,
  Lock
} from 'lucide-react';

// Sample portfolio data
const portfolioData = {
  summary: {
    totalInvested: 350000,
    currentValue: 415000,
    totalReturns: 65000,
    returnsPercentage: 18.57,
    totalSPVUnits: 35,
    activeInvestments: 4,
    exitedInvestments: 1,
    averageHoldingPeriod: '1.5 years'
  },
  investments: [
    {
      id: 1,
      companyName: 'TechCo Nepal Pvt. Ltd.',
      sector: 'Technology',
      investmentDate: '2023-06-15',
      initialInvestment: 50000,
      spvUnits: 5,
      currentValue: 68000,
      returns: 18000,
      returnsPercentage: 36,
      status: 'active',
      lockInPeriod: '2026-06-15',
      expectedIPO: '2026-06-30',
      documents: ['Investment Agreement', 'SPV Certificate']
    },
    {
      id: 2,
      companyName: 'Green Energy Solutions',
      sector: 'Renewable Energy',
      investmentDate: '2023-08-20',
      initialInvestment: 100000,
      spvUnits: 10,
      currentValue: 125000,
      returns: 25000,
      returnsPercentage: 25,
      status: 'active',
      lockInPeriod: '2026-08-20',
      expectedIPO: '2026-12-31',
      documents: ['Investment Agreement', 'SPV Certificate', 'Annual Report 2023']
    },
    {
      id: 3,
      companyName: 'FinTech Innovations Nepal',
      sector: 'Financial Services',
      investmentDate: '2023-10-10',
      initialInvestment: 100000,
      spvUnits: 10,
      currentValue: 115000,
      returns: 15000,
      returnsPercentage: 15,
      status: 'active',
      lockInPeriod: '2026-10-10',
      expectedIPO: '2027-03-31',
      documents: ['Investment Agreement', 'SPV Certificate']
    },
    {
      id: 4,
      companyName: 'HealthPlus Diagnostics',
      sector: 'Healthcare',
      investmentDate: '2024-01-15',
      initialInvestment: 75000,
      spvUnits: 7.5,
      currentValue: 82000,
      returns: 7000,
      returnsPercentage: 9.33,
      status: 'active',
      lockInPeriod: '2027-01-15',
      expectedIPO: '2025-12-31',
      documents: ['Investment Agreement', 'SPV Certificate', 'Quarterly Report Q3 2024']
    },
    {
      id: 5,
      companyName: 'EduTech Solutions',
      sector: 'Education',
      investmentDate: '2022-03-10',
      initialInvestment: 25000,
      spvUnits: 2.5,
      exitDate: '2024-06-15',
      exitValue: 45000,
      returns: 20000,
      returnsPercentage: 80,
      status: 'exited',
      exitType: 'IPO',
      documents: ['Investment Agreement', 'Exit Certificate', 'IPO Allotment Letter']
    }
  ],
  sectorAllocation: [
    { sector: 'Technology', value: 50000, percentage: 14.3 },
    { sector: 'Renewable Energy', value: 100000, percentage: 28.6 },
    { sector: 'Financial Services', value: 100000, percentage: 28.6 },
    { sector: 'Healthcare', value: 75000, percentage: 21.4 },
    { sector: 'Education', value: 25000, percentage: 7.1 }
  ]
};

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'performance' | 'documents'>('holdings');

  const activeInvestments = portfolioData.investments.filter(inv => inv.status === 'active');
  const exitedInvestments = portfolioData.investments.filter(inv => inv.status === 'exited');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-600 mt-2">Track your investments and monitor performance</p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-500">Total Invested</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              NPR {portfolioData.summary.totalInvested.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <span className="text-sm text-gray-500">Current Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              NPR {portfolioData.summary.currentValue.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{portfolioData.summary.returnsPercentage}%
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <PieChart className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-gray-500">Total Returns</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              NPR {portfolioData.summary.totalReturns.toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <span className="text-sm text-gray-500">SPV Units</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {portfolioData.summary.totalSPVUnits}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('holdings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'holdings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Holdings
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'holdings' && (
          <div className="space-y-6">
            {/* Active Investments */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Investments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Investment Date</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Current Value</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Returns</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Lock-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeInvestments.map((investment) => (
                        <tr key={investment.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{investment.companyName}</p>
                              <p className="text-sm text-gray-600">{investment.sector}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {new Date(investment.investmentDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900">
                            NPR {investment.initialInvestment.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900">
                            NPR {(investment.currentValue || investment.initialInvestment).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className={`font-medium ${investment.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {investment.returns > 0 ? '+' : ''}{investment.returnsPercentage}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center text-sm text-gray-600">
                              <Lock className="h-4 w-4 mr-1" />
                              {investment.lockInPeriod}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Exited Investments */}
            {exitedInvestments.length > 0 && (
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Exited Investments</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Investment Period</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Invested</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Exit Value</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Returns</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Exit Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exitedInvestments.map((investment) => (
                          <tr key={investment.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{investment.companyName}</p>
                                <p className="text-sm text-gray-600">{investment.sector}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {new Date(investment.investmentDate).toLocaleDateString()} - 
                              {new Date(investment.exitDate!).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-right text-gray-900">
                              NPR {investment.initialInvestment.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right text-gray-900">
                              NPR {investment.exitValue!.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-medium text-green-600">
                                +{investment.returnsPercentage}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {investment.exitType}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Sector Allocation */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sector Allocation</h2>
                <div className="space-y-4">
                  {portfolioData.sectorAllocation.map((sector) => (
                    <div key={sector.sector}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{sector.sector}</span>
                        <span className="font-medium">
                          NPR {sector.value.toLocaleString()} ({sector.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${sector.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Average Returns</h3>
                <p className="text-3xl font-bold text-green-600">+{portfolioData.summary.returnsPercentage}%</p>
                <p className="text-sm text-gray-600 mt-1">Across all investments</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Holding Period</h3>
                <p className="text-3xl font-bold text-gray-900">{portfolioData.summary.averageHoldingPeriod}</p>
                <p className="text-sm text-gray-600 mt-1">Average duration</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Success Rate</h3>
                <p className="text-3xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600 mt-1">Profitable investments</p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Documents</h2>
              <div className="space-y-4">
                {portfolioData.investments.map((investment) => (
                  <div key={investment.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">{investment.companyName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {investment.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-700">{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Portfolio;