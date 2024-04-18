import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  
  {
    id: 'USR-006',
    name: 'Username',
    avatar: '/assets/avatar-6.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-005',
    name: 'Username',
    avatar: '/assets/avatar-5.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved',workingType: 'Full Day', transaction_date: '14-02-2024' , transaction_time:'07:56PM', },

  {
    id: 'USR-004',
    name: 'Username',
    avatar: '/assets/avatar-4.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved', workingType: 'Full Day',transaction_date: '14-02-2024' , transaction_time:'07:56PM', },
  {
    id: 'USR-003',
    name: 'Username',
    avatar: '/assets/avatar-3.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved', workingType: 'Full Day',transaction_date: '14-02-2024' , transaction_time:'07:56PM', },
  {
    id: 'USR-002',
    name: 'Username',
    avatar: '/assets/avatar-2.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved', workingType: 'Full Day',transaction_date: '14-02-2024' , transaction_time:'07:56PM', },
  {
    id: 'USR-001',
    name: 'Username',
    avatar: '/assets/avatar-1.png',
    email: 'Vehicle',
    phone: '$60',
    address: 'Rent',
    createdAt: 'Approved', workingType: 'Full Day',transaction_date: '14-02-2024' , transaction_time:'07:56PM', },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        {/* <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack> */}
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            
          </Button>
        </div>
      </Stack>
      {/* <CustomersFilters /> */}
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
