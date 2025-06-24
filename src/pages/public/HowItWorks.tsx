import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { 
  UserPlus, 
  FileCheck, 
  DollarSign, 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Building2, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Banknote,
  FileText,
  Target,
  Briefcase,
  PieChart,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

/**
 * How It Works page for NepEx Pre-IPO Investment Platform.
 * 
 * Comprehensive guide explaining the investment process, KYC requirements,
 * and step-by-step instructions for investors and companies.
 */
function HowItWorks() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const investorSteps = [
    {
      icon: UserPlus,
      title: "Sign Up & Verify",
      description: "Create your account and complete KYC verification with required documents.",
      details: [
        "Provide personal information",
        "Upload citizenship/passport",
        "Complete identity verification",
        "Wait for admin approval (24-48 hours)"
      ],
      color: "bg-blue-500"
    },
    {
      icon: FileCheck,
      title: "Browse Opportunities", 
      description: "Explore curated pre-IPO investment opportunities from verified companies.",
      details: [
        "View detailed company profiles",
        "Review financial information",
        "Download due diligence documents",
        "Analyze investment terms"
      ],
      color: "bg-green-500"
    },
    {
      icon: DollarSign,
      title: "Make Investment",
      description: "Invest starting from NPR 10,000 through our secure investment platform.",
      details: [
        "Select investment amount",
        "Review investment terms and conditions",
        "Make secure payment",
        "Receive investment confirmation"
      ],
      color: "bg-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Track Portfolio",
      description: "Monitor your investments and track performance through your dashboard.",
      details: [
        "View portfolio overview",
        "Track investment performance",
        "Receive company updates",
        "Access investment documents"
      ],
      color: "bg-orange-500"
    }
  ]

  const companySteps = [
    {
      icon: Building2,
      title: "Register & Verify",
      description: "Submit company information and complete verification process.",
      details: [
        "Company registration details",
        "Upload business documents",
        "Team member verification",
        "Admin review and approval"
      ],
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Prepare Documentation",
      description: "Compile required business and financial documents.",
      details: [
        "Financial statements (3 years)",
        "Business plan and projections",
        "Legal documents",
        "Due diligence materials"
      ],
      color: "bg-green-500"
    },
    {
      icon: Target,
      title: "Create Offering",
      description: "Set up your pre-IPO offering with detailed terms.",
      details: [
        "Define investment terms",
        "Set funding targets",
        "Upload pitch materials",
        "Submit for platform approval"
      ],
      color: "bg-purple-500"
    },
    {
      icon: PieChart,
      title: "Manage Funding",
      description: "Track funding progress and manage investor relations.",
      details: [
        "Monitor investment progress",
        "Communicate with investors",
        "Provide regular updates",
        "Close funding round"
      ],
      color: "bg-orange-500"
    }
  ]

  const kycRequirements = [
    {
      category: "Individual Investors",
      documents: [
        "Citizenship certificate or passport",
        "Recent passport-size photograph",
        "Proof of address (utility bill/bank statement)",
        "PAN certificate",
        "Bank account details"
      ]
    },
    {
      category: "Companies",
      documents: [
        "Company registration certificate",
        "PAN/VAT registration",
        "Board resolution for fundraising",
        "Audited financial statements (3 years)",
        "Key personnel KYC documents"
      ]
    }
  ]

  const platformBenefits = [
    {
      icon: Shield,
      title: "Legal Protection",
      description: "Secure platform with proper regulatory compliance and investor protection."
    },
    {
      icon: Users,
      title: "Pooled Opportunities",
      description: "Access to larger investment opportunities through our platform."
    },
    {
      icon: FileCheck,
      title: "Professional Management",
      description: "Expert management of legal processes and investor relations."
    },
    {
      icon: Banknote,
      title: "Simplified Process",
      description: "Streamlined processes for investments, reporting, and documentation."
    }
  ]

  const riskFactors = [
    "Pre-IPO investments are high-risk and illiquid",
    "No guarantee of IPO or positive returns",
    "Company may fail or underperform",
    "Regulatory changes may affect investments",
    "Limited secondary market liquidity"
  ]

  return (
    <main className="min-h-screen">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                NepEx
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/how-it-works" className="text-blue-600 font-medium">
                How it Works
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/opportunities" className="text-gray-700 hover:text-blue-600 transition-colors">
                Opportunities
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/investor-register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  className="block px-3 py-2 text-blue-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/opportunities"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Opportunities
                </Link>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/auth/investor-register"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-5" />
          <div className="absolute top-20 right-20 w-32 h-32 nepal-flag-gradient rounded-full opacity-10 animate-float" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/20 rounded-full animate-pulse" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                How <span className="text-primary">NepEx</span> Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                A comprehensive guide to understanding pre-IPO investments, our platform 
                processes, and how you can participate in Nepal's growing startup ecosystem.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-foreground">Secure & Regulated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-foreground">Quick Process</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-foreground">Community Driven</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Process */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  For Investors
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Simple, transparent process to start your pre-IPO investment journey
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {investorSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={index} className="relative group">
                      {/* Connection line */}
                      {index < investorSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-12 left-full w-full z-10">
                          <ArrowRight className="w-6 h-6 text-primary/30 mx-auto" />
                        </div>
                      )}
                      
                      <div className="text-center bg-background border rounded-xl p-6 group-hover:shadow-lg transition-shadow">
                        {/* Step number */}
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-4">
                          {index + 1}
                        </div>
                        
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        
                        {/* Content */}
                        <h4 className="text-lg font-semibold text-foreground mb-3">
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details */}
                        <ul className="text-sm text-muted-foreground text-left space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Company Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  For Companies
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive process to raise pre-IPO capital through our platform
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companySteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={index} className="bg-background rounded-xl p-6 border shadow-sm group hover:shadow-lg transition-shadow">
                      {/* Step number */}
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                        {index + 1}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* KYC Requirements */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  KYC Requirements
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Required documents for verification and compliance
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {kycRequirements.map((req, index) => (
                  <div key={index} className="bg-background border rounded-xl p-8 shadow-sm">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                      <FileCheck className="w-6 h-6 text-primary mr-3" />
                      {req.category}
                    </h3>
                    <ul className="space-y-3">
                      {req.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div className="text-left">
                      <h4 className="font-semibold text-blue-900 mb-2">Important Note</h4>
                      <p className="text-blue-800 text-sm">
                        All documents must be clear, legible, and valid. KYC verification typically 
                        takes 24-48 hours for review. You'll be notified via email once your 
                        verification is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Platform Benefits
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Why choose NepEx for your pre-IPO investment needs
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Direct Investment Platform
                  </h3>
                  <div className="prose max-w-none text-muted-foreground text-lg leading-relaxed">
                    <p className="mb-4">
                      NepEx provides a secure, regulated platform for direct pre-IPO investments 
                      in promising Nepali companies. Our platform connects investors directly 
                      with verified companies seeking growth capital.
                    </p>
                    <p className="mb-4">
                      We ensure full regulatory compliance with SEBON requirements and provide 
                      transparent investment processes with comprehensive due diligence for 
                      every listed opportunity.
                    </p>
                    <p>
                      Investors can make informed decisions with access to detailed company 
                      information, financial data, and professional analysis of each investment 
                      opportunity.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {platformBenefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <div key={index} className="bg-background rounded-xl p-6 border shadow-sm text-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <div className="flex items-start mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-red-900 mb-2">
                      Risk Disclosure
                    </h2>
                    <p className="text-red-800">
                      Pre-IPO investments carry significant risks. Please read carefully.
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start text-red-800">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    Important: Only invest amounts you can afford to lose. Past performance 
                    does not guarantee future results. Consult with financial advisors 
                    before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join our platform and start your pre-IPO investment journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                  <Link to="/auth/investor-register">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
                      Start as Investor
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <a href="mailto:companies@nepex.com">
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                      List Your Company
                      <Briefcase className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
                    NepEx
                  </Link>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Nepal's leading pre-IPO investment platform, connecting investors 
                    with promising companies for mutual growth.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📧 info@nepex.com</p>
                    <p>📞 +977-1-5555-555</p>
                    <p>📍 Kathmandu, Nepal</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                    <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                    <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</Link></li>
                    <li><a href="mailto:info@nepex.com" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Risk Disclosure</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Regulatory</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 NepEx. All rights reserved. | Regulated by SEBON</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default HowItWorks 