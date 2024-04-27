import * as React from 'react';
import type { Metadata } from 'next';
import { Button, Stack } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react';
import { config } from '@/config';
import type { AllEmployees } from '@/components/dashboard/all-employees/all-employee-table';
import { AllEmployeesTable } from '@/components/dashboard/all-employees/all-employee-table';

export const metadata = { title: `All Employees | Dashboard | ${config.site.name}` } satisfies Metadata;

const AllEmployeess: AllEmployees[] = [
  {
    id: 'USR-006',
    employee_name: 'Username',
    pending_expenses: '1Expense',
    view_and_approval: 'view',
  },
  {
    id: 'USR-005',
    employee_name: 'Username',
    pending_expenses: '1Expense',
    view_and_approval: 'view',
  },
  {
    id: 'USR-004',
    employee_name: 'Username',
    pending_expenses: '1Expense',
    view_and_approval: 'view',
  }
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedAllEmployeess = applyPagination(AllEmployeess, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} />
      <AllEmployeesTable
        count={paginatedAllEmployeess.length}
        page={page}
        rows={paginatedAllEmployeess}
        rowsPerPage={rowsPerPage}
      />
      <div style={{ marginLeft: 'auto' }}>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" />
      </div>
    </Stack>
  );
}

function applyPagination(rows: AllEmployees[], page: number, rowsPerPage: number): AllEmployees[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
