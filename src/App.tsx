import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from './store/authContext'
import { AdminAuthProvider } from './store/adminAuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import Navigation from './components/layout/Navigation'
import AdminLayout from './components/admin/AdminLayout'

// Landing Pages
import LandingPage from './pages/LandingPage'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import InvestorRegister from './pages/auth/InvestorRegister'
import CompanyRegister from './pages/auth/CompanyRegister'

// Investor Pages
import InvestorDashboard from './pages/investor/Dashboard'
import Offerings from './pages/investor/Offerings'
import OfferingDetails from './pages/investor/OfferingDetails'
import Portfolio from './pages/investor/Portfolio'
import Profile from './pages/investor/Profile'

// Company Pages
import CompanyDashboard from './pages/company/Dashboard'
import CompanyProfile from './pages/company/Profile'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import CompanyManagement from './pages/admin/CompanyManagement'
import CreateCompany from './pages/admin/CreateCompany'

// Layout component for investor/company routes
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminAuthProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/investor-register" element={<InvestorRegister />} />
              
              {/* Company registration is now admin-only, but keep for existing companies */}
              <Route path="/auth/company-register" element={<CompanyRegister />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin/*"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route 
                  path="companies" 
                  element={
                    <AdminProtectedRoute requiredPermission="companies.view">
                      <CompanyManagement />
                    </AdminProtectedRoute>
                  } 
                />
                <Route 
                  path="companies/create" 
                  element={
                    <AdminProtectedRoute requiredPermission="companies.create">
                      <CreateCompany />
                    </AdminProtectedRoute>
                  } 
                />
              </Route>

              {/* Investor routes */}
              <Route
                path="/investor"
                element={
                  <ProtectedRoute requiredUserType="investor">
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<InvestorDashboard />} />
                <Route path="offerings" element={<Offerings />} />
                <Route path="offerings/:id" element={<OfferingDetails />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Company routes */}
              <Route
                path="/company"
                element={
                  <ProtectedRoute requiredUserType="company">
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<CompanyDashboard />} />
                <Route path="profile" element={<CompanyProfile />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AdminAuthProvider>
      </AuthProvider>
    </Router>
  )
}

export default App 