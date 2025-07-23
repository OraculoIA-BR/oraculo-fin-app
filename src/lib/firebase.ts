
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: "orculo-financeiro-pupq1",
  appId: "1:163046454291:web:d713efd387c36b5cfcfbe6",
  storageBucket: "orculo-financeiro-pupq1.firebasestorage.app",
  apiKey: "AIzaSyAzNLSMmKp1otPG3b33fzhkqxBf3gY5UdI",
  authDomain: "orculo-financeiro-pupq1.firebaseapp.com",
  messagingSenderId: "163046454291"
};

// Inicializa o Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Usuário logado:', user);
    return user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    throw error;
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Usuário deslogado');
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

export { app, auth, googleProvider, signInWithGoogle, signOut };
