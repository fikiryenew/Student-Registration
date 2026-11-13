import { useState, useEffect } from 'react';
import API from '../../api/axios';

export const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const schools = ['Injibara', 'Dangila', 'Tilili'];

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await API.get('/admin/registrations');
        setRegistrations(data.registrations || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (error) return <div className="alert-error">{error}</div>;
  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="admin-container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Admin Dashboard - School Overview</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {schools.map((schoolName) => {
          const schoolStudents = registrations.filter(r => r.school === schoolName);

          return (
            <div 
              key={schoolName}
              className="stat-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textAlign: 'left'
              }}
            >
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#2563eb', fontSize: '1.25rem' }}>{schoolName}</h3>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>
                  Total Registered: {schoolStudents.length}
                </p>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>
                  Student List:
                </h4>
                {schoolStudents.length > 0 ? (
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', margin: 0 }}>
                    {schoolStudents.map((student) => (
                      <li key={student.id} style={{ margin: '0.3rem 0', color: '#374151', fontSize: '0.95rem' }}>
                        {student.full_name || student.guardian_name || `Student #${student.id}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                    No students registered yet.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};