import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function getExemplos(uid: string) {
  const exemplosRef = collection(db, "users", uid, "exemplos");
  const snapshot = await getDocs(exemplosRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addExemplo(uid: string, exemplo: { title: string, description: string, example: string }) {
  const exemplosRef = collection(db, "users", uid, "exemplos");
  await addDoc(exemplosRef, exemplo);
}