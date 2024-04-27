import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { Requested } from '@/components/dashboard/overview/requested';
import { ExpenseReport } from '@/components/dashboard/overview/expense-report';
import { Approved } from '@/components/dashboard/overview/approved';
import { Rejected } from '@/components/dashboard/overview/rejected';
import { ExpensebyCategory } from '@/components/dashboard/overview/expense-by-category';
import { Typography } from '@mui/material';
import { RecentTransactionsTable } from '@/components/dashboard/approval/recent-transactions-table';
import type { RecentTransaction } from '@/components/dashboard/approval/recent-transactions-table';


export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

const RecentTransactions = [


  
  {
    id: 'USR-006',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-005',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-004',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-003',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-002',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-001',
    employee: 'Username',
    category: 'Vehicle',
    type: '$60',
    expense: 'Rent',
    status: 'Approved', workingType: 'Full Day',
    transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
] satisfies RecentTransaction[];


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedRecentTransactions = applyPagination(RecentTransactions, page, rowsPerPage);

  return (

    <Grid container spacing={3}>
       <Grid lg={3} sm={6} xs={12}>
        <Requested  sx={{ height: '100%' }} value="$12000" />
      </Grid> 
      <Grid lg={3} sm={6} xs={12}>
        <Approved  sx={{ height: '100%' }} value="$12000" />
      </Grid>
        <Grid lg={3} sm={6} xs={12}>
        <Rejected sx={{ height: '100%' }} value="$12000" />
      </Grid>
      <Grid lg={8} xs={12}>
        <Typography fontSize={'1.85rem'} sx={{  marginBottom: 2 , color: '#333' }}>Expense Report</Typography>
          <ExpenseReport
          chartSeries={[
            { name: 'This year', data: [ 1, 1.5, 1, 2, 2.5, 4, 3 , 3.5] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      
      <Grid lg={4} md={6} xs={12}>
      <Typography fontSize={'1.85rem'} sx={{  marginBottom: 2 }}>Expense by Categories</Typography>
          
      
        <ExpensebyCategory chartSeries={[31, 18, 17 , ]} labels={['Rent', 'Vehicle', 'Flat']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={6} xs={12}> 
      <Typography fontSize={'1.85rem'} sx={{ marginTop: 5 , marginBottom: 2 }}>Recent Transactions</Typography>
       
      <RecentTransactionsTable
        count={paginatedRecentTransactions.length}
        page={page}
        rows={paginatedRecentTransactions}
        rowsPerPage={rowsPerPage}
      />
      </Grid>
      
    </Grid>
  );
}

function applyPagination(rows: RecentTransaction[], page: number, rowsPerPage: number): RecentTransaction[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}