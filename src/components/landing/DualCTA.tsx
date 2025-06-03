import { ArrowRight, TrendingUp, Building2 } from 'lucide-react'
import { Button } from '../ui/button'

/**
 * Dual Call-to-Action section for converting visitors.
 * 
 * Provides clear paths for both investors and companies
 * with compelling reasons to join the platform.
 */
function DualCTA() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="absolute top-10 right-10 w-32 h-32 nepal-flag-gradient rounded-full opacity-10 animate-float" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/20 rounded-full animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of investors and companies who are already part of 
              Nepal's leading pre-IPO investment platform.
            </p>
          </div>

          {/* Dual CTA cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Investor CTA */}
            <div className="bg-muted/30 rounded-3xl p-8 md:p-10 text-center group hover:bg-muted/40 transition-colors duration-300">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Investors
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8">
                Access exclusive opportunities and grow your wealth through our secure investment platform.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Minimum investment: NPR 10,000</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Secure & regulated platform</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Expert-curated opportunities</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">24/7 portfolio tracking</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full text-lg py-6 h-auto">
                Start Investing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Join 500+ verified investors • Free account setup
              </p>
            </div>

            {/* Company CTA */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-8 md:p-10 text-center group hover:border-primary/30 transition-colors duration-300">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Companies
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Raise capital efficiently from a network of verified investors. 
                Access funding for growth while preparing for your eventual IPO.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Access to 500+ investors</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Streamlined compliance process</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Professional due diligence</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-foreground">Marketing & visibility boost</span>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="w-full text-lg py-6 h-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                List Your Company
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Join 15+ listed companies • Expert guidance included
              </p>
            </div>
          </div>

          {/* Additional info */}
          <div className="text-center mt-16">
            <div className="bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Why Choose NepEx?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Secure</div>
                  <div className="text-muted-foreground">Fully Regulated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">NPR 10M+</div>
                  <div className="text-muted-foreground">Investments Facilitated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Platform Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DualCTA 