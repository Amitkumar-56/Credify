import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShieldCheck, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@credify.in');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      login(email);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Left Side Branding */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--primary-deep) 0%, var(--primary-color) 100%)', display: 'flex', flexDirection: 'column', padding: '4rem', color: 'white', justifyContent: 'center' }} className="login-branding">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <ShieldCheck size={48} color="#ffffff" />
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'white' }}>CREDIFY INDIA</h1>
            <span style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Verification CRM</span>
          </div>
        </div>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', color: 'white' }}>
          Smarter Verification<br />for a Safer Tomorrow
        </h2>
        <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>Secure • Reliable • Trusted</p>
        
        <div style={{ marginTop: 'auto', fontSize: '0.875rem', opacity: 0.6 }}>
          © 2026 Credify India. All rights reserved.
        </div>
      </div>

      {/* Right Side Login Form */}
      <div style={{ flex: 1, background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Sign in to your Credify India account</p>

          {error && (
            <div style={{ background: 'var(--danger-bg)', color: 'var(--danger-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@credify.demo"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              <input type="checkbox" id="remember" style={{ accentColor: 'var(--primary-color)' }} />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Remember me</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem' }} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Demo Credentials:</p>
            <p style={{ margin: 0 }}>Email: <strong>demo@credify.in</strong></p>
            <p style={{ margin: 0 }}>Password: <strong>demo123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
