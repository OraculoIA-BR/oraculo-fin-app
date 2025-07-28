const { db } = require('../src/lib/firebase');
const { collection, addDoc } = require('firebase/firestore');

const transactions = [
  { transactionId: "1", description: "Supermercado", amount: 250.00, category: "Alimentação", date: "2025-07-01" },
  { transactionId: "2", description: "Restaurante", amount: 80.50, category: "Alimentação", date: "2025-07-02" },
  { transactionId: "3", description: "Gasolina", amount: 200.00, category: "Transporte", date: "2025-07-03" },
  { transactionId: "4", description: "Cinema", amount: 40.00, category: "Lazer", date: "2025-07-04" },
  { transactionId: "5", description: "Farmácia", amount: 65.00, category: "Saúde", date: "2025-07-05" },
  { transactionId: "6", description: "Padaria", amount: 30.25, category: "Alimentação", date: "2025-07-06" },
  { transactionId: "7", description: "Transporte público", amount: 12.00, category: "Transporte", date: "2025-07-07" },
  { transactionId: "8", description: "Livros", amount: 120.00, category: "Educação", date: "2025-07-08" },
  { transactionId: "9", description: "Curso online", amount: 350.00, category: "Educação", date: "2025-07-09" },
  { transactionId: "10", description: "Academia", amount: 100.00, category: "Saúde", date: "2025-07-10" },
  { transactionId: "11", description: "Café", amount: 15.00, category: "Alimentação", date: "2025-07-11" },
  { transactionId: "12", description: "Roupa", amount: 220.00, category: "Vestuário", date: "2025-07-12" },
  { transactionId: "13", description: "Internet", amount: 100.00, category: "Moradia", date: "2025-07-13" },
  { transactionId: "14", description: "Aluguel", amount: 1500.00, category: "Moradia", date: "2025-07-14" },
  { transactionId: "15", description: "Luz", amount: 180.00, category: "Moradia", date: "2025-07-15" },
  { transactionId: "16", description: "Água", amount: 80.00, category: "Moradia", date: "2025-07-16" },
  { transactionId: "17", description: "Telefone", amount: 60.00, category: "Moradia", date: "2025-07-17" },
  { transactionId: "18", description: "Supermercado", amount: 160.00, category: "Alimentação", date: "2025-07-18" },
  { transactionId: "19", description: "Combustível", amount: 190.00, category: "Transporte", date: "2025-07-19" },
  { transactionId: "20", description: "Farmácia", amount: 35.00, category: "Saúde", date: "2025-07-20" },
  { transactionId: "21", description: "Restaurante", amount: 90.00, category: "Alimentação", date: "2025-07-21" },
  { transactionId: "22", description: "Show", amount: 180.00, category: "Lazer", date: "2025-07-22" },
  { transactionId: "23", description: "Bar", amount: 75.00, category: "Lazer", date: "2025-07-23" },
  { transactionId: "24", description: "Cafeteria", amount: 20.00, category: "Alimentação", date: "2025-07-24" },
  { transactionId: "25", description: "Supermercado", amount: 90.00, category: "Alimentação", date: "2025-07-25" },
  { transactionId: "26", description: "Uber", amount: 40.00, category: "Transporte", date: "2025-07-26" },
  { transactionId: "27", description: "Cinema", amount: 50.00, category: "Lazer", date: "2025-07-27" },
  { transactionId: "28", description: "Livros", amount: 70.00, category: "Educação", date: "2025-07-28" },
  { transactionId: "29", description: "Supermercado", amount: 200.00, category: "Alimentação", date: "2025-07-29" },
  { transactionId: "30", description: "Farmácia", amount: 55.00, category: "Saúde", date: "2025-07-30" },
  { transactionId: "31", description: "Restaurante", amount: 110.00, category: "Alimentação", date: "2025-07-31" },
  { transactionId: "32", description: "Gasolina", amount: 210.00, category: "Transporte", date: "2025-08-01" },
  { transactionId: "33", description: "Padaria", amount: 22.00, category: "Alimentação", date: "2025-08-02" },
  { transactionId: "34", description: "Bar", amount: 60.00, category: "Lazer", date: "2025-08-03" },
  { transactionId: "35", description: "Curso online", amount: 400.00, category: "Educação", date: "2025-08-04" },
  { transactionId: "36", description: "Internet", amount: 110.00, category: "Moradia", date: "2025-08-05" },
  { transactionId: "37", description: "Aluguel", amount: 1550.00, category: "Moradia", date: "2025-08-06" },
  { transactionId: "38", description: "Luz", amount: 175.00, category: "Moradia", date: "2025-08-07" },
  { transactionId: "39", description: "Água", amount: 85.00, category: "Moradia", date: "2025-08-08" },
  { transactionId: "40", description: "Telefone", amount: 62.00, category: "Moradia", date: "2025-08-09" },
  { transactionId: "41", description: "Supermercado", amount: 170.00, category: "Alimentação", date: "2025-08-10" },
  { transactionId: "42", description: "Combustível", amount: 195.00, category: "Transporte", date: "2025-08-11" },
  { transactionId: "43", description: "Farmácia", amount: 60.00, category: "Saúde", date: "2025-08-12" },
  { transactionId: "44", description: "Restaurante", amount: 95.00, category: "Alimentação", date: "2025-08-13" },
  { transactionId: "45", description: "Show", amount: 200.00, category: "Lazer", date: "2025-08-14" },
  { transactionId: "46", description: "Bar", amount: 65.00, category: "Lazer", date: "2025-08-15" },
  { transactionId: "47", description: "Cafeteria", amount: 18.00, category: "Alimentação", date: "2025-08-16" },
  { transactionId: "48", description: "Supermercado", amount: 100.00, category: "Alimentação", date: "2025-08-17" },
  { transactionId: "49", description: "Uber", amount: 35.00, category: "Transporte", date: "2025-08-18" },
  { transactionId: "50", description: "Livros", amount: 75.00, category: "Educação", date: "2025-08-19" }
];

async function seedTransactions() {
  for (const tx of transactions) {
    await addDoc(collection(db, "transactions"), tx);
    console.log(`Transação adicionada: ${tx.transactionId}`);
  }
  console.log('Todas as transações foram adicionadas!');
}

seedTransactions();