import type { NextApiRequest, NextApiResponse } from 'next';

import { rejectExpense } from '../../../lib/firebase/expense-service';

interface RejectExpenseRequest {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string }>
): Promise<void> {
  if (req.method === 'POST') {
    const { id } = req.body as RejectExpenseRequest;
    try {
      await rejectExpense(id);
      res.status(200).json({ success: true, message: 'Expense rejected successfully.' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ success: false, message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    const method = req.method || 'UNKNOWN METHOD';
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
