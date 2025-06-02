import { Mail, Phone, MapPin, Shield, FileText, Users } from 'lucide-react'

/**
 * Footer component for the NepEx landing page.
 * 
 * Contains contact information, legal links, company info,
 * and Nepal-specific elements for localization.
 */
function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" }
    ],
    investors: [
      { name: "Investment Opportunities", href: "#" },
      { name: "Portfolio Tracking", href: "#" },
      { name: "Education Hub", href: "#" },
      { name: "Risk Disclosure", href: "#" }
    ],
    companies: [
      { name: "List Your Company", href: "#" },
      { name: "Due Diligence Process", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Success Stories", href: "#" }
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "SEBON Compliance", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ]
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-2xl font-bold text-foreground">NepEx</span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Democratizing access to pre-IPO investment opportunities in Nepal. 
                Start investing from NPR 10,000 through our secure SPV pooling mechanism.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Putalisadak, Kathmandu, Nepal
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    +977-1-4NEPEX (463739)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    info@nepex.com
                  </span>
                </div>
              </div>
            </div>

            {/* Links sections */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">For Investors</h3>
              <ul className="space-y-2">
                {footerLinks.investors.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">For Companies</h3>
              <ul className="space-y-2">
                {footerLinks.companies.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-muted-foreground text-sm">
                © 2024 NepEx Private Limited. All rights reserved.
              </div>
              
              {/* Legal links */}
              <div className="flex flex-wrap gap-6">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Investment Disclaimer:</strong> All investments are subject to market risks. 
                Pre-IPO investments have a mandatory 3-year lock-in period as per SEBON regulations. 
                Past performance does not guarantee future returns. Please read all investment 
                documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 