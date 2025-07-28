const { db } = require('../src/lib/firebase');
const { collection, addDoc } = require('firebase/firestore');

// Coloque aqui o UID do usuário para quem quer criar os exemplos
const USER_UID = 'COLOQUE_AQUI_O_UID_DO_USUARIO';

const exemplos = [
  { transactionId: "1", description: "Supermercado", amount: 250.00, category: "Alimentação", date: "2025-07-01" },
  { transactionId: "2", description: "Restaurante", amount: 80.50, category: "Alimentação", date: "2025-07-02" },
  // ...adicione quantos exemplos quiser!
];

async function seedExemplosByUser() {
  for (const ex of exemplos) {
    await addDoc(collection(db, "users", USER_UID, "exemplos"), ex);
    console.log(`Exemplo adicionado para usuário ${USER_UID}: ${ex.transactionId}`);
  }
  console.log('Todos os exemplos foram adicionados à subcoleção exemplos do usuário!');
}

seedExemplosByUser();