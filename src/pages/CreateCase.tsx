import React, { useState } from 'react';
import { useStore } from '../store';
import { mockApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateCase: React.FC = () => {
  const { addCase } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    applicantName: '',
    mobileNumber: '',
    panNumber: '',
    purpose: '',
    consentGiven: false
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [panError, setPanError] = useState('');

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (pan && !panRegex.test(pan.toUpperCase())) {
      setPanError('Invalid PAN format (e.g., ABCDE1234F)');
      return false;
    }
    setPanError('');
    return true;
  };

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setFormData({ ...formData, panNumber: val });
    if (val.length === 10) validatePan(val);
    else setPanError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validatePan(formData.panNumber)) {
      return;
    }

    if (!formData.consentGiven) {
      setError('You must obtain customer consent before verification.');
      return;
    }

    setLoading(true);
    try {
      const newCase = await mockApi.verifyPan(formData);
      addCase(newCase);
      navigate('/cases');
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ margin: 0 }}>Create PAN Verification</h2>
      </div>

      <div className="card glass-panel">
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Applicant/Customer Name *</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.applicantName}
              onChange={e => setFormData({...formData, applicantName: e.target.value})}
              required
              placeholder="e.g. John Doe"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Mobile Number *</label>
              <input 
                type="tel" 
                className="input-field" 
                value={formData.mobileNumber}
                onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                required
                pattern="[0-9]{10}"
                placeholder="10-digit number"
              />
            </div>

            <div className="input-group">
              <label className="input-label">PAN Number *</label>
              <input 
                type="text" 
                className={`input-field ${panError ? 'error' : ''}`} 
                value={formData.panNumber}
                onChange={handlePanChange}
                required
                maxLength={10}
                placeholder="ABCDE1234F"
              />
              {panError && <span className="error-text">{panError}</span>}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Purpose of Verification *</label>
            <select 
              className="input-field"
              value={formData.purpose}
              onChange={e => setFormData({...formData, purpose: e.target.value})}
              required
            >
              <option value="">Select purpose...</option>
              <option value="Loan Application">Loan Application</option>
              <option value="Credit Card">Credit Card Processing</option>
              <option value="Bank Account">Bank Account Opening</option>
              <option value="KYC Update">General KYC Update</option>
            </select>
          </div>

          <div className="input-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <input 
              type="checkbox" 
              id="consent"
              checked={formData.consentGiven}
              onChange={e => setFormData({...formData, consentGiven: e.target.checked})}
              style={{ marginTop: '0.25rem', width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)' }}
            />
            <label htmlFor="consent" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Customer Consent Declaration</strong><br/>
              I confirm that I have obtained explicit consent from the applicant to verify their PAN details against NSDL/Income Tax Department records for the specified purpose.
            </label>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading || !!panError}>
              {loading ? 'Verifying...' : 'Submit Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCase;
