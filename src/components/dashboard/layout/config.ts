
import { paths } from '@/paths';

export const navItems = [
  { key: 'dashboard', title: 'Dashboard', href: paths.dashboard.dashboard, icon: 'chart-pie' },
  { key: 'all-employees', title: 'All Employees', href: paths.dashboard.allemployees, icon: 'users' },
  { key: 'approval', title: 'Approval', href: paths.dashboard.approval, icon: 'approval' },
  { 
    key: 'settings', 
    title: 'Logout', 
    href: '#', 
    icon: 'logout',
    
  },
];
