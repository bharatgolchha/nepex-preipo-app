import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Star,
  Clock,
  Target,
  Globe,
  Briefcase,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

/**
 * Public Opportunities page for NepEx Pre-IPO Investment Platform.
 * 
 * Showcases available investment opportunities to potential investors
 * and encourages them to sign up to access detailed information.
 */
function Opportunities() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Sample opportunities data for showcase
  const featuredOpportunities = [
    {
      id: 1,
      companyName: "TechCo Nepal Pvt. Ltd.",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=entropy&auto=format&q=60",
      sector: "Technology",
      description: "Leading software development company specializing in fintech solutions for the Nepalese market.",
      targetRaise: 50000000,
      raisedAmount: 35000000,
      minInvestment: 10000,
      investors: 156,
      daysLeft: 45,
      highlights: ["20% YoY growth", "Market leader", "Profitable since 2022"],
      badge: "Hot Deal"
    },
    {
      id: 2,
      companyName: "Green Energy Solutions",
      logo: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=80&h=80&fit=crop&crop=entropy&auto=format&q=60",
      sector: "Renewable Energy",
      description: "Pioneer in solar energy solutions with projects across Nepal, focusing on rural electrification.",
      targetRaise: 100000000,
      raisedAmount: 45000000,
      minInvestment: 25000,
      investors: 89,
      daysLeft: 62,
      highlights: ["Government contracts", "15MW capacity", "International partnerships"],
      badge: "Featured"
    },
    {
      id: 3,
      companyName: "NepalMart E-commerce",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=entropy&auto=format&q=60",
      sector: "E-commerce",
      description: "Nepal's fastest-growing e-commerce platform connecting rural producers with urban consumers.",
      targetRaise: 75000000,
      raisedAmount: 28000000,
      minInvestment: 15000,
      investors: 203,
      daysLeft: 28,
      highlights: ["1M+ users", "500+ merchants", "250% growth"],
      badge: "Closing Soon"
    }
  ]

  const sectorStats = [
    {
      sector: "Technology",
      count: 12,
      totalRaised: "NPR 250 Cr",
      avgReturn: "18%",
      icon: Building2,
      color: "bg-blue-500"
    },
    {
      sector: "Renewable Energy",
      count: 8,
      totalRaised: "NPR 180 Cr",
      avgReturn: "22%",
      icon: Globe,
      color: "bg-green-500"
    },
    {
      sector: "Healthcare",
      count: 6,
      totalRaised: "NPR 120 Cr",
      avgReturn: "15%",
      icon: Shield,
      color: "bg-purple-500"
    },
    {
      sector: "Manufacturing",
      count: 10,
      totalRaised: "NPR 200 Cr",
      avgReturn: "20%",
      icon: Briefcase,
      color: "bg-orange-500"
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "High Growth Potential",
      description: "Access to high-growth companies before they go public"
    },
    {
      icon: Shield,
      title: "Verified Companies",
      description: "All companies undergo rigorous due diligence and verification"
    },
    {
      icon: DollarSign,
      title: "Low Minimum Investment",
      description: "Start investing from as low as NPR 10,000"
    },
    {
      icon: Users,
      title: "Community of Investors",
      description: "Join a growing community of smart investors"
    }
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

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How it Works
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/opportunities" className="text-blue-600 font-medium">
                Opportunities
              </Link>
            </div>

            {/* Auth Buttons - Desktop */}
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
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
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
                  className="block px-3 py-2 text-blue-600 font-medium"
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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-500/20 rounded-full animate-bounce" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Investment <span className="text-blue-600">Opportunities</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover exclusive pre-IPO investment opportunities from Nepal's most promising companies. 
                Start your journey to financial growth today.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">36+ Companies</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">NPR 750 Cr+ Raised</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">1,500+ Investors</span>
                </div>
              </div>

              <Link to="/auth/investor-register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Opportunities */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Investment Opportunities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Handpicked opportunities from verified companies with strong growth potential and solid fundamentals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={opportunity.logo}
                          alt={`${opportunity.companyName} logo`}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {opportunity.companyName}
                          </h3>
                          <p className="text-sm text-gray-600">{opportunity.sector}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        opportunity.badge === 'Hot Deal' ? 'bg-red-100 text-red-800' :
                        opportunity.badge === 'Featured' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {opportunity.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opportunity.highlights.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Raised</span>
                        <span className="font-medium">
                          {((opportunity.raisedAmount / opportunity.targetRaise) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(opportunity.raisedAmount / opportunity.targetRaise) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Min. Investment</span>
                        <p className="font-semibold">NPR {opportunity.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Investors</span>
                        <p className="font-semibold">{opportunity.investors}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {opportunity.daysLeft} days left
                      </span>
                      <Link to="/auth/investor-register">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/auth/investor-register">
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sector Overview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Investment by Sector
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Diversify your portfolio across Nepal's fastest-growing sectors and industries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {sectorStats.map((sector, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${sector.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <sector.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{sector.sector}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">{sector.count}</span> Companies</p>
                    <p><span className="font-medium">{sector.totalRaised}</span> Raised</p>
                    <p><span className="font-medium">{sector.avgReturn}</span> Avg. Return</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Invest Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Invest with NepEx?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of smart investors who trust NepEx for their pre-IPO investment needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join NepEx today and get access to exclusive pre-IPO investment opportunities. 
                Start building your portfolio with as little as NPR 10,000.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/investor-register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Investing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                    Learn How it Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Opportunities 