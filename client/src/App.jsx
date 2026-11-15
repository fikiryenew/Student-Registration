import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminApprovals } from './pages/admin/AdminApprovals';
import { StudentDashboard } from './pages/student/StudentDashboard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="text-center" style={{ padding: '4rem 0' }}>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to SRMS</h1>
                  <p style={{ color: '#6b7280' }}>Centralized Registration Portal for Injibara, Dangila, and Tilili Schools</p>
                </div>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Protected Routes */}
              <Route element={<ProtectedRoute allowedRole="student" />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRole="admin" />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/approvals" element={<AdminApprovals />} />
              </Route>

              {/* Fallback & Unauthorized */}
              <Route path="/access-denied" element={<div className="text-center" style={{ color: '#dc2626', fontWeight: 'bold', padding: '2rem' }}>403 - Access Denied</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;