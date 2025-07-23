
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "./firebase";

export const sendAlerts = async (email: string) => {
  try {
    await addDoc(collection(db, "alerts"), {
      email: email,
      timestamp: serverTimestamp(),
    });
    console.log("Alert subscription added for:", email);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
