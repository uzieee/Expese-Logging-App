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
// import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface RecentTransaction {
  id: string;
  employee: string;
  category: string;
  type: string;
  expense: string ; 
  status: string;
  workingType: string;
  transaction_date: string;
  transaction_time:string;
}

interface RecentTransactionsTableProps {
  count?: number;
  page?: number;
  rows?: RecentTransaction[];
  rowsPerPage?: number;
}

export function RecentTransactionsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: RecentTransactionsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((RecentTransaction) => RecentTransaction.id);
  }, [rows]);

  const {  selected } = useSelection(rowIds);
  return (
    <Card >
      <Box sx={{ overflowX: 'auto' ,  }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead >
            <TableRow sx={{backgroundColor: 'black' }}>
              <TableCell>Employee</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Expense</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Working Type</TableCell>
              <TableCell>Date & Time</TableCell>
            
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
                      <Typography variant="subtitle2">{row.employee}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    {row.type}
                  </TableCell>
                  <TableCell>{row.expense}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.workingType}</TableCell>
                  <TableCell>{row.transaction_date}/{row.transaction_time}</TableCell>
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
