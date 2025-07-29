import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { transactions } from './seedFirestore';
import path from 'path';
import fs from 'fs';

// --- Configuração do Firebase Admin ---
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Arquivo de credencial serviceAccountKey.json não encontrado em:', serviceAccountPath);
  process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://orculo-financeiro-pupq1.firebaseio.com'
  });
}

const db = getFirestore();

/**
 * Busca o UID de um usuário pelo seu e-mail.
 * @param email - O e-mail do usuário.
 * @returns O UID do usuário.
 */
async function getUserUidByEmail(email: string): Promise<string> {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    console.log(`UID encontrado para o e-mail ${email}: ${userRecord.uid}`);
    return userRecord.uid;
  } catch (error) {
    if (error instanceof Error && (error as any).code === 'auth/user-not-found') {
      console.error(`Erro: Não foi possível encontrar um usuário com o e-mail "${email}". Verifique se o e-mail está correto e cadastrado no Firebase Authentication.`);
    } else if (error instanceof Error) {
      console.error('Erro inesperado ao buscar usuário:', error.message);
    } else {
      console.error('Erro desconhecido ao buscar usuário:', error);
    }
    throw error;
  }
}

/**
 * "Semeia" (cadastra em massa) as transações de exemplo para um UID específico.
 * @param uid - O UID do usuário que receberá as transações.
 */
async function seedTransactionsForUser(uid: string) {
  try {
    console.log(`Iniciando o cadastro de transações para o UID: ${uid}...`);
    const transactionsCollectionRef = db.collection('users').doc(uid).collection('transactions');

    // DEBUG EXTRA
    console.log('Tipo de transactions:', typeof transactions, Array.isArray(transactions));
    console.dir(transactions, { depth: 1 });

    let count = 0;
    if (!Array.isArray(transactions)) {
      throw new TypeError("O objeto 'transactions' não é um array. Verifique seu arquivo seedFirestore.ts!");
    }
    for (const tx of transactions) {
      // Garante que amount é string
      const amountString = tx.amount?.amount || "0.00";
      // Garante que currency é string
      const currency = tx.amount?.currency || 'BRL';
      // Garante que timestamp existe
      const timestamp = tx.timestamp || new Date().toISOString();

      const transactionData = {
        transactionId: tx.transactionId,
        timestamp,
        amount: amountString,
        currency,
        category: tx.category,
        description: tx.description,
      };

      try {
        await transactionsCollectionRef.add(transactionData);
        count++;
        console.log(`  - Transação ${count}/${transactions.length} (${tx.transactionId}) cadastrada com sucesso.`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`  - Falha ao cadastrar a transação ${tx.transactionId}:`, error.message);
          console.error(error.stack);
        } else {
          console.error(`  - Falha ao cadastrar a transação ${tx.transactionId}:`, error);
        }
      }
    }

    console.log(`Concluído! ${count} de ${transactions.length} transações foram cadastradas para o usuário ${uid}.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro no cadastro das transações:', error.message);
      console.error(error.stack);
    } else {
      console.error('Erro no cadastro das transações:', error);
    }
    throw error;
  }
}

/**
 * Função principal que executa o script.
 */
async function main() {
  // Pega o e-mail da linha de comando.
  const email = process.argv[2];

  if (!email) {
    console.error('-----------------------------------------------------------');
    console.error('ERRO: E-mail não fornecido.');
    console.error('Uso correto: ts-node scripts/seedUser.ts seu-email@exemplo.com');
    console.error('-----------------------------------------------------------');
    process.exit(1);
  }

  try {
    const uid = await getUserUidByEmail(email);
    await seedTransactionsForUser(uid);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Operação falhou. Verifique os erros acima.');
      console.error(error.message);
      console.error(error.stack);
    } else {
      console.error('Operação falhou. Verifique os erros acima.');
      console.error(error);
    }
    process.exit(1);
  }
}

// Executa a função principal.
main();