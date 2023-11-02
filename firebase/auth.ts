import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
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
    await signInAnonymously(auth);
  } catch (err) {
    console.error(err);
    return null;
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Unsubscribe immediately to avoid getting called again
      unsubscribe();

      if (user) {
        const uid = user.uid;
        pushUser(uid);
        resolve(uid);
      } else {
        resolve(null);
      }
    });
  });
};
