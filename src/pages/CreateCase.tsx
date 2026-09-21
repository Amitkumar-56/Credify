import React, { useState } from 'react';
import { useStore } from '../store';
import { mockApi } from '../api';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

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
      setPanError('Invalid PAN format. Please enter PAN in format: ABCDE1234F');
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
      setError('Customer consent is required.');
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
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Fill in the details to create a new verification request</p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          Case Information
        </h3>

        {error && (
          <div style={{ background: 'var(--danger-bg)', color: 'var(--danger-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Applicant / Customer Name <span>*</span></label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.applicantName}
                onChange={e => setFormData({...formData, applicantName: e.target.value})}
                required
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Mobile Number <span>*</span></label>
              <div style={{ display: 'flex' }}>
                <span style={{ padding: '0.75rem 1rem', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', color: 'var(--text-secondary)', fontWeight: 500 }}>+91</span>
                <input 
                  type="tel" 
                  className="input-field" 
                  style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                  value={formData.mobileNumber}
                  onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                  required
                  pattern="[0-9]{10}"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">Purpose of Verification <span>*</span></label>
              <select 
                className="input-field"
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
                required
              >
                <option value="">Select purpose...</option>
                <option value="Loan Verification">Loan Verification</option>
                <option value="Credit Card Processing">Credit Card Processing</option>
                <option value="Bank Account Opening">Bank Account Opening</option>
                <option value="General KYC Update">General KYC Update</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label">PAN Number <span>*</span></label>
              <input 
                type="text" 
                className={`input-field ${panError ? 'error' : ''}`} 
                value={formData.panNumber}
                onChange={handlePanChange}
                required
                maxLength={10}
                placeholder="ABCDE1234F"
              />
              {panError && <span className="error-text" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} /> {panError}</span>}
              {!panError && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>PAN format: ABCDE1234F</span>}
            </div>
          </div>

          <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <input 
              type="checkbox" 
              id="consent"
              checked={formData.consentGiven}
              onChange={e => setFormData({...formData, consentGiven: e.target.checked})}
              style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
            />
            <label htmlFor="consent" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
              I confirm that customer consent has been obtained for PAN verification.
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading || !!panError}>
              {loading ? 'Verifying PAN...' : 'Submit for Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCase;
