import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { ExpenseApproval, ExpenseApprovalsTable } from '@/components/dashboard/approval/approval-table';

export const metadata = { title: `Approval | Dashboard | ${config.site.name}` } satisfies Metadata;

const ExpenseApprovals = [
  
  {
    id: 'USR-001',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
   {
    id: 'USR-002',
    expenseType: 'Username',
    date: '14-02-2024',
    totalAmount: 50,
    isApproved: true,
   
   },
    

  

] satisfies ExpenseApproval[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(ExpenseApprovals, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        
      </Stack>
      <ExpenseApprovalsTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: ExpenseApproval[], page: number, rowsPerPage: number): ExpenseApproval[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
