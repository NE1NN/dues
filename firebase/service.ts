// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA9scfUPsI-UsMLw3xbzujfRYgZyRs3jlI',
  authDomain: 'dues-933b2.firebaseapp.com',
  projectId: 'dues-933b2',
  storageBucket: 'dues-933b2.appspot.com',
  messagingSenderId: '40801663596',
  appId: '1:40801663596:web:263a0081fa7d2477773649',
  measurementId: 'G-Q0NS2TR2X1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
