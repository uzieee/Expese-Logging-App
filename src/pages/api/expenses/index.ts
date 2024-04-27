import type { NextApiRequest, NextApiResponse } from 'next';

import { addExpense, deleteExpense, fetchExpenses, updateExpense } from '../../../lib/firebase/expense-service';

// Handle API requests based on the method
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const expenses = await fetchExpenses();
        res.status(200).json(expenses);
        break;
      case 'POST':
        const newExpense = await addExpense(req.body);
        res.status(201).json({ id: newExpense });
        break;
      case 'PUT':
        await updateExpense(req.body.id, req.body);
        res.status(200).json({ id: req.body.id });
        break;
      case 'DELETE':
        await deleteExpense(req.body.id);
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    // Set a more appropriate status code, such as 400 (Bad Request) or 404 (Not Found)
    res.status(400).json({ error: 'An error occurred. Please try again.' });
  }
}
