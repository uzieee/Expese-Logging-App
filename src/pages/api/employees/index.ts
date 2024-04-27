import type { NextApiRequest, NextApiResponse } from 'next';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebase-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'GET') {
        try {
            const querySnapshot = await getDocs(collection(db, 'employees'));
            const employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return res.status(200).json({ status: 'success', data: employees });
        } catch (error) {
            console.error('Failed to retrieve employees:', error);
            if (error instanceof Error) {
                return res.status(500).json({ status: 'error', message: error.message });
            } else {
                return res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
            }
        }
    }

    if (req.method === 'POST') {
        try {
            const docRef = await addDoc(collection(db, 'employees'), req.body);
            return res.status(201).json({ status: 'success', id: docRef.id, ...req.body });
        } catch (error) {
            console.error('Failed to add employee:', error);
            if (error instanceof Error) {
                return res.status(500).json({ status: 'error', message: error.message });
            } else {
                return res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
            }
        }
    }
}
