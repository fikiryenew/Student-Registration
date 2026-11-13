import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', credentials);
      login(data.user, data.token);
      navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login to SRMS</h2>
      
      {location.state?.message && <div className="alert-success" style={{ marginBottom: '1rem' }}>{location.state.message}</div>}
      {error && <div className="alert-error" style={{ marginBottom: '1rem', color: '#dc2626' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            required
            className="form-control"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            required
            className="form-control"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        
        {/* Updated Button Styling: Solid blue background with white text */}
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#2563eb', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: '600', 
            fontSize: '1rem',
            cursor: 'pointer' 
          }}
        >
          Sign In
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '500' }}>
          Register here
        </Link>
      </div>
    </div>
  );
};