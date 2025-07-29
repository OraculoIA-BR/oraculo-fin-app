import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  writeBatch,
  doc
} from "firebase/firestore";
import { getAuth, type User } from "firebase/auth";
import { sampleTransactions } from "./sample-data"; // Ajuste o caminho conforme o local correto

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number; 
  currency: string;
  date: Date;
  type: 'income' | 'expense';
}

export async function getTransactions(userId: string): Promise<Transaction[]> {
  // ... (código existente da função, se houver)
}

/**
 * Cria o documento do usuário e popula com as transações de exemplo.
 * @param user O objeto do usuário recém-criado do Firebase Auth.
 */
export async function setupNewUser(user: User) {
  if (!user) return;
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const transactionsColRef = collection(userDocRef, 'transactions');
    const batch = writeBatch(db);

    sampleTransactions.forEach((tx) => {
      const txDocRef = doc(transactionsColRef, tx.transactionId);
      batch.set(txDocRef, tx);
    });

    batch.set(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
    });

    await batch.commit();
    console.log(`Novo usuário ${user.uid} configurado com sucesso com transações de exemplo.`);
  } catch (error) {
    console.error("Erro ao configurar novo usuário:", error);
  }
}

export { db, auth };