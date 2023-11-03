import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';
import { error } from 'console';
import { FirebaseError } from 'firebase/app';

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
};

export const upgradeAnonymousToGoogle = async () => {
  const auth = getAuth();
  if (auth.currentUser && auth.currentUser.isAnonymous) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const credential = GoogleAuthProvider.credential()
      console.log(credential)
      if (credential) {
        await linkWithCredential(auth.currentUser, credential);
        console.log('Anonymous account upgraded to Google');
      } else {
        console.log('Anonymous account failed to upgrade to Google');
      }
    } catch (err) {
      console.error(err);
      // if (err instanceof FirebaseError) {
      //   if (
      //     err.code === 'auth/credential-already-in-use' ||
      //     err.code === 'auth/email-already-in-use'
      //   ) {
      //     const methods = await fetchSignInMethodsForEmail(auth, err.email);
      //     if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
      //       await signInWithPopup(auth, provider);
      //       console.log('User signed in with existing account');
      //     } else {
      //       console.log('This email is associated with another sign-in method');
      //     }
      //   } else {
      //     console.error('Error upgrading anonymous account', err);
      //   }
      // }
    }
  } else {
    console.log('No anonymous user to upgrade');
  }
};
