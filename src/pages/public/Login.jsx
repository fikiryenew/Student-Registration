import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import './Login.css';

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
    <div className="login-card">
      <h2 className="login-title">Login to SRMS</h2>
      
      {location.state?.message && <div className="alert-success">{location.state.message}</div>}
      {error && <div className="alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            className="form-control"
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Password</label>
          <input
            type="password"
            required
            className="form-control"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        
        <button type="submit" className="btn-submit">
          Sign In
        </button>
      </form>

      <div className="login-footer">
        Don't have an account?{' '}
        <Link to="/register" className="login-link">
          Register here
        </Link>
      </div>
    </div>
  );
};