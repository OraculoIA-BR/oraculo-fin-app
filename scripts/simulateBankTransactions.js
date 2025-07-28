const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const userTransactions = [
  {
    userId: "Hka8H8sfnYY8zqwd2S1EdGn95j23",
    transactions: [
      { transactionId: "tx01", timestamp: "2025-07-01T08:10:00Z", amount: { amount: "-1400.00", currency: "BRL" }, category: "Moradia", description: "Aluguel Residencial" },
      { transactionId: "tx02", timestamp: "2025-07-02T12:15:00Z", amount: { amount: "-200.00", currency: "BRL" }, category: "Alimentação", description: "Supermercado" },
      { transactionId: "tx03", timestamp: "2025-07-03T08:35:00Z", amount: { amount: "-45.00", currency: "BRL" }, category: "Transporte", description: "Uber" },
      { transactionId: "tx04", timestamp: "2025-07-04T19:20:00Z", amount: { amount: "-80.00", currency: "BRL" }, category: "Lazer", description: "Cinema" },
      { transactionId: "tx05", timestamp: "2025-07-05T18:00:00Z", amount: { amount: "-150.00", currency: "BRL" }, category: "Restaurantes", description: "Jantar fora" },
      { transactionId: "tx06", timestamp: "2025-07-06T10:10:00Z", amount: { amount: "-60.00", currency: "BRL" }, category: "Saúde", description: "Farmácia" },
      { transactionId: "tx07", timestamp: "2025-07-07T09:30:00Z", amount: { amount: "-250.00", currency: "BRL" }, category: "Educação", description: "Curso online" },
      { transactionId: "tx08", timestamp: "2025-07-08T15:00:00Z", amount: { amount: "-30.00", currency: "BRL" }, category: "Transporte", description: "Ônibus" },
      { transactionId: "tx09", timestamp: "2025-07-09T13:45:00Z", amount: { amount: "-100.00", currency: "BRL" }, category: "Compras", description: "Roupas" },
      { transactionId: "tx10", timestamp: "2025-07-10T11:25:00Z", amount: { amount: "-20.00", currency: "BRL" }, category: "Alimentação", description: "Padaria" },
      { transactionId: "tx11", timestamp: "2025-07-11T16:40:00Z", amount: { amount: "-110.00", currency: "BRL" }, category: "Lazer", description: "Assinatura Netflix" },
      { transactionId: "tx12", timestamp: "2025-07-12T14:50:00Z", amount: { amount: "-300.00", currency: "BRL" }, category: "Moradia", description: "Condomínio" },
      { transactionId: "tx13", timestamp: "2025-07-13T17:35:00Z", amount: { amount: "-70.00", currency: "BRL" }, category: "Restaurantes", description: "Almoço" },
      { transactionId: "tx14", timestamp: "2025-07-14T12:10:00Z", amount: { amount: "-40.00", currency: "BRL" }, category: "Transporte", description: "Gasolina" },
      { transactionId: "tx15", timestamp: "2025-07-15T09:55:00Z", amount: { amount: "-25.00", currency: "BRL" }, category: "Alimentação", description: "Lanche" },
      { transactionId: "tx16", timestamp: "2025-07-16T20:00:00Z", amount: { amount: "-90.00", currency: "BRL" }, category: "Lazer", description: "Show" },
      { transactionId: "tx17", timestamp: "2025-07-17T13:20:00Z", amount: { amount: "-55.00", currency: "BRL" }, category: "Saúde", description: "Consulta médica" },
      { transactionId: "tx18", timestamp: "2025-07-18T08:30:00Z", amount: { amount: "-400.00", currency: "BRL" }, category: "Educação", description: "Faculdade" },
      { transactionId: "tx19", timestamp: "2025-07-19T11:50:00Z", amount: { amount: "-28.00", currency: "BRL" }, category: "Transporte", description: "Metrô" },
      { transactionId: "tx20", timestamp: "2025-07-20T10:40:00Z", amount: { amount: "-350.00", currency: "BRL" }, category: "Compras", description: "Celular novo" },
      { transactionId: "tx21", timestamp: "2025-07-21T15:30:00Z", amount: { amount: "-15.00", currency: "BRL" }, category: "Alimentação", description: "Café" },
      { transactionId: "tx22", timestamp: "2025-07-22T18:10:00Z", amount: { amount: "-75.00", currency: "BRL" }, category: "Lazer", description: "Teatro" },
      { transactionId: "tx23", timestamp: "2025-07-23T09:00:00Z", amount: { amount: "-120.00", currency: "BRL" }, category: "Restaurantes", description: "Churrascaria" },
      { transactionId: "tx24", timestamp: "2025-07-24T14:00:00Z", amount: { amount: "-60.00", currency: "BRL" }, category: "Saúde", description: "Exames" },
      { transactionId: "tx25", timestamp: "2025-07-25T17:10:00Z", amount: { amount: "-10.00", currency: "BRL" }, category: "Transporte", description: "Taxi" },
      { transactionId: "tx26", timestamp: "2025-07-26T11:30:00Z", amount: { amount: "-50.00", currency: "BRL" }, category: "Alimentação", description: "Açougue" },
      { transactionId: "tx27", timestamp: "2025-07-27T13:15:00Z", amount: { amount: "-65.00", currency: "BRL" }, category: "Compras", description: "Livros" },
      { transactionId: "tx28", timestamp: "2025-07-28T19:40:00Z", amount: { amount: "-200.00", currency: "BRL" }, category: "Moradia", description: "Conta de luz" },
      { transactionId: "tx29", timestamp: "2025-07-29T12:20:00Z", amount: { amount: "-30.00", currency: "BRL" }, category: "Alimentação", description: "Mercado" },
      { transactionId: "tx30", timestamp: "2025-07-30T09:10:00Z", amount: { amount: "-55.00", currency: "BRL" }, category: "Transporte", description: "Combustível" },
      { transactionId: "tx31", timestamp: "2025-07-31T15:50:00Z", amount: { amount: "-105.00", currency: "BRL" }, category: "Lazer", description: "Show de stand-up" },
      { transactionId: "tx32", timestamp: "2025-07-01T13:30:00Z", amount: { amount: "2500.00", currency: "BRL" }, category: "Salário", description: "Recebimento salário" },
      { transactionId: "tx33", timestamp: "2025-07-05T11:35:00Z", amount: { amount: "-22.00", currency: "BRL" }, category: "Alimentação", description: "Doceria" },
      { transactionId: "tx34", timestamp: "2025-07-07T17:25:00Z", amount: { amount: "-35.00", currency: "BRL" }, category: "Transporte", description: "Aplicativo 99" },
      { transactionId: "tx35", timestamp: "2025-07-13T21:10:00Z", amount: { amount: "-80.00", currency: "BRL" }, category: "Lazer", description: "Bar" },
      { transactionId: "tx36", timestamp: "2025-07-16T08:45:00Z", amount: { amount: "-300.00", currency: "BRL" }, category: "Moradia", description: "Conta de água" },
      { transactionId: "tx37", timestamp: "2025-07-18T18:30:00Z", amount: { amount: "-39.99", currency: "BRL" }, category: "Lazer", description: "Assinatura Spotify" },
      { transactionId: "tx38", timestamp: "2025-07-19T15:15:00Z", amount: { amount: "-85.00", currency: "BRL" }, category: "Saúde", description: "Dentista" },
      { transactionId: "tx39", timestamp: "2025-07-20T12:05:00Z", amount: { amount: "-125.00", currency: "BRL" }, category: "Restaurantes", description: "Pizzaria" },
      { transactionId: "tx40", timestamp: "2025-07-23T19:00:00Z", amount: { amount: "-60.00", currency: "BRL" }, category: "Compras", description: "Presentes" },
      { transactionId: "tx41", timestamp: "2025-07-25T13:00:00Z", amount: { amount: "-45.00", currency: "BRL" }, category: "Alimentação", description: "Sacolão" },
      { transactionId: "tx42", timestamp: "2025-07-27T09:20:00Z", amount: { amount: "-25.00", currency: "BRL" }, category: "Transporte", description: "Bicicleta compartilhada" },
      { transactionId: "tx43", timestamp: "2025-07-28T20:10:00Z", amount: { amount: "-180.00", currency: "BRL" }, category: "Educação", description: "Livros didáticos" },
      { transactionId: "tx44", timestamp: "2025-07-29T14:40:00Z", amount: { amount: "-75.00", currency: "BRL" }, category: "Saúde", description: "Óculos de grau" },
      { transactionId: "tx45", timestamp: "2025-07-30T10:55:00Z", amount: { amount: "-60.00", currency: "BRL" }, category: "Lazer", description: "Museu" },
      { transactionId: "tx46", timestamp: "2025-07-31T16:30:00Z", amount: { amount: "-500.00", currency: "BRL" }, category: "Moradia", description: "IPTU" },
      { transactionId: "tx47", timestamp: "2025-07-15T12:00:00Z", amount: { amount: "-20.00", currency: "BRL" }, category: "Alimentação", description: "Açaí" },
      { transactionId: "tx48", timestamp: "2025-07-18T13:10:00Z", amount: { amount: "-95.00", currency: "BRL" }, category: "Restaurantes", description: "Hamburgueria" },
      { transactionId: "tx49", timestamp: "2025-07-24T18:50:00Z", amount: { amount: "-35.00", currency: "BRL" }, category: "Transporte", description: "Estacionamento" },
      { transactionId: "tx50", timestamp: "2025-07-20T07:30:00Z", amount: { amount: "-150.00", currency: "BRL" }, category: "Compras", description: "Acessórios eletrônicos" }
    ]
  }
];

async function saveTransactions() {
  for (const userData of userTransactions) {
    const { userId, transactions } = userData;
    for (const tx of transactions) {
      await db.collection("users").doc(userId).collection("transactions").doc(tx.transactionId).set(tx);
      console.log(`Transação ${tx.transactionId} salva para usuário ${userId}`);
    }
  }
  console.log("Todas as transações simuladas foram salvas.");
  process.exit(0);
}

saveTransactions().catch((err) => {
  console.error("Erro ao salvar transações:", err);
  process.exit(1);
});