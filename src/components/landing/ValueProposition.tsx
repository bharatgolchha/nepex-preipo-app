import { Shield, Users, TrendingUp, Zap, Eye, HeadphonesIcon } from 'lucide-react'

/**
 * Value proposition section showcasing the key benefits of NepEx.
 * 
 * Highlights micro-investments, investment pooling, secure platform,
 * transparent processes, and expert support.
 */
function ValueProposition() {
  const features = [
    {
      icon: TrendingUp,
      title: "Micro-Investments",
      description: "Start investing with as little as NPR 10,000 in pre-IPO opportunities.",
    },
    {
      icon: Users,
      title: "Investment Pooling",
      description: "Pool your investments with other investors to access larger opportunities.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-grade security and transparent investment processes.",
    },
    {
      icon: Eye,
      title: "Transparent Process",
      description: "Clear documentation and real-time tracking of all investments.",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick verification and investment processing for faster market entry.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Dedicated support team to guide you through your investment journey.",
    },
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
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-background rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon with gradient background */}
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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
              <div className="text-muted-foreground">Secure Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition 