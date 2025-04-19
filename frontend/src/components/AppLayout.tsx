import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';

const sidebarItems = [
  { label: 'Patients', target: '/patients' },
];
export const AppLayout = () => {
  return (
    <div>
      <Sidebar items={sidebarItems}/>
      {/* Render nested routes */}
      <Outlet />
    </div>
  );
};

export default AppLayout;