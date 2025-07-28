import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

// Substitua com sua config
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  const transactionsCol = collection(db, "transactions");
  const transactionsSnap = await getDocs(transactionsCol);

  for (const tranDoc of transactionsSnap.docs) {
    const data = tranDoc.data();
    // Aqui você precisa garantir que cada documento tem o campo do UID do usuário
    const userId = data.userId || data.uid; // Ajuste para o nome real do campo!
    if (!userId) {
      console.log(`Documento ${tranDoc.id} não tem userId`);
      continue;
    }
    // Copia para a nova estrutura
    const exemplosRef = doc(db, "users", userId, "exemplos", tranDoc.id);
    await setDoc(exemplosRef, data);
    console.log(`Migrado ${tranDoc.id} para /users/${userId}/exemplos`);
  }
}

migrate().then(() => {
  console.log("Migração concluída!");
  process.exit();
});