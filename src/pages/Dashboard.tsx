import React from 'react';
import { useStore } from '../store';
import { FileText, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { cases, user } = useStore();
  
  const total = cases.length;
  const pending = cases.filter(c => c.status === 'Pending').length;
  const verified = cases.filter(c => c.status === 'Verified').length;
  const failed = cases.filter(c => c.status === 'Failed').length;

  const verifiedPercent = total > 0 ? Math.round((verified / total) * 100) : 0;
  const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0;
  const failedPercent = total > 0 ? Math.round((failed / total) * 100) : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const verifiedStroke = (verifiedPercent / 100) * circumference;
  const pendingStroke = (pendingPercent / 100) * circumference;
  const failedStroke = (failedPercent / 100) * circumference;

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Dashboard</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Welcome back, {user?.name || 'Admin'}</p>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {today}
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Total Cases */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
              <FileText size={14} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Total Cases</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{total < 10 ? `0${total}` : total}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
              <ArrowUp size={12} /> 12.5%
            </span>
          </div>
        </div>

        {/* Pending Cases */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning-color)' }}>
              <Clock size={14} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Pending</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{pending < 10 ? `0${pending}` : pending}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--warning-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
              <ArrowUp size={12} /> 3 today
            </span>
          </div>
        </div>

        {/* Verified Cases */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success-color)' }}>
              <CheckCircle size={14} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Verified</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{verified < 10 ? `0${verified}` : verified}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
              <ArrowUp size={12} /> 7 today
            </span>
          </div>
        </div>

        {/* Failed Cases */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger-color)' }}>
              <XCircle size={14} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Failed</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{failed < 10 ? `0${failed}` : failed}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
              <ArrowDown size={12} /> 1 today
            </span>
          </div>
        </div>

      </div>

      {/* Overview & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Verification Overview */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 className="card-title" style={{ fontSize: '1rem' }}>Verification Overview</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginTop: '1.5rem' }}>
            
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="var(--bg-app)" strokeWidth="12" />
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="var(--success-color)" strokeWidth="12"
                  strokeDasharray={`${verifiedStroke} ${circumference}`} strokeDashoffset="0" strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="var(--warning-color)" strokeWidth="12"
                  strokeDasharray={`${pendingStroke} ${circumference}`} strokeDashoffset={`-${verifiedStroke}`} strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                <circle cx="60" cy="60" r={radius} fill="transparent" stroke="var(--danger-color)" strokeWidth="12"
                  strokeDasharray={`${failedStroke} ${circumference}`} strokeDashoffset={`-${verifiedStroke + pendingStroke}`} strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{total}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Total Cases</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)' }}></div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Verified</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {verifiedPercent}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({verified})</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--warning-color)' }}></div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pending</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {pendingPercent}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({pending})</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger-color)' }}></div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Failed</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {failedPercent}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({failed})</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title" style={{ fontSize: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto', marginBottom: 'auto' }}>
            <Link to="/create-case" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={16} /> Create New Case
            </Link>
            <Link to="/cases" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              View All Cases
            </Link>
          </div>
        </div>

      </div>

      {/* Recent Verification Cases Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="card-title" style={{ margin: 0, fontSize: '1rem' }}>Recent Verification Cases</h3>
          <Link to="/cases" style={{ fontSize: '0.875rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
            View All &rarr;
          </Link>
        </div>
        
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table style={{ margin: 0, width: '100%' }}>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Applicant Name</th>
                <th>PAN</th>
                <th>Verification Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cases.slice(0, 5).map((c) => (
                <tr key={c.id}>
                  <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{c.id}</td>
                  <td style={{ fontSize: '0.875rem', fontWeight: 500 }}>{c.applicantName}</td>
                  <td style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>{c.panNumber}</td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {new Date(c.verificationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
