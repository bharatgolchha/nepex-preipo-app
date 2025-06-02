import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Calendar,
  BarChart3,
  Building2,
  Target
} from 'lucide-react';

// Sample company data
const companyData = {
  companyName: 'TechCo Nepal Pvt. Ltd.',
  verificationStatus: 'verified',
  activeOffering: {
    id: 1,
    name: 'Series A - Pre-IPO Round',
    status: 'active',
    targetRaise: 50000000,
    raisedAmount: 35000000,
    investorsCount: 156,
    daysRemaining: 42,
    closingDate: '2025-03-15'
  },
  metrics: {
    totalRaised: 135000000,
    totalInvestors: 423,
    activeOfferings: 1,
    completedOfferings: 2,
    documentsUploaded: 24,
    pendingActions: 3
  },
  recentInvestors: [
    {
      id: 1,
      name: 'Rajesh Kumar Sharma',
      amount: 100000,
      date: '2025-01-30',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Sita Pradhan',
      amount: 50000,
      date: '2025-01-29',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Hari Bahadur Thapa',
      amount: 150000,
      date: '2025-01-28',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Maya Devi Karki',
      amount: 75000,
      date: '2025-01-27',
      status: 'completed'
    }
  ],
  upcomingTasks: [
    {
      id: 1,
      title: 'Submit Q4 2024 Financial Report',
      dueDate: '2025-02-10',
      type: 'document',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Investor Update - January 2025',
      dueDate: '2025-02-05',
      type: 'communication',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Schedule Board Meeting for IPO Planning',
      dueDate: '2025-02-15',
      type: 'meeting',
      priority: 'medium'
    }
  ],
  performanceMetrics: {
    weeklyGrowth: 12.5,
    conversionRate: 68,
    avgInvestmentSize: 85000,
    investorRetention: 94
  }
};

const CompanyDashboard: React.FC = () => {
  const percentageRaised = (companyData.activeOffering.raisedAmount / companyData.activeOffering.targetRaise) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {companyData.companyName}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Verified Company</span>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        {companyData.metrics.pendingActions > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">You have {companyData.metrics.pendingActions} pending actions</p>
                  <p className="text-sm text-gray-600">Complete these to maintain your offering status</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Active Offering Card */}
        {companyData.activeOffering && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{companyData.activeOffering.name}</h2>
                  <p className="text-gray-600 mt-1">Active offering " {companyData.activeOffering.daysRemaining} days remaining</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-medium">{percentageRaised.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${percentageRaised}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">
                    NPR {(companyData.activeOffering.raisedAmount / 10000000).toFixed(1)} Cr raised
                  </span>
                  <span className="text-gray-600">
                    Target: NPR {(companyData.activeOffering.targetRaise / 10000000).toFixed(1)} Cr
                  </span>
                </div>
              </div>

              {/* Offering Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{companyData.activeOffering.investorsCount}</p>
                  <p className="text-sm text-gray-600">Investors</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    NPR {(companyData.activeOffering.raisedAmount / companyData.activeOffering.investorsCount / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-600">Avg. Investment</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{companyData.activeOffering.daysRemaining}</p>
                  <p className="text-sm text-gray-600">Days Left</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button className="flex-1">
                  Manage Offering
                </Button>
                <Button variant="outline" className="flex-1">
                  View Analytics
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-sm text-gray-500">Total Raised</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              NPR {(companyData.metrics.totalRaised / 10000000).toFixed(1)} Cr
            </p>
            <p className="text-sm text-green-600 mt-1">All time</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-500">Total Investors</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{companyData.metrics.totalInvestors}</p>
            <p className="text-sm text-blue-600 mt-1">+23 this month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-purple-600" />
              <span className="text-sm text-gray-500">Active Offerings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{companyData.metrics.activeOfferings}</p>
            <p className="text-sm text-purple-600 mt-1">{companyData.metrics.completedOfferings} completed</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-orange-600" />
              <span className="text-sm text-gray-500">Documents</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{companyData.metrics.documentsUploaded}</p>
            <p className="text-sm text-orange-600 mt-1">In data room</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Investors */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Investors</h2>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {companyData.recentInvestors.map((investor) => (
                  <div key={investor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{investor.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(investor.date).toLocaleDateString()} " NPR {investor.amount.toLocaleString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      investor.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {investor.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {companyData.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="mt-0.5">
                      {task.type === 'document' && <FileText className="h-5 w-5 text-blue-600" />}
                      {task.type === 'communication' && <Users className="h-5 w-5 text-green-600" />}
                      {task.type === 'meeting' && <Calendar className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs font-medium ${
                      task.priority === 'high' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mt-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-1" />
                  <p className="text-2xl font-bold text-gray-900">{companyData.performanceMetrics.weeklyGrowth}%</p>
                </div>
                <p className="text-sm text-gray-600">Weekly Growth</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-1" />
                  <p className="text-2xl font-bold text-gray-900">{companyData.performanceMetrics.conversionRate}%</p>
                </div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-purple-600 mr-1" />
                  <p className="text-2xl font-bold text-gray-900">
                    NPR {(companyData.performanceMetrics.avgInvestmentSize / 1000).toFixed(0)}K
                  </p>
                </div>
                <p className="text-sm text-gray-600">Avg. Investment</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-orange-600 mr-1" />
                  <p className="text-2xl font-bold text-gray-900">{companyData.performanceMetrics.investorRetention}%</p>
                </div>
                <p className="text-sm text-gray-600">Investor Retention</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
            <Building2 className="h-6 w-6" />
            <span>Update Company Profile</span>
          </Button>
          <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
            <FileText className="h-6 w-6" />
            <span>Upload Documents</span>
          </Button>
          <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
            <Users className="h-6 w-6" />
            <span>Message Investors</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;