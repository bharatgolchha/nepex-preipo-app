import { Building2, Users, Target, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

/**
 * Opportunity Preview section showcasing sample investment opportunities.
 * 
 * Displays mock company listings to give visitors an idea of the types
 * of pre-IPO opportunities available on the platform.
 */
function OpportunityPreview() {
  const opportunities = [
    {
      company: "TechStart Nepal",
      sector: "Technology",
      description: "AI-powered fintech solutions for small businesses in Nepal",
      target: "NPR 50,00,000",
      raised: "NPR 35,00,000",
      progress: 70,
      minInvestment: "NPR 10,000",
      investors: 156,
      deadline: "15 days left",
      tags: ["Fintech", "AI", "Growth Stage"]
    },
    {
      company: "GreenEnergy Pvt Ltd",
      sector: "Renewable Energy",
      description: "Solar power solutions for rural communities across Nepal",
      target: "NPR 1,20,00,000",
      raised: "NPR 84,00,000",
      progress: 70,
      minInvestment: "NPR 25,000",
      investors: 203,
      deadline: "22 days left",
      tags: ["Green Energy", "Social Impact", "Scaling"]
    },
    {
      company: "NepalFood Co",
      sector: "Food & Agriculture",
      description: "Organic food processing and export business",
      target: "NPR 75,00,000",
      raised: "NPR 45,00,000",
      progress: 60,
      minInvestment: "NPR 15,000",
      investors: 124,
      deadline: "8 days left",
      tags: ["Agriculture", "Export", "Organic"]
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Current Investment Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore curated pre-IPO opportunities from verified companies across different sectors.
              Start investing from NPR 10,000 through our SPV pooling mechanism.
            </p>
          </div>

          {/* Opportunities grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{opportunity.company}</h3>
                      <p className="text-sm text-muted-foreground">{opportunity.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Target</div>
                    <div className="text-sm font-medium text-foreground">{opportunity.target}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {opportunity.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Raised: {opportunity.raised}</span>
                    <span className="text-primary font-medium">{opportunity.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${opportunity.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                      <Target className="w-3 h-3" />
                      Min. Investment
                    </div>
                    <div className="text-sm font-medium">{opportunity.minInvestment}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                      <Users className="w-3 h-3" />
                      Investors
                    </div>
                    <div className="text-sm font-medium">{opportunity.investors}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      Deadline
                    </div>
                    <div className="text-sm font-medium">{opportunity.deadline}</div>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full" size="sm">
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* View all CTA */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              New opportunities are added regularly. Join now to get early access.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpportunityPreview 