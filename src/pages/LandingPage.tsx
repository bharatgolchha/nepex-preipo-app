import HeroSection from '../components/landing/HeroSection'
import ValueProposition from '../components/landing/ValueProposition'
import HowItWorks from '../components/landing/HowItWorks'
import OpportunityPreview from '../components/landing/OpportunityPreview'
import TrustSection from '../components/landing/TrustSection'
import EducationHub from '../components/landing/EducationHub'
import DualCTA from '../components/landing/DualCTA'
import Footer from '../components/landing/Footer'

/**
 * Main landing page component for NepEx Pre-IPO Investment Platform.
 * 
 * This page serves as the primary entry point for visitors, showcasing
 * the platform's value proposition and guiding users to sign up.
 */
function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <OpportunityPreview />
      <TrustSection />
      <EducationHub />
      <DualCTA />
      <Footer />
    </main>
  )
}

export default LandingPage 