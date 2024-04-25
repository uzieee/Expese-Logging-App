import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { Approval, ApprovalTable } from '@/components/dashboard/integrations/integration-table';

export const metadata = { title: `Approval | Dashboard | ${config.site.name}` } satisfies Metadata;

const approvals = [
  
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
    },

 
] satisfies Approval[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const paginatedapprovals = applyPagination(approvals, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
         </Stack>
      <ApprovalTable
        count={paginatedapprovals.length}
        page={page}
        rows={paginatedapprovals}
        rowsPerPage={rowsPerPage}
      />
      <div style={{ marginLeft: 'auto' }}>
    <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
     </Button>
  </div>
      
    </Stack>
    

  );
}

function applyPagination(rows: Approval[], page: number, rowsPerPage: number): Approval[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
