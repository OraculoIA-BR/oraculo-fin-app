import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface Transaction {
  id: string;
  amount: string;
  currency: string;
  category: string;
  description: string;
  timestamp: string;
  transactionId: string;
}

export async function getTransactions(userId: string): Promise<Transaction[]> {
  if (!userId) {
    throw new Error("User ID is required to fetch transactions.");
  }

  const transactionsRef = collection(db, `users/${userId}/transactions`);
  const q = query(transactionsRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const transactions = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Transaction[];

  return transactions;
}