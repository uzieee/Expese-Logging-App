import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebase/firebase-config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const docRef = doc(db, "employees", id as string);

    switch (req.method) {
        case 'GET':
            try {
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                return res.status(200).json(docSnap.data());
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        case 'PUT':
            try {
                await updateDoc(docRef, req.body);
                return res.status(200).json({ message: 'Employee updated successfully' });
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        case 'DELETE':
            try {
                await deleteDoc(docRef);
                return res.status(200).json({ message: 'Employee deleted successfully' });
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
