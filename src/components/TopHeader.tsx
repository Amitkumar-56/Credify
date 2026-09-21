import React from 'react';
import { useStore } from '../store';
import { Menu, User, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick, title = 'Dashboard' }) => {
  const { user } = useStore();

  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
          {user?.name?.charAt(0) || <User size={20} />}
        </div>
        <div style={{ display: 'none' }} className="user-details">
          {/* We'll handle responsive hiding in CSS or inline style */}
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</p>
        </div>
        <ChevronDown size={16} color="var(--text-secondary)" />
      </div>
    </header>
  );
};

export default TopHeader;
