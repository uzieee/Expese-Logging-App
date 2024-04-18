
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'integrations', title: 'All Employees', href: paths.dashboard.integrations, icon: 'users' },
  { key: 'customers', title: 'Approval', href: paths.dashboard.customers, icon: 'approval' },
  { 
    key: 'settings', 
    title: 'Logout', 
    href: '#', 
    icon: 'logout',
    
  },
];
