import { db } from '../src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// 50 transações exemplo
const transactions = [
  {
    transactionId: "tx01",
    timestamp: "2025-07-01T08:10:00Z",
    amount: { amount: "125.50", currency: "BRL" },
    category: "Alimentação",
    description: "Café da manhã na padaria"
  },
  {
    transactionId: "tx02",
    timestamp: "2025-07-01T12:45:00Z",
    amount: { amount: "35.90", currency: "BRL" },
    category: "Transporte",
    description: "Corrida Uber ao trabalho"
  },
  {
    transactionId: "tx03",
    timestamp: "2025-07-01T18:30:00Z",
    amount: { amount: "56.00", currency: "BRL" },
    category: "Alimentação",
    description: "Jantar no restaurante"
  },
  {
    transactionId: "tx04",
    timestamp: "2025-07-02T09:15:00Z",
    amount: { amount: "27.80", currency: "BRL" },
    category: "Mercado",
    description: "Compra de pães e leite"
  },
  {
    transactionId: "tx05",
    timestamp: "2025-07-02T14:00:00Z",
    amount: { amount: "210.00", currency: "BRL" },
    category: "Educação",
    description: "Curso online"
  },
  {
    transactionId: "tx06",
    timestamp: "2025-07-02T20:40:00Z",
    amount: { amount: "120.00", currency: "BRL" },
    category: "Lazer",
    description: "Cinema com amigos"
  },
  {
    transactionId: "tx07",
    timestamp: "2025-07-03T07:30:00Z",
    amount: { amount: "90.00", currency: "BRL" },
    category: "Saúde",
    description: "Consulta médica"
  },
  {
    transactionId: "tx08",
    timestamp: "2025-07-03T11:00:00Z",
    amount: { amount: "58.20", currency: "BRL" },
    category: "Alimentação",
    description: "Almoço no self-service"
  },
  {
    transactionId: "tx09",
    timestamp: "2025-07-03T17:00:00Z",
    amount: { amount: "18.50", currency: "BRL" },
    category: "Transporte",
    description: "Ônibus"
  },
  {
    transactionId: "tx10",
    timestamp: "2025-07-04T10:15:00Z",
    amount: { amount: "33.00", currency: "BRL" },
    category: "Mercado",
    description: "Feira de frutas"
  },
  {
    transactionId: "tx11",
    timestamp: "2025-07-04T15:30:00Z",
    amount: { amount: "75.00", currency: "BRL" },
    category: "Vestuário",
    description: "Camiseta nova"
  },
  {
    transactionId: "tx12",
    timestamp: "2025-07-04T21:00:00Z",
    amount: { amount: "55.90", currency: "BRL" },
    category: "Lazer",
    description: "Bar com amigos"
  },
  {
    transactionId: "tx13",
    timestamp: "2025-07-05T09:10:00Z",
    amount: { amount: "70.00", currency: "BRL" },
    category: "Saúde",
    description: "Farmácia"
  },
  {
    transactionId: "tx14",
    timestamp: "2025-07-05T13:20:00Z",
    amount: { amount: "48.75", currency: "BRL" },
    category: "Alimentação",
    description: "Almoço delivery"
  },
  {
    transactionId: "tx15",
    timestamp: "2025-07-05T18:50:00Z",
    amount: { amount: "120.00", currency: "BRL" },
    category: "Educação",
    description: "Compra de livros"
  },
  {
    transactionId: "tx16",
    timestamp: "2025-07-06T08:00:00Z",
    amount: { amount: "25.00", currency: "BRL" },
    category: "Transporte",
    description: "Táxi"
  },
  {
    transactionId: "tx17",
    timestamp: "2025-07-06T12:30:00Z",
    amount: { amount: "95.00", currency: "BRL" },
    category: "Mercado",
    description: "Supermercado"
  },
  {
    transactionId: "tx18",
    timestamp: "2025-07-06T20:10:00Z",
    amount: { amount: "180.00", currency: "BRL" },
    category: "Lazer",
    description: "Show musical"
  },
  {
    transactionId: "tx19",
    timestamp: "2025-07-07T07:20:00Z",
    amount: { amount: "38.00", currency: "BRL" },
    category: "Alimentação",
    description: "Café especial"
  },
  {
    transactionId: "tx20",
    timestamp: "2025-07-07T14:40:00Z",
    amount: { amount: "60.00", currency: "BRL" },
    category: "Transporte",
    description: "Combustível"
  },
  {
    transactionId: "tx21",
    timestamp: "2025-07-07T19:30:00Z",
    amount: { amount: "45.20", currency: "BRL" },
    category: "Alimentação",
    description: "Jantar japonês"
  },
  {
    transactionId: "tx22",
    timestamp: "2025-07-08T09:00:00Z",
    amount: { amount: "32.00", currency: "BRL" },
    category: "Mercado",
    description: "Padaria"
  },
  {
    transactionId: "tx23",
    timestamp: "2025-07-08T13:50:00Z",
    amount: { amount: "145.00", currency: "BRL" },
    category: "Educação",
    description: "Mensalidade curso"
  },
  {
    transactionId: "tx24",
    timestamp: "2025-07-08T18:10:00Z",
    amount: { amount: "77.00", currency: "BRL" },
    category: "Lazer",
    description: "Restaurante mexicano"
  },
  {
    transactionId: "tx25",
    timestamp: "2025-07-09T08:30:00Z",
    amount: { amount: "28.00", currency: "BRL" },
    category: "Saúde",
    description: "Exames laboratoriais"
  },
  {
    transactionId: "tx26",
    timestamp: "2025-07-09T11:45:00Z",
    amount: { amount: "39.90", currency: "BRL" },
    category: "Alimentação",
    description: "Almoço rápido"
  },
  {
    transactionId: "tx27",
    timestamp: "2025-07-09T17:20:00Z",
    amount: { amount: "230.00", currency: "BRL" },
    category: "Vestuário",
    description: "Calça jeans"
  },
  {
    transactionId: "tx28",
    timestamp: "2025-07-10T10:30:00Z",
    amount: { amount: "140.00", currency: "BRL" },
    category: "Lazer",
    description: "Ingressos parque"
  },
  {
    transactionId: "tx29",
    timestamp: "2025-07-10T16:15:00Z",
    amount: { amount: "55.00", currency: "BRL" },
    category: "Transporte",
    description: "Uber para casa"
  },
  {
    transactionId: "tx30",
    timestamp: "2025-07-10T20:10:00Z",
    amount: { amount: "78.80", currency: "BRL" },
    category: "Alimentação",
    description: "Pizza"
  },
  {
    transactionId: "tx31",
    timestamp: "2025-07-11T08:50:00Z",
    amount: { amount: "44.00", currency: "BRL" },
    category: "Mercado",
    description: "Açougue"
  },
  {
    transactionId: "tx32",
    timestamp: "2025-07-11T12:20:00Z",
    amount: { amount: "69.90", currency: "BRL" },
    category: "Educação",
    description: "Curso de idiomas"
  },
  {
    transactionId: "tx33",
    timestamp: "2025-07-11T19:00:00Z",
    amount: { amount: "102.00", currency: "BRL" },
    category: "Lazer",
    description: "Teatro"
  },
  {
    transactionId: "tx34",
    timestamp: "2025-07-12T09:40:00Z",
    amount: { amount: "37.00", currency: "BRL" },
    category: "Saúde",
    description: "Farmácia"
  },
  {
    transactionId: "tx35",
    timestamp: "2025-07-12T13:10:00Z",
    amount: { amount: "110.00", currency: "BRL" },
    category: "Vestuário",
    description: "Tênis esportivo"
  },
  {
    transactionId: "tx36",
    timestamp: "2025-07-12T17:30:00Z",
    amount: { amount: "85.00", currency: "BRL" },
    category: "Lazer",
    description: "Jogo de futebol"
  },
  {
    transactionId: "tx37",
    timestamp: "2025-07-13T10:00:00Z",
    amount: { amount: "60.00", currency: "BRL" },
    category: "Alimentação",
    description: "Café da manhã especial"
  },
  {
    transactionId: "tx38",
    timestamp: "2025-07-13T15:30:00Z",
    amount: { amount: "49.00", currency: "BRL" },
    category: "Transporte",
    description: "Combustível"
  },
  {
    transactionId: "tx39",
    timestamp: "2025-07-13T21:20:00Z",
    amount: { amount: "88.00", currency: "BRL" },
    category: "Lazer",
    description: "Restaurante italiano"
  },
  {
    transactionId: "tx40",
    timestamp: "2025-07-14T08:20:00Z",
    amount: { amount: "41.30", currency: "BRL" },
    category: "Alimentação",
    description: "Padaria"
  },
  {
    transactionId: "tx41",
    timestamp: "2025-07-14T12:00:00Z",
    amount: { amount: "130.00", currency: "BRL" },
    category: "Educação",
    description: "Livros didáticos"
  },
  {
    transactionId: "tx42",
    timestamp: "2025-07-14T19:50:00Z",
    amount: { amount: "75.00", currency: "BRL" },
    category: "Lazer",
    description: "Cinema"
  },
  {
    transactionId: "tx43",
    timestamp: "2025-07-15T09:10:00Z",
    amount: { amount: "22.00", currency: "BRL" },
    category: "Transporte",
    description: "Ônibus"
  },
  {
    transactionId: "tx44",
    timestamp: "2025-07-15T14:40:00Z",
    amount: { amount: "68.00", currency: "BRL" },
    category: "Mercado",
    description: "Supermercado"
  },
  {
    transactionId: "tx45",
    timestamp: "2025-07-15T18:30:00Z",
    amount: { amount: "50.00", currency: "BRL" },
    category: "Saúde",
    description: "Consulta odontológica"
  },
  {
    transactionId: "tx46",
    timestamp: "2025-07-16T07:50:00Z",
    amount: { amount: "39.00", currency: "BRL" },
    category: "Alimentação",
    description: "Lanche rápido"
  },
  {
    transactionId: "tx47",
    timestamp: "2025-07-16T11:30:00Z",
    amount: { amount: "60.00", currency: "BRL" },
    category: "Educação",
    description: "Material escolar"
  },
  {
    transactionId: "tx48",
    timestamp: "2025-07-16T20:00:00Z",
    amount: { amount: "120.00", currency: "BRL" },
    category: "Lazer",
    description: "Barzinho"
  },
  {
    transactionId: "tx49",
    timestamp: "2025-07-17T08:40:00Z",
    amount: { amount: "52.00", currency: "BRL" },
    category: "Vestuário",
    description: "Boné"
  },
  {
    transactionId: "tx50",
    timestamp: "2025-07-17T14:50:00Z",
    amount: { amount: "93.00", currency: "BRL" },
    category: "Mercado",
    description: "Compras do mês"
  }
];

async function seedTransactions() {
  for (const tx of transactions) {
    await addDoc(collection(db, "transactions"), tx);
    console.log(`Transação adicionada: ${tx.transactionId}`);
  }
  console.log('Todas as transações foram adicionadas!');
}

seedTransactions();