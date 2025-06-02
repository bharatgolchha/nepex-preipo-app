import { DollarSign, Shield, Users, TrendingUp } from 'lucide-react'

/**
 * Value proposition section showcasing the key benefits of NepEx.
 * 
 * Highlights micro-investments, SPV pooling, SEBON compliance,
 * and exclusive access to pre-IPO opportunities.
 */
function ValueProposition() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Micro-Investments",
      description: "Start investing with as little as NPR 10,000. No need for large capital requirements.",
      highlight: "From NPR 10K"
    },
    {
      icon: Users,
      title: "SPV-Based Pooling",
      description: "Pool your investments with other micro-investors through Special Purpose Vehicles.",
      highlight: "Pool & Invest"
    },
    {
      icon: Shield,
      title: "SEBON Compliant",
      description: "Fully regulated and compliant with Securities Board of Nepal requirements.",
      highlight: "100% Secure"
    },
    {
      icon: TrendingUp,
      title: "Exclusive Access",
      description: "Get early access to high-growth companies before they go public on the stock market.",
      highlight: "Pre-IPO Only"
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose NepEx?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're democratizing access to pre-IPO investments in Nepal, making it possible 
              for everyone to participate in the growth of promising companies.
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="group bg-background rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon with gradient background */}
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {benefit.highlight}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Stats section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">NPR 10K</div>
              <div className="text-muted-foreground">Minimum Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Listed Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">SEBON Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition 