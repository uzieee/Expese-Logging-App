import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { Sales } from '@/components/dashboard/overview/sales';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { Typography } from '@mui/material';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';


export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

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

    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget  sx={{ height: '100%' }} value="$12000" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers  sx={{ height: '100%' }} value="$12000" />
      </Grid>
      {/* <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid> */}
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="$12000" />
      </Grid>
      <Grid lg={8} xs={12}>
        <Typography variant="h4" sx={{  marginBottom: 2 }}>Expense Report</Typography>
          <Sales
          chartSeries={[
            { name: 'This year', data: [ 1, 1.5, 1, 2, 2.5, 4, 3 , 3.5] },
            // { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      
      <Grid lg={4} md={6} xs={12}>
      <Typography variant="h4" sx={{  marginBottom: 2 }}>Expense by Categories</Typography>
          
      
        <Traffic chartSeries={[31, 18, 17 , 23 , 12]} labels={['Rent', 'Vehicle', 'Flat' , 'Cars' , 'Laptops']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={6} xs={12}> 
      <Typography variant="h4" sx={{ marginTop: 5 , marginBottom: 2 }}>Recent Transactions</Typography>
       
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
      </Grid>
      
    </Grid>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}