import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Navigation from './components/layout/Navigation'
import { AuthProvider } from './store/authContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Investor Pages
import InvestorDashboard from './pages/investor/Dashboard'
import InvestorOfferings from './pages/investor/Offerings'
import OfferingDetails from './pages/investor/OfferingDetails'
import InvestorPortfolio from './pages/investor/Portfolio'
import InvestorProfile from './pages/investor/Profile'

// Company Pages
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CompanyRegister from './pages/auth/CompanyRegister'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="company-register" element={<CompanyRegister />} />
            </Route>
            
            {/* Investor Routes */}
            <Route path="/investor">
              <Route index element={<Navigate to="/investor/dashboard" replace />} />
              <Route path="dashboard" element={
                <ProtectedRoute requiredUserType="investor">
                  <InvestorDashboard />
                </ProtectedRoute>
              } />
              <Route path="offerings" element={
                <ProtectedRoute requiredUserType="investor">
                  <InvestorOfferings />
                </ProtectedRoute>
              } />
              <Route path="offerings/:id" element={
                <ProtectedRoute requiredUserType="investor">
                  <OfferingDetails />
                </ProtectedRoute>
              } />
              <Route path="portfolio" element={
                <ProtectedRoute requiredUserType="investor">
                  <InvestorPortfolio />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute requiredUserType="investor">
                  <InvestorProfile />
                </ProtectedRoute>
              } />
            </Route>

            {/* Company Routes */}
            <Route path="/company">
              <Route index element={<Navigate to="/company/dashboard" replace />} />
              <Route path="dashboard" element={
                <ProtectedRoute requiredUserType="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="profile" element={
                <ProtectedRoute requiredUserType="company">
                  <CompanyProfile />
                </ProtectedRoute>
              } />
            </Route>

            {/* Temporary redirect for /dashboard */}
            <Route path="/dashboard" element={<Navigate to="/investor/dashboard" replace />} />
            
            {/* Catch all - 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App 