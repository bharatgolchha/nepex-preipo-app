import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Target,
  Info
} from 'lucide-react';

// Sample offering details data
const offeringData = {
  id: 1,
  companyName: 'TechCo Nepal Pvt. Ltd.',
  logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=entropy&auto=format&q=60',
  sector: 'Technology',
  tagline: 'Leading the digital transformation in Nepal',
  description: `TechCo Nepal is a pioneering software development company specializing in fintech solutions for the Nepalese market. Founded in 2018, we have rapidly grown to become one of the leading technology companies in Nepal, serving over 50,000 customers through our various digital platforms.

  Our flagship products include a mobile banking solution used by 5 major banks, a digital wallet platform, and an AI-powered credit scoring system. We are committed to financial inclusion and making banking services accessible to all Nepalese citizens.`,
  
  financials: {
    revenue2023: 150000000,
    revenue2022: 95000000,
    revenue2021: 60000000,
    profitMargin: 22,
    employeeCount: 156,
    marketShare: 15
  },
  
  investment: {
    minInvestment: 10000,
    maxInvestment: 1000000,
    targetRaise: 50000000,
    currentRaised: 35000000,
    expectedIPODate: '2026-06-30',
    investmentStructure: 'Each investment unit represents 10 shares'
  },
  
  highlights: [
    '20% YoY revenue growth for last 3 years',
    'Profitable since 2022 with 22% profit margin',
    'Market leader in banking software solutions',
    'Strong partnerships with major banks',
    'Experienced management team with 50+ years combined experience',
    'Clear path to IPO with investment banking advisors appointed'
  ],
  
  risks: [
    'Regulatory changes in financial technology sector',
    'Competition from international players',
    'Dependency on key banking partnerships',
    'Technology adoption rate in rural areas'
  ],
  
  documents: [
    { name: 'Company Presentation', size: '5.2 MB', type: 'PDF' },
    { name: 'Financial Statements FY 2023', size: '2.8 MB', type: 'PDF' },
    { name: 'Business Plan 2024-2026', size: '3.5 MB', type: 'PDF' },
    { name: 'Due Diligence Report', size: '4.1 MB', type: 'PDF' }
  ],
  
  management: [
    { name: 'Ram Prasad Sharma', position: 'CEO & Founder', experience: '15 years' },
    { name: 'Sita Devi Pradhan', position: 'CTO', experience: '12 years' },
    { name: 'Hari Bahadur Thapa', position: 'CFO', experience: '18 years' }
  ]
};

const OfferingDetails: React.FC = () => {
  // const { id } = useParams(); // Currently unused
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  
  const percentageRaised = (offeringData.investment.currentRaised / offeringData.investment.targetRaise) * 100;
  const investmentUnits = investmentAmount ? Math.floor(Number(investmentAmount) / 10000) : 0;
  const shareCount = investmentUnits * 10;

  const handleInvest = () => {
    if (Number(investmentAmount) >= offeringData.investment.minInvestment) {
      setShowInvestmentModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/investor/offerings')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Offerings
        </Button>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <img
                      src={offeringData.logo}
                      alt={`${offeringData.companyName} logo`}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(offeringData.companyName)}&size=64&background=f3f4f6&color=374151&format=svg`;
                      }}
                    />
                  </div>
                  {/* Company Info */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{offeringData.companyName}</h1>
                    <p className="text-lg text-gray-600 mt-1">{offeringData.tagline}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center text-gray-600">
                        <Building2 className="h-4 w-4 mr-1" />
                        {offeringData.sector}
                      </span>
                      <span className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {offeringData.financials.employeeCount} employees
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Key Highlights */}
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Investment Highlights</h3>
                <ul className="space-y-1">
                  {offeringData.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="flex items-start text-sm text-blue-800">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* About Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Company</h2>
              <div className="prose max-w-none text-gray-600">
                {offeringData.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph.trim()}</p>
                ))}
              </div>
            </Card>

            {/* Financial Performance */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Performance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Revenue Growth</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">2021</p>
                      <p className="text-lg font-semibold">NPR {(offeringData.financials.revenue2021 / 10000000).toFixed(1)} Cr</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">2022</p>
                      <p className="text-lg font-semibold">NPR {(offeringData.financials.revenue2022 / 10000000).toFixed(1)} Cr</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">2023</p>
                      <p className="text-lg font-semibold">NPR {(offeringData.financials.revenue2023 / 10000000).toFixed(1)} Cr</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-gray-900">{offeringData.financials.profitMargin}%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Market Share</p>
                    <p className="text-2xl font-bold text-gray-900">{offeringData.financials.marketShare}%</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Management Team */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Management Team</h2>
              <div className="space-y-3">
                {offeringData.management.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                    <p className="text-sm text-gray-500">{member.experience}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {offeringData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} " {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Risks */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Risks</h2>
              <div className="space-y-2">
                {offeringData.risks.map((risk, index) => (
                  <div key={index} className="flex items-start text-sm text-gray-600">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                    {risk}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Investment Card */}
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Details</h2>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-medium">{percentageRaised.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${percentageRaised}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">
                    NPR {(offeringData.investment.currentRaised / 10000000).toFixed(1)} Cr
                  </span>
                  <span className="text-gray-600">
                    of {(offeringData.investment.targetRaise / 10000000).toFixed(1)} Cr
                  </span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Min. Investment
                  </span>
                  <span className="font-semibold">NPR {offeringData.investment.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Investment Units
                  </span>
                  <span className="font-semibold">{investmentUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Share Count
                  </span>
                  <span className="font-semibold">{shareCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Expected IPO
                  </span>
                  <span className="font-semibold">{new Date(offeringData.investment.expectedIPODate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Investment Calculator */}
              <div className="border-t pt-4">
                <Label htmlFor="investment-amount" className="mb-2 block">Investment Amount (NPR)</Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min={offeringData.investment.minInvestment}
                  max={offeringData.investment.maxInvestment}
                  step={10000}
                  className="mb-3"
                />
                
                {investmentAmount && Number(investmentAmount) >= offeringData.investment.minInvestment && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Investment Units:</span>
                      <span className="font-medium">{investmentUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Share Count:</span>
                      <span className="font-medium">{shareCount}</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleInvest}
                  disabled={!investmentAmount || Number(investmentAmount) < offeringData.investment.minInvestment}
                >
                  Invest Now
                </Button>
                
                {investmentAmount && Number(investmentAmount) < offeringData.investment.minInvestment && (
                  <p className="text-sm text-red-600 mt-2">
                    Minimum investment is NPR {offeringData.investment.minInvestment.toLocaleString()}
                  </p>
                )}
              </div>
            </Card>

            {/* Investment Structure Info */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Investment Structure</h3>
                  <p className="text-sm text-blue-800 mt-1">{offeringData.investment.investmentStructure}</p>
                  <p className="text-sm text-blue-800 mt-1">
                    Minimum investment of NPR 10,000 = 1 investment unit
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Investment</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{offeringData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">NPR {Number(investmentAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Units:</span>
                <span className="font-medium">{investmentUnits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lock-in Period:</span>
                <span className="font-medium">3 years</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowInvestmentModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  // Navigate to payment page
                  navigate(`/payment/${offeringData.id}?amount=${investmentAmount}`);
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OfferingDetails;