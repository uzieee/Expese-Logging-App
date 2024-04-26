// src/lib/firebase/expenseService.ts
import { db } from "./firebase-config";  // Make sure the path is correct
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

// Fetch all expenses
export const fetchExpenses = async () => {
    try {
      const expenseCollectionRef = collection(db, "addExpense");
      const querySnapshot = await getDocs(expenseCollectionRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date * 1000) 
      }));
    } catch (error) {
      throw new Error(`Failed to fetch expenses: ${error.message}`);
    }
  };
  
// Add a new expense
export const addExpense = async (expenseData) => {
    try {
      const expenseCollectionRef = collection(db, "addExpense");
      const docRef = await addDoc(expenseCollectionRef, expenseData);
      return docRef.id;
    } catch (error) {
      throw new Error(`Failed to add expense: ${error.message}`);
    }
  };
  
  // Update an existing expense
  export const updateExpense = async (id, expenseData) => {
    try {
      const expenseDocRef = doc(db, "addExpense", id);
      await updateDoc(expenseDocRef, expenseData);
    } catch (error) {
      throw new Error(`Failed to update expense: ${error.message}`);
    }
  };
  
  // Delete an expense
  export const deleteExpense = async (id) => {
    try {
      const expenseDocRef = doc(db, "addExpense", id);
      await deleteDoc(expenseDocRef);
    } catch (error) {
      throw new Error(`Failed to delete expense: ${error.message}`);
    }
  };

// Approve an expense
export const approveExpense = async (id) => {
    const expenseDocRef = doc(db, "addExpense", id);
    const docSnap = await getDoc(expenseDocRef);
  
    if (docSnap.exists()) {
      await updateDoc(expenseDocRef, { isApproved: true });
    } else {
      throw new Error(`No document found with ID ${id}`);
    }
  };
  
 // Reject an expense
export const rejectExpense = async (id) => {
    const expenseDocRef = doc(db, "addExpense", id);
    const docSnap = await getDoc(expenseDocRef);
  
    if (docSnap.exists()) {
      await updateDoc(expenseDocRef, { isApproved: false });
    } else {
      throw new Error(`No document found with ID ${id}`);
    }
  };