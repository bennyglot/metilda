import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Add styles for the sidebar

interface ISidebarItem {
  label: string;
  target: string;
}

interface ISidebarProps {
  items: ISidebarItem[];
  isMinimized?: boolean;
  toggleSidebar?: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ items, isMinimized, toggleSidebar }) => {

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isMinimized ? '>' : '<'}
      </button>
      <ul className="sidebar-items">
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">
            <NavLink to={item.target} className="sidebar-link">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;