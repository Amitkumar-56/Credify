import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { FileText, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getExternalUsers } from '../api';

const Dashboard: React.FC = () => {
  const { cases } = useStore();
  const [apiUsers, setApiUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const total = cases.length;
  const pending = cases.filter(c => c.status === 'Pending').length;
  const verified = cases.filter(c => c.status === 'Verified').length;
  const failed = cases.filter(c => c.status === 'Failed').length;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const data = await getExternalUsers();
        setApiUsers(data.slice(0, 5)); // Just take 5 for demo
      } catch (error) {
        console.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary-color)' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
            <FileText size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Total Cases</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{total}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Pending</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{pending}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--secondary-color)' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--secondary-color)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Verified</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{verified}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--danger-color)' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--danger-color)' }}>
            <XCircle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', margin: 0, fontWeight: 500 }}>Failed</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{failed}</h3>
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/create-case" className="btn btn-primary">Create New Case</Link>
        <Link to="/cases" className="btn btn-secondary">View All Cases</Link>
      </div>

      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Third Party Users (API Demo)</h2>
      <div className="card">
        {loadingUsers ? (
          <p>Loading API data...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {apiUsers.map(user => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '1rem', margin: 0, fontWeight: 600 }}>{user.name}</p>
                  <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
