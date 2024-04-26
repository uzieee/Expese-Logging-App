import type { NextApiRequest, NextApiResponse } from 'next';
import { approveExpense } from '../../../lib/firebase/expenseService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await approveExpense(req.body.id);
      res.status(200).json({ success: true, message: 'Expense approved successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}