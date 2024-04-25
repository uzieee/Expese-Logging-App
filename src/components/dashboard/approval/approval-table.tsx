'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}



export interface ExpenseApproval {
  id: string;
  employee_name: string;
  expense_detail: string;
  created: string;
  amount: string ; 
  action: string;
}


interface ExpenseApprovalsTableProps {
  count?: number;
  page?: number;
  rows?: ExpenseApproval[];
  rowsPerPage?: number;
}

export function ExpenseApprovalsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: ExpenseApprovalsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((ExpenseApproval) => ExpenseApproval.id);
  }, [rows]);

  const {  selected } = useSelection(rowIds);

 
  return (
    <Card >
      <Box sx={{ overflowX: 'auto' , height : '500px'  }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead >
          <TableRow sx={{color: 'black !important' }}>
              <TableCell>Employee Name</TableCell>
              <TableCell>Expense Details</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      {/* <Avatar src={row.avatar} /> */}
                      <Typography variant="subtitle2">{row.employee_name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.expense_detail}</TableCell>
                  <TableCell>
                    {row.created}
                  </TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
