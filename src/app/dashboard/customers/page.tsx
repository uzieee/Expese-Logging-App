import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { ExpenseApproval, ExpenseApprovalsTable } from '@/components/dashboard/customer/approval-table';

export const metadata = { title: `Approval | Dashboard | ${config.site.name}` } satisfies Metadata;

const ExpenseApprovals = [
  
  {
    id: 'USR-001',
    employee_name: 'Username',
    expense_detail: 'Vehicle ',
    created: '14-02-2024',
    amount: '$50',
    action: 'Approve / Reject',
    // createdAt: 'Approved', workingType: 'Full Day',
    // transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  {
    id: 'USR-002',
    employee_name: 'Username',
    expense_detail: 'Vehicle ',
    created: '14-02-2024',
    amount: '$50',
    action: 'Approve / Reject',
    // createdAt: 'Approved', workingType: 'Full Day',
    // transaction_date: '14-02-2024' , transaction_time:'07:56PM',
  },
  

] satisfies ExpenseApproval[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(ExpenseApprovals, page, rowsPerPage);

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
          {/* <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            
          </Button> */}
        </div>
      </Stack>
      {/* <CustomersFilters /> */}
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
