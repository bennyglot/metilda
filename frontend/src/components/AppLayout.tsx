import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';
import { useSidebar } from './sidebar/useSidebar';

const sidebarItems = [
  { label: 'Patients', target: '/patients' },
];
export const AppLayout = () => {
  const {isMinimized, toggleSidebar} = useSidebar();

  return (
    <div className={`app-layout ${isMinimized ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar items={sidebarItems} isMinimized={isMinimized} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;