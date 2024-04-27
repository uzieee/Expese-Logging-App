import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebase-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if id is defined and is a string, respond with an error if not
  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid request: ID is required.' });
    return;
  }

  const docRef = doc(db, 'employees', id);

  switch (req.method) {
    case 'GET':
      try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          res.status(404).json({ message: 'Employee not found' });
        } else {
          res.status(200).json(docSnap.data());
        }
      } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
      }
      break;
    case 'PUT':
      try {
        await updateDoc(docRef, req.body);
        res.status(200).json({ message: 'Employee updated successfully' });
      } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
      }
      break;
    case 'DELETE':
      try {
        await deleteDoc(docRef);
        res.status(200).json({ message: 'Employee deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method ?? 'UNKNOWN'} Not Allowed`);
  }
}
