import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optional: Fetch student-specific status if your backend supports it, 
    // or display mock/authenticated user details.
    setLoading(false);
  }, [user]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  return (
    <div className="student-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Student Portal Dashboard</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Welcome back, <strong>{user?.email || 'Student'}</strong>!
      </p>

      {/* Status Card */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Registration Status</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Current Approval State:</span>
          <span className="badge" style={{ background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '4px', fontWeight: '600' }}>
            Pending Review
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>
          Your application is currently queued for review by the administrative office of your selected school (Injibara, Dangila, or Tilili).
        </p>
      </div>

      {/* Quick Info Card */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.75rem', color: '#1f2937' }}>Authorized Schools Notice</h3>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>
          This portal exclusively manages student admissions and guardian verifications for Injibara, Dangila, and Tilili regional institutions. For support inquiries, reach out to your respective school registrar.
        </p>
      </div>
    </div>
  );
};