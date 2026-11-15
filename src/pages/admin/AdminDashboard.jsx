import { useState, useEffect } from 'react';
import API from '../../api/axios';
import './AdminDashboard.css';

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
  if (loading) return <div className="dashboard-status-msg">Loading statistics...</div>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard - School Overview</h2>

      <div className="schools-grid">
        {schools.map((schoolName) => {
          const schoolStudents = registrations.filter((r) => r.school === schoolName);

          return (
            <div key={schoolName} className="school-card">
              <div className="school-card-header">
                <h3 className="school-name">{schoolName}</h3>
                <p className="school-total">
                  Total Registered: {schoolStudents.length}
                </p>
              </div>

              <div>
                <h4 className="student-list-heading">Student List:</h4>
                {schoolStudents.length > 0 ? (
                  <ul className="student-list">
                    {schoolStudents.map((student) => (
                      <li key={student.id} className="student-list-item">
                        {student.full_name || student.guardian_name || `Student #${student.id}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-students">No students registered yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};