import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react'
import { Button } from '../ui/button'

/**
 * Hero section component for the NepEx landing page.
 * 
 * Features the main value proposition, call-to-action buttons,
 * and trust indicators to convert visitors.
 */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-10" />
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 nepal-flag-gradient rounded-full opacity-20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-15 animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500 rounded-full opacity-20 animate-bounce" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <Shield className="w-4 h-4" />
              SEBON Compliant
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <Users className="w-4 h-4" />
              500+ Investors
            </div>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Democratizing{' '}
            <span className="text-transparent bg-clip-text nepal-flag-gradient">
              Pre-IPO Investments
            </span>{' '}
            in Nepal
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Start investing from{' '}
            <span className="font-semibold text-primary">NPR 10,000</span>{' '}
            through secure SPV pooling. Access exclusive pre-IPO opportunities
            before they go public.
          </p>
          
          {/* Key benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Micro-investments from NPR 10K
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              SEBON regulated & secure
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              SPV pooling mechanism
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Start Investing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              Join as Company
            </Button>
          </div>
          
          {/* Social proof */}
          <p className="text-sm text-muted-foreground mt-8">
            Trusted by investors • Backed by leading companies • SEBON compliant platform
          </p>
        </div>
      </div>
      
      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-background">
          <path d="M0,120 C150,60 350,60 600,120 C850,180 1050,60 1200,120 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection 