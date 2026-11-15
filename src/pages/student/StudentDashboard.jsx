import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

  return (
    <div className="student-container">
      <h2 className="student-title">Student Portal Dashboard</h2>
      <p className="student-subtitle">
        Welcome back, <strong>{user?.email || 'Student'}</strong>!
      </p>

      {/* Status Card */}
      <div className="student-card">
        <h3 className="student-card-title">Registration Status</h3>
        <div className="status-row">
          <span className="status-label">Current Approval State:</span>
          <span className="status-badge">
            Pending Review
          </span>
        </div>
        <p className="status-description">
          Your application is currently queued for review by the administrative office of your selected school (Injibara, Dangila, or Tilili).
        </p>
      </div>

      {/* Quick Info Card */}
      <div className="student-card" style={{ marginBottom: 0 }}>
        <h3 className="notice-title">Authorized Schools Notice</h3>
        <p className="notice-text">
          This portal exclusively manages student admissions and guardian verifications for Injibara, Dangila, and Tilili regional institutions. For support inquiries, reach out to your respective school registrar.
        </p>
      </div>
    </div>
  );
};