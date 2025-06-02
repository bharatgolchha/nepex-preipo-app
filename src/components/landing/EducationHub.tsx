import { BookOpen, PlayCircle, FileText, Users, ArrowRight, Clock } from 'lucide-react'
import { Button } from '../ui/button'

/**
 * Education Hub section showcasing learning resources.
 * 
 * Highlights educational content about pre-IPO investing,
 * SPV model, and investment strategies for Nepal market.
 */
function EducationHub() {
  const educationResources = [
    {
      type: "Guide",
      icon: BookOpen,
      title: "Pre-IPO Investment Basics",
      description: "Comprehensive guide to understanding pre-IPO investments, risks, and opportunities in Nepal.",
      readTime: "8 min read",
      category: "Beginner"
    },
    {
      type: "Video",
      icon: PlayCircle,
      title: "How SPV Pooling Works",
      description: "Visual explanation of Special Purpose Vehicle pooling mechanism and micro-investments.",
      readTime: "5 min watch",
      category: "Intermediate"
    },
    {
      type: "Article",
      icon: FileText,
      title: "SEBON Compliance Guide",
      description: "Understanding regulatory requirements and compliance for pre-IPO investments in Nepal.",
      readTime: "6 min read",
      category: "Advanced"
    }
  ]

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "You can start investing with as little as NPR 10,000 through our SPV pooling mechanism."
    },
    {
      question: "How does the 3-year lock-in period work?",
      answer: "As per SEBON regulations, pre-IPO investments have a mandatory 3-year lock-in period before you can exit."
    },
    {
      question: "What is SPV pooling?",
      answer: "SPV (Special Purpose Vehicle) pooling allows multiple small investors to combine their investments to participate in larger pre-IPO opportunities."
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-primary font-semibold">Learn & Grow</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Education Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master pre-IPO investing with our comprehensive educational resources. 
              Learn about SPV pooling, regulatory compliance, and investment strategies.
            </p>
          </div>

          {/* Educational resources */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {educationResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {resource.type}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {resource.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      {resource.readTime}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-background rounded-xl p-6 border">
                    <h4 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="outline">
                  View All FAQs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Learning path */}
            <div className="bg-background rounded-3xl p-8 border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Learning Path for New Investors
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Understanding Pre-IPO Basics
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Learn fundamentals of pre-IPO investing and market dynamics
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      SPV Pooling Mechanism
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Understand how micro-investments work through SPV pooling
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Risk Assessment
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Learn to evaluate risks and make informed investment decisions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Portfolio Management
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Track and manage your pre-IPO investment portfolio
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full">
                  Start Learning Journey
                  <Users className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationHub 