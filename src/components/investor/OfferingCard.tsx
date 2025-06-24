import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

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

interface OfferingCardProps {
  offering: Offering;
  className?: string;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ offering, className = '' }) => {
  const navigate = useNavigate();

  const progressPercentage = (offering.raisedAmount / offering.targetRaise) * 100;
  const daysRemaining = Math.ceil(
    (new Date(offering.closingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleViewDetails = () => {
    navigate(`/investor/offerings/${offering.id}`);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}>
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
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offering.companyName)}&size=48&background=f3f4f6&color=374151&format=svg`;
                }}
              />
            </div>
            {/* Company Info */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{offering.companyName}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4" />
                {offering.sector}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          {daysRemaining <= 7 && daysRemaining > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {daysRemaining} days left
            </span>
          )}
          {offering.status === 'hot' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              🔥 Hot
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{offering.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {offering.highlights.slice(0, 2).map((highlight, index) => (
            <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              {highlight}
            </span>
          ))}
          {offering.highlights.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              +{offering.highlights.length - 2} more
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Funding Progress</span>
            <span className="font-semibold text-blue-600">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">
              NPR {(offering.raisedAmount / 10000000).toFixed(1)} Cr raised
            </span>
            <span className="text-gray-600">
              of {(offering.targetRaise / 10000000).toFixed(1)} Cr
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <DollarSign className="h-4 w-4" />
              Min. Investment
            </p>
            <p className="font-semibold text-gray-900">NPR {offering.minInvestment.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <Users className="h-4 w-4" />
              Investors
            </p>
            <p className="font-semibold text-gray-900">{offering.investorsCount}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <Calendar className="h-4 w-4" />
              Closing Date
            </p>
            <p className="font-semibold text-gray-900">{new Date(offering.closingDate).toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4" />
              Expected IPO
            </p>
            <p className="font-semibold text-gray-900">{new Date(offering.expectedIPODate).getFullYear()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            className="flex-1" 
            variant="default"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button 
            variant="outline"
            onClick={handleViewDetails}
          >
            Invest Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OfferingCard;
