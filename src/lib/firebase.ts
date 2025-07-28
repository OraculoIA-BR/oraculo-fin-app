import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  writeBatch, // Importa o writeBatch para operações em lote
  doc // Importa a função doc
} from "firebase/firestore";
import { getAuth, type User } from "firebase/auth";
// --- INÍCIO DA ADIÇÃO ---
import { sampleTransactions } from "./sample-data"; // Importa os dados de exemplo
// --- FIM DA ADIÇÃO ---

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
  // ... (código existente)
}

// --- INÍCIO DA ADIÇÃO ---
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

    // 1. Adiciona as 50 transações de exemplo
    sampleTransactions.forEach((tx) => {
      const txDocRef = doc(transactionsColRef, tx.transactionId);
      batch.set(txDocRef, tx);
    });

    // 2. Cria o documento principal do usuário (pode ser expandido no futuro)
    batch.set(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(), // Usa a data atual
    });

    // 3. Executa todas as operações de escrita de uma vez
    await batch.commit();
    console.log(`Novo usuário ${user.uid} configurado com sucesso com 50 transações.`);

  } catch (error) {
    console.error("Erro ao configurar novo usuário:", error);
    // Opcional: Adicionar lógica para lidar com o erro, como deletar o usuário criado.
  }
}
// --- FIM DA ADIÇÃO ---


export { db, auth };
