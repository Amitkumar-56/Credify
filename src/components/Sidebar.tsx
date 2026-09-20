import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store';
import { LayoutDashboard, FilePlus, List, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useStore();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive ? 600 : 500,
    transition: 'all 0.2s'
  });

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div style={{ marginBottom: '2rem', padding: '0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Credify</h1>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CRM Portal</span>
            </div>
            <button className="mobile-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <NavLink to="/" style={navLinkStyle} onClick={onClose}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/create-case" style={navLinkStyle} onClick={onClose}>
              <FilePlus size={20} /> Create Case
            </NavLink>
            <NavLink to="/cases" style={navLinkStyle} onClick={onClose}>
              <List size={20} /> Case List
            </NavLink>
          </nav>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, borderRadius: '8px', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
