import { Shield, Lock, FileCheck, Users, Award, CheckCircle } from 'lucide-react'

/**
 * Trust and Security section highlighting compliance and safety features.
 * 
 * Emphasizes SEBON compliance, security measures, and regulatory
 * adherence to build trust with potential investors.
 */
function TrustSection() {
  const trustFeatures = [
    {
      icon: Shield,
      title: "SEBON Regulated",
      description: "Fully compliant with Securities Board of Nepal regulations and guidelines.",
      highlight: "100% Compliant"
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "Advanced encryption and security measures to protect your investments and data.",
      highlight: "256-bit Encryption"
    },
    {
      icon: FileCheck,
      title: "Due Diligence",
      description: "Thorough verification of all companies and offerings before listing.",
      highlight: "Verified Companies"
    },
    {
      icon: Users,
      title: "Transparent Process",
      description: "Clear documentation and transparent investment process with regular updates.",
      highlight: "Full Transparency"
    }
  ]

  const complianceFeatures = [
    "SEBON Registration & Compliance",
    "3-Year Lock-in Period Enforcement",
    "KYC Verification for All Users",
    "Regular Regulatory Reporting",
    "Audited Financial Statements",
    "Legal Documentation Review"
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-primary" />
              <span className="text-primary font-semibold">Trusted & Regulated</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Your Security is Our Priority
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We maintain the highest standards of security and regulatory compliance 
              to protect your investments and ensure a trustworthy platform.
            </p>
          </div>

          {/* Trust features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {trustFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
                    {feature.highlight}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Compliance grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Compliance checklist */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Regulatory Compliance
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We adhere to all Securities Board of Nepal (SEBON) requirements and maintain 
                strict compliance standards to ensure investor protection and platform integrity.
              </p>
              
              <div className="space-y-4">
                {complianceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security highlights */}
            <div className="bg-muted/30 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Security Measures
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Data Protection</h4>
                    <p className="text-muted-foreground text-sm">
                      End-to-end encryption for all sensitive data and transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Document Verification</h4>
                    <p className="text-muted-foreground text-sm">
                      Secure document storage and verification for KYC compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Fraud Prevention</h4>
                    <p className="text-muted-foreground text-sm">
                      Advanced monitoring and fraud detection systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Trusted by Investors Across Nepal
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-muted-foreground text-sm">Verified Investors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">NPR 10M+</div>
                  <div className="text-muted-foreground text-sm">Investments Facilitated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">15+</div>
                  <div className="text-muted-foreground text-sm">Listed Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-muted-foreground text-sm">Platform Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection 