import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store';
import { LayoutDashboard, FilePlus, List, LogOut, ShieldCheck, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useStore();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <ShieldCheck size={28} color="#ffffff" />
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>CREDIFY INDIA</h1>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a5b4fc' }}>Verification CRM</span>
        </div>
        {isOpen && (
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/cases" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <List size={20} /> Verification Cases
        </NavLink>
        <NavLink to="/create-case" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <FilePlus size={20} /> Create Case
        </NavLink>
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <button 
          onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: '#a5b4fc', cursor: 'pointer', fontWeight: 500, borderRadius: '8px', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
          onMouseOut={e => { e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
