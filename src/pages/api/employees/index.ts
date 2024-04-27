import type { NextApiRequest, NextApiResponse } from 'next';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebase-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method ?? 'UNKNOWN'} Not Allowed`);
        return;  
    }
    if (req.method === 'GET') {
        try {
            const querySnapshot = await getDocs(collection(db, 'employees'));
            const employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.status(200).json({ status: 'success', data: employees });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ status: 'error', message: error.message });
            } else {
                res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
            }
            return;  
        }
        return; 
    }

    if (req.method === 'POST') {
        try {
            const docRef = await addDoc(collection(db, 'employees'), req.body);
            res.status(201).json({ status: 'success', id: docRef.id, ...req.body });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ status: 'error', message: error.message });
            } else {
                res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
            }
            return;
        }
        return;
    }
}