import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Navigation from './components/layout/Navigation'

// Investor Pages
import InvestorDashboard from './pages/investor/Dashboard'
import InvestorOfferings from './pages/investor/Offerings'
import OfferingDetails from './pages/investor/OfferingDetails'
import InvestorPortfolio from './pages/investor/Portfolio'
import InvestorProfile from './pages/investor/Profile'

// Company Pages
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Investor Routes */}
          <Route path="/investor">
            <Route index element={<Navigate to="/investor/dashboard" replace />} />
            <Route path="dashboard" element={<InvestorDashboard />} />
            <Route path="offerings" element={<InvestorOfferings />} />
            <Route path="offerings/:id" element={<OfferingDetails />} />
            <Route path="portfolio" element={<InvestorPortfolio />} />
            <Route path="profile" element={<InvestorProfile />} />
          </Route>

          {/* Company Routes */}
          <Route path="/company">
            <Route index element={<Navigate to="/company/dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
          </Route>

          {/* Temporary redirect for /dashboard */}
          <Route path="/dashboard" element={<Navigate to="/investor/dashboard" replace />} />
          
          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 