import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, linkWithCredential } from 'firebase/auth';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';

const pushUser = async (userId: string) => {
  const userCol = collection(db, 'users');

  try {
    const docRef = await addDoc(userCol, { userId });
    console.log('User written with ID: ' + docRef.id);
  } catch (err) {
    console.error(err);
  }
};

export const signInAnonymous = async (): Promise<string | null> => {
  const auth = getAuth();

  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid;
  } catch (err) {
    console.error(err);
    return null;
  }
}
