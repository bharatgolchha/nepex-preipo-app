import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

/**
 * Hero section component for the NepEx landing page.
 * 
 * Features the main value proposition, call-to-action buttons,
 * and trust indicators to convert visitors.
 */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient - reduced opacity for better text contrast */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      
      {/* Floating elements for visual interest - moved further and reduced opacity */}
      <div className="absolute top-32 left-16 w-20 h-20 nepal-flag-gradient rounded-full opacity-10 animate-float" />
      <div className="absolute top-20 right-32 w-16 h-16 bg-blue-500 rounded-full opacity-8 animate-pulse" />
      <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-green-500 rounded-full opacity-10 animate-bounce" />
      
      {/* Main content with improved z-index and background */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicators with better contrast */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-foreground">Secure & regulated platform</span>
            </div>
          </div>
          
          {/* Main headline - simplified for troubleshooting */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Invest in Nepal's 
            <span className="text-primary"> Pre-IPO</span> Future
          </h1>
          
          {/* Subheadline with better contrast */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Access exclusive pre-IPO investment opportunities from Nepal's promising companies
            through secure investment platform. Access exclusive pre-IPO opportunities
            from NPR 10,000 onwards.
          </p>
          
          {/* Key benefits with improved visibility */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-foreground">Micro-investments from NPR 10K</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-foreground">Secure & regulated platform</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-foreground">Direct investment platform</span>
            </div>
          </div>
          
          {/* Call-to-action buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/auth/register">
              <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Investing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="mailto:companies@nepex.com">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/90 backdrop-blur-sm">
                Join as Company
              </Button>
            </a>
          </div>
          
          {/* Social proof with better visibility */}
          <div className="text-center text-sm text-muted-foreground space-x-1">
            <span>Trusted by investors</span>
            <span>•</span>
            <span>Backed by leading companies</span>
            <span>•</span>
            <span>Secure investment platform</span>
          </div>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <path d="M0,120 C150,60 350,60 600,120 C850,180 1050,60 1200,120 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection 