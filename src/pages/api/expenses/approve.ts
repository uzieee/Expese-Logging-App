import type { NextApiRequest, NextApiResponse } from 'next';

import { approveExpense } from '../../../lib/firebase/expense-service';

// Define a type for the expected request body
interface ApproveExpenseRequest {
  id: string;
}

// Explicit return type of 'Promise<void>' as the function does not return any value
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string }>
): Promise<void> {
  if (req.method === 'POST') {
    try {
      // Ensure req.body is treated as the expected type, providing better type safety
      const { id } = req.body as ApproveExpenseRequest;
      await approveExpense(id);
      res.status(200).json({ success: true, message: 'Expense approved successfully.' });
    } catch (error: unknown) {
      // Handling unknown error types safely
      // Check if error is an instance of Error to safely access 'message'
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    // Handle potentially undefined 'req.method' by providing a default message
    const method = req.method || 'UNKNOWN METHOD';
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
