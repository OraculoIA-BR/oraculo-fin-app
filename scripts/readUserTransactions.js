const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

// Inicializa o Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Troque pelo UID do usuário que você quer ler as transações
const userId = "Hka8H8sfnYY8zqwd2S1EdGn95j23";

async function readTransactions() {
  const txSnap = await db
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .get();

  const transactions = txSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log(`Transações para usuário ${userId}:`);
  console.log(transactions);
}

readTransactions().catch(err => {
  console.error("Erro ao ler transações:", err);
  process.exit(1);
});