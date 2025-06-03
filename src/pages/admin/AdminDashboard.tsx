import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/store/adminAuthContext';
import {
  Building2,
  UserCheck,
  FileCheck,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Eye
} from 'lucide-react';

// Mock data for dashboard
const dashboardStats = {
  totalCompanies: 23,
  activeCompanies: 18,
  pendingApproval: 3,
  suspended: 2,
  documentsToReview: 8,
  totalFundingFacilitated: 850000000,
  monthlyGrowth: 12.5
};

const recentActivities = [
  {
    id: 1,
    type: 'company_created',
    message: 'New company "TechStart Nepal" created by Sita Thapa',
    timestamp: '2024-01-15T10:30:00Z',
    icon: Building2,
    color: 'text-blue-600'
  },
  {
    id: 2,
    type: 'document_submitted',
    message: 'Documents submitted by GreenEnergy Solutions for review',
    timestamp: '2024-01-15T09:15:00Z',
    icon: FileCheck,
    color: 'text-orange-600'
  },
  {
    id: 3,
    type: 'company_approved',
    message: 'FinTech Innovations approved by Ram Sharma',
    timestamp: '2024-01-15T08:45:00Z',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: 4,
    type: 'kyc_completed',
    message: 'KYC verification completed for HealthPlus Diagnostics',
    timestamp: '2024-01-14T16:20:00Z',
    icon: UserCheck,
    color: 'text-purple-600'
  }
];

const pendingTasks = [
  {
    id: 1,
    title: 'Review documents for TechCo Nepal',
    description: 'Financial statements and business plan require verification',
    priority: 'high',
    dueDate: '2024-01-16'
  },
  {
    id: 2,
    title: 'Approve KYC for GreenEnergy Solutions',
    description: 'All documents verified, ready for final approval',
    priority: 'medium',
    dueDate: '2024-01-17'
  },
  {
    id: 3,
    title: 'Schedule onboarding call with EduTech Nepal',
    description: 'Initial company profile created, schedule introduction call',
    priority: 'low',
    dueDate: '2024-01-18'
  }
];

const AdminDashboard: React.FC = () => {
  const { adminUser, hasPermission } = useAdminAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {adminUser?.name.split(' ')[0]}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your companies today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalCompanies}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+{dashboardStats.monthlyGrowth}%</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Companies</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeCompanies}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {dashboardStats.pendingApproval} pending approval
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Documents to Review</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.documentsToReview}</p>
            </div>
            <FileCheck className="h-8 w-8 text-orange-600" />
          </div>
          <div className="mt-4 text-sm text-red-600">
            Requires attention
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Funding</p>
              <p className="text-2xl font-bold text-gray-900">
                NPR {(dashboardStats.totalFundingFacilitated / 10000000).toFixed(1)} Cr
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Facilitated to date
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hasPermission('companies.create') && (
            <Link to="/admin/companies/create">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Add New Company</h3>
                    <p className="text-sm text-gray-600">Create a new company profile</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {hasPermission('documents.verify') && (
            <Link to="/admin/documents">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <FileCheck className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Review Documents</h3>
                    <p className="text-sm text-gray-600">Verify pending documents</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {hasPermission('users.manage') && (
            <Link to="/admin/users">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Manage Users</h3>
                    <p className="text-sm text-gray-600">Add or edit admin users</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 