import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Shield, Target, Users, Globe, Award, Heart, ArrowRight, Building2, TrendingUp, Lightbulb, Menu, X } from 'lucide-react'
import { useState } from 'react'

/**
 * About Us page for NepEx Pre-IPO Investment Platform.
 * 
 * Showcases company mission, vision, values, and team information
 * to build trust and credibility with potential users.
 */
function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the security of investments and maintain the highest standards of regulatory compliance."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making pre-IPO investments accessible to all Nepali investors, regardless of their investment size."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a strong community of investors and companies to foster Nepal's economic growth."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional service and maintaining the highest quality standards."
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Providing clear, honest information about investments, risks, and platform operations."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging technology to simplify investment processes and create better user experiences."
    }
  ]

  const stats = [
    { number: "500+", label: "Registered Investors" },
    { number: "50+", label: "Listed Companies" },
    { number: "NPR 100M+", label: "Total Investments" },
    { number: "99%", label: "Platform Uptime" }
  ]

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Chief Executive Officer",
      description: "15+ years in financial services and investment banking in Nepal.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Priya Thapa",
      role: "Chief Technology Officer",
      description: "Former tech lead at major fintech companies with expertise in secure platforms.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Arjun Bhattarai",
      role: "Head of Compliance",
      description: "Former SEBON official with deep knowledge of Nepal's regulatory landscape.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sunita Gurung",
      role: "Head of Operations",
      description: "Operations expert with experience in scaling financial platforms.",
      image: "/api/placeholder/150/150"
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

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How it Works
              </Link>
              <Link to="/about" className="text-blue-600 font-medium">
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
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-blue-600 font-medium"
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
                About <span className="text-primary">NepEx</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                We're democratizing pre-IPO investments in Nepal, making exclusive opportunities 
                accessible to every investor while supporting the growth of promising companies.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-foreground">SEBON Regulated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-foreground">Secure Platform</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-foreground">Proven Track Record</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-12">
                    <div className="flex items-center mb-4">
                      <Target className="w-8 h-8 text-primary mr-3" />
                      <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To democratize access to pre-IPO investment opportunities in Nepal, 
                      enabling every investor to participate in the growth of promising companies 
                      while providing businesses with the capital they need to scale and succeed.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Globe className="w-8 h-8 text-primary mr-3" />
                      <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To become Nepal's leading pre-IPO investment platform, fostering economic 
                      growth by connecting capital with innovation, and building a thriving 
                      ecosystem where investors and companies prosper together.
                    </p>
                  </div>
                </div>
                
                <div className="bg-background rounded-2xl p-8 border shadow-sm">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <p className="text-xl text-muted-foreground">
                  How we started and where we're heading
                </p>
              </div>
              
              <div className="prose max-w-none text-muted-foreground text-lg leading-relaxed">
                <p className="mb-6">
                  NepEx was founded in 2023 with a simple yet powerful vision: to bridge the gap 
                  between promising Nepali companies seeking growth capital and everyday investors 
                  looking for exclusive investment opportunities.
                </p>
                
                <p className="mb-6">
                  Our founders, having witnessed the challenges faced by both retail investors 
                  and growing companies in Nepal, recognized the need for a transparent, accessible, 
                  and secure platform that could serve both communities effectively.
                </p>
                
                <p className="mb-6">
                  Today, we're proud to be at the forefront of Nepal's investment revolution, 
                  leveraging cutting-edge technology and regulatory compliance to create opportunities 
                  that were previously available only to institutional investors.
                </p>
                
                <p>
                  As we continue to grow, our commitment remains unchanged: to democratize 
                  investment opportunities and contribute to Nepal's economic development by 
                  connecting capital with innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Values
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  The principles that guide everything we do at NepEx
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <div key={index} className="bg-background rounded-xl p-6 border shadow-sm group hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Meet Our Team
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  The experts behind NepEx's success, bringing decades of combined experience 
                  in finance, technology, and regulatory compliance.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <Users className="w-12 h-12 text-primary/60" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                ))}
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
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of investors who trust NepEx for their pre-IPO investments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/investor-register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto">
                    Start Investing
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="mailto:companies@nepex.com">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white hover:text-primary">
                    Partner With Us
                  </Button>
                </a>
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

export default About
