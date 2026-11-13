import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { ALLOWED_SCHOOLS } from '../../utils/constants';

export const AdminApprovals = () => {
  const [registrations, setRegistrations] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState('');
  const [error, setError] = useState('');

  const fetchRegistrations = async () => {
    try {
      const url = schoolFilter ? `/api/admin/registrations?school=${schoolFilter}` : '/api/admin/registrations';
      const { data } = await API.get(url);
      setRegistrations(data.registrations || []);
    } catch (err) {
      setError('Failed to fetch registrations');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [schoolFilter]);

  const handleAction = async (id, action) => {
    const remark = prompt(`Enter a remark for this ${action}:`);
    if (remark === null) return; // Cancelled

    try {
      await API.patch(`/api/admin/registrations/${id}/${action}`, { remark });
      fetchRegistrations(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="admin-container">
      <h2 style={{ marginBottom: '1rem' }}>Approval Management</h2>
      {error && <div className="alert-error">{error}</div>}

      {/* Filter Bar */}
      <div className="filter-bar">
        <select 
          className="form-control" 
          style={{ width: '200px' }}
          value={schoolFilter}
          onChange={(e) => setSchoolFilter(e.target.value)}
        >
          <option value="">All Schools</option>
          {ALLOWED_SCHOOLS.map((sch) => (
            <option key={sch} value={sch}>{sch}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>School</th>
              <th>Grade Level</th>
              <th>Guardian Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No registrations found.</td></tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.id}</td>
                  <td>{reg.school}</td>
                  <td>{reg.grade_level || 'N/A'}</td>
                  <td>{reg.guardian_name || 'N/A'}</td>
                  <td>
                    <span className={`badge badge-${reg.status.toLowerCase()}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    {reg.status === 'Pending' && (
                      <>
                        <button className="btn-action btn-approve" onClick={() => handleAction(reg.id, 'approve')}>Approve</button>
                        <button className="btn-action btn-reject" onClick={() => handleAction(reg.id, 'reject')}>Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};