import React, { useState } from 'react';
import { useStore } from '../store';
import { Search, Eye, X, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PanVerificationCase } from '../types';

const CaseList: React.FC = () => {
  const { cases } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<PanVerificationCase | null>(null);

  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.panNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Verification Cases</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage and track all PAN verification requests</p>
        </div>
        <Link to="/create-case" className="btn btn-primary">Create New Case</Link>
      </div>

      <div className="card" style={{ padding: 0 }}>
        
        {/* Table Controls */}
        <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by name, PAN or ID..."
              style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Filter size={18} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Filter:</span>
            </div>
            <select 
              className="input-field" 
              style={{ width: '150px', marginBottom: 0 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Applicant Name</th>
                <th>Mobile Number</th>
                <th>PAN Number</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.id}</td>
                  <td style={{ fontWeight: 500 }}>{c.applicantName}</td>
                  <td>{c.mobileNumber}</td>
                  <td style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>{c.panNumber}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{new Date(c.verificationDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => setSelectedCase(c)}
                      className="btn btn-secondary" 
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' }}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No cases found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
