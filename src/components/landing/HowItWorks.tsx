import { UserCheck, Search, DollarSign, PieChart, ArrowRight } from 'lucide-react'

/**
 * How It Works section explaining the investment process.
 * 
 * Shows step-by-step flow for both investors and companies
 * with clear visual indicators and descriptions.
 */
function HowItWorks() {
  const investorSteps = [
    {
      icon: UserCheck,
      title: "Register & Complete KYC",
      description: "Sign up and complete your Know Your Customer verification as per SEBON requirements.",
      detail: "Quick 24-hour verification process"
    },
    {
      icon: Search,
      title: "Browse Opportunities",
      description: "Explore curated pre-IPO investment opportunities from verified companies.",
      detail: "Detailed company profiles & financials"
    },
    {
      icon: DollarSign,
      title: "Invest Through SPV",
      description: "Invest from NPR 10,000 onwards through our Special Purpose Vehicle pooling mechanism.",
      detail: "Secure payment & instant confirmation"
    },
    {
      icon: PieChart,
      title: "Track Your Portfolio",
      description: "Monitor your investments and SPV units through your personalized dashboard.",
      detail: "Real-time updates & reporting"
    }
  ]

  const companySteps = [
    {
      title: "Submit Application",
      description: "Apply to list your pre-IPO offering with required documentation."
    },
    {
      title: "Due Diligence",
      description: "Our team conducts thorough verification and compliance checks."
    },
    {
      title: "Get Listed",
      description: "Your offering goes live to our network of investors."
    },
    {
      title: "Raise Capital",
      description: "Receive funding from multiple investors through SPV pooling."
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, transparent, and secure process for both investors and companies
              seeking pre-IPO funding in Nepal.
            </p>
          </div>

          {/* Investor Flow */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
              For Investors
            </h3>
            
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
                    
                    <div className="text-center">
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
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="text-sm text-primary font-medium">
                        {step.detail}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Company Flow */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
              For Companies
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companySteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < companySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full">
                      <div className="h-0.5 bg-primary/20 w-full"></div>
                    </div>
                  )}
                  
                  <div className="bg-background rounded-xl p-6 text-center border">
                    {/* Step number */}
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to start your investment journey?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Get Started as Investor
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                List Your Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 