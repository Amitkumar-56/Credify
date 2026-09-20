import React, { useState } from 'react';
import { useStore } from '../store';
import { Search, Eye, X } from 'lucide-react';
import type { PanVerificationCase } from '../types';

const CaseList: React.FC = () => {
  const { cases } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<PanVerificationCase | null>(null);

  const filteredCases = cases.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maskPan = (pan: string) => {
    if (pan.length !== 10) return pan;
    return `${pan.substring(0, 3)}XXXX${pan.substring(7)}`;
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>Case List</h2>
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by ID or Name..." 
            className="input-field" 
            style={{ paddingLeft: '2.5rem', margin: 0 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Applicant</th>
              <th>PAN (Masked)</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No cases found</td>
              </tr>
            ) : (
              filteredCases.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.id}</td>
                  <td>{c.applicantName}</td>
                  <td style={{ fontFamily: 'monospace' }}>{maskPan(c.panNumber)}</td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{formatDate(c.verificationDate)}</td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setSelectedCase(c)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Case Result Modal */}
      {selectedCase && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button 
              onClick={() => setSelectedCase(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
            
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Verification Result</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <p className="input-label" style={{ marginBottom: '0.25rem' }}>Reference ID</p>
                <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{selectedCase.id}</p>
              </div>
              <div>
                <p className="input-label" style={{ marginBottom: '0.25rem' }}>Date & Time</p>
                <p style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{formatDate(selectedCase.verificationDate)}</p>
              </div>
              <div>
                <p className="input-label" style={{ marginBottom: '0.25rem' }}>Applicant Name</p>
                <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{selectedCase.applicantName}</p>
              </div>
              <div>
                <p className="input-label" style={{ marginBottom: '0.25rem' }}>Overall Status</p>
                <span className={`badge badge-${selectedCase.status.toLowerCase()}`}>{selectedCase.status}</span>
              </div>
              
              {selectedCase.status !== 'Pending' && (
                <>
                  <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', gridColumn: 'span 2' }}>
                    <h4 style={{ fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>API Details</h4>
                  </div>
                  <div>
                    <p className="input-label" style={{ marginBottom: '0.25rem' }}>PAN Status</p>
                    <p style={{ fontWeight: 500, color: selectedCase.panStatus === 'Active' ? 'var(--secondary-color)' : 'var(--danger-color)' }}>
                      {selectedCase.panStatus}
                    </p>
                  </div>
                  <div>
                    <p className="input-label" style={{ marginBottom: '0.25rem' }}>Name Match</p>
                    <p style={{ fontWeight: 500, color: selectedCase.nameMatchStatus === 'Matched' ? 'var(--secondary-color)' : (selectedCase.nameMatchStatus === 'Mismatched' ? 'var(--danger-color)' : 'var(--text-secondary)') }}>
                      {selectedCase.nameMatchStatus}
                    </p>
                  </div>
                </>
              )}
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setSelectedCase(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
