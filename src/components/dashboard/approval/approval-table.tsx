// approvetable.tsx
'use client';

import * as React from 'react';
import { TablePagination } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { approveExpense, fetchExpenses, rejectExpense } from '@/lib/firebase/expense-service'; // Adjust path as needed

export interface ExpenseApproval {
  id: string;
  expenseType: string;
  date: string;
  totalAmount: number;
  isApproved?: boolean;
}

interface Snack {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
}

interface ExpenseProps {
  count?: number;
  page?: number;
  rowsPerPage?: number;
}

export function ExpenseApprovalsTable({ count = 0, page = 0, rowsPerPage = 0 }: ExpenseProps): React.JSX.Element {
  const [expenses, setExpenses] = React.useState([] as ExpenseApproval[]);
  const [snackbar, setSnackbar] = React.useState<Snack>({
    open: false,
    message: '',
    severity: 'info',
  });

  function noop(): void {
    // do nothing
  }

  React.useEffect(() => {
    const loadExpenses = async () => {
      const data: any = await fetchExpenses();
      setExpenses(data);
    };
    loadExpenses();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleApprove = async (id: any) => {
    try {
      await approveExpense(id);
      setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, isApproved: true } : exp)));
      setSnackbar({ open: true, message: 'Expense approved successfully!', severity: 'success' });
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const handleReject = async (id: any) => {
    try {
      await rejectExpense(id);
      setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, isApproved: false } : exp)));
      setSnackbar({ open: true, message: 'Expense rejected successfully!', severity: 'success' });
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto', height: '500px' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Expense Details</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow hover key={expense.id}>
                <TableCell>
                  <Typography variant="subtitle2">{expense.id}</Typography>
                </TableCell>
                <TableCell>{expense.expenseType}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>${expense.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(expense.id)}
                    style={{ backgroundColor: 'light-green' }}
                    color="success"
                  >
                    Approve
                  </Button>
                  <Button onClick={() => handleReject(expense.id)} color="error">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

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
