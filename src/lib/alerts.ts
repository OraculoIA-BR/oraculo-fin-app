// src/lib/alerts.ts

import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "./firebase"; // Importa a instância 'db' do Firestore.

/**
 * Salva um e-mail para receber alertas.
 * @param {string} email - O e-mail a ser salvo.
 */
export const sendAlerts = async (email: string) => {
  try {
    // Adiciona um novo documento à coleção 'alerts' com o e-mail e um timestamp.
    await addDoc(collection(db, "alerts"), {
      email: email,
      timestamp: serverTimestamp(),
    });
    console.log("Inscrição de alerta adicionada para:", email);
  } catch (e) {
    // Exibe um erro no console se a operação falhar.
    console.error("Erro ao adicionar documento: ", e);
  }
};
