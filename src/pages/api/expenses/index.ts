import type { NextApiRequest, NextApiResponse } from 'next';

import { addExpense, deleteExpense, fetchExpenses, updateExpense } from '../../../lib/firebase/expense-service';

interface ExpenseData {
  id?: string;
  category: string;
  amount: number;
  date: Date;
}

interface ExpenseRequest extends NextApiRequest {
  body: ExpenseData;
}

// Define return type for the handler as a Promise with a void return
export default async function handler(req: ExpenseRequest, res: NextApiResponse): Promise<void> {
  try {
    switch (req.method) {
      case 'GET': {
        const expenses = await fetchExpenses();
        res.status(200).json(expenses);
        break;
    }
      case 'POST': {
        const newExpense = await addExpense(req.body);
        res.status(201).json({ id: newExpense });
        break;
      }
      case 'PUT': {
        if (!req.body.id) {
          res.status(400).json({ error: 'Missing expense ID' });
          return;
        }
        await updateExpense(req.body.id, req.body);
        res.status(200).json({ id: req.body.id });
        break;
      }
      case 'DELETE': {
        if (!req.body.id) {
          res.status(400).json({ error: 'Missing expense ID' });
          return;
        }
        await deleteExpense(req.body.id);
        res.status(204).end();
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method ?? 'UNKNOWN'} Not Allowed`);
    }
    
  } catch (error: unknown) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
