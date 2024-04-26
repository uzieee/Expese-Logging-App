// approvetable.tsx
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
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { fetchExpenses, approveExpense, rejectExpense } from '@/lib/firebase/expenseService'; // Adjust path as needed

export function ExpenseApprovalsTable(): React.JSX.Element {
  const [expenses, setExpenses] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });

  React.useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };
    loadExpenses();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleApprove = async (id) => {
    try {
      await approveExpense(id);
      setExpenses(expenses.map(exp => exp.id === id ? { ...exp, isApproved: true } : exp));
      setSnackbar({ open: true, message: 'Expense approved successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectExpense(id);
      setExpenses(expenses.map(exp => exp.id === id ? { ...exp, isApproved: false } : exp));
      setSnackbar({ open: true, message: 'Expense rejected successfully!', severity: 'success' });
    } catch (error) {
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
                  <Button onClick={() => handleApprove(expense.id)} style={{ backgroundColor: 'light-green' }} color="success">Approve</Button>
                  <Button onClick={() => handleReject(expense.id)} color="error">Reject</Button>
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
    </Card>
  );
}
