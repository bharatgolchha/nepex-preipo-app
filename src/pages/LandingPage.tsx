import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import HeroSection from '../components/landing/HeroSection'
import ValueProposition from '../components/landing/ValueProposition'
import HowItWorks from '../components/landing/HowItWorks'
import OpportunityPreview from '../components/landing/OpportunityPreview'
import TrustSection from '../components/landing/TrustSection'
import EducationHub from '../components/landing/EducationHub'
import DualCTA from '../components/landing/DualCTA'
import Footer from '../components/landing/Footer'

/**
 * Main landing page component for NepEx Pre-IPO Investment Platform.
 * 
 * This page serves as the primary entry point for visitors, showcasing
 * the platform's value proposition and guiding users to sign up.
 */
function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How it Works
              </a>
              <a href="#opportunities" className="text-gray-700 hover:text-blue-600 transition-colors">
                Opportunities
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
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
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </a>
                <a
                  href="#opportunities"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Opportunities
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
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
                    to="/auth/register"
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

      {/* Add padding to account for fixed navigation */}
      <div className="pt-16">
        <HeroSection />
        <ValueProposition />
        <HowItWorks />
        <OpportunityPreview />
        <TrustSection />
        <EducationHub />
        <DualCTA />
        <Footer />
      </div>
    </main>
  )
}

export default LandingPage 