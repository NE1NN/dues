import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './service';
import { Course } from '../types/types';
import { FirebaseError } from 'firebase/app';

export async function pushSelectedCourses(
  userId: string | null,
  clickedCourses: Course[]
) {
  if (userId) {
    const userRef = doc(db, 'users', userId);

    try {
      await updateDoc(userRef, { clickedCourse: clickedCourses });
      console.log('Clicked courses updated');
    } catch (err) {
      if (err instanceof FirebaseError && err.code === "not-found") {
        // The document doesn't exist, so create it
        await setDoc(userRef, { clickedCourse: clickedCourses });
        console.log('Clicked courses set for new user');
      } else {
        console.error('Clicked courses update failed', err);
      }
    }
  } else {
    console.log('User id null')
  }
}

export async function getSelectedCourses(
  userId: string
): Promise<Course[] | null> {
  const userRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData?.clickedCourse;
    } else {
      console.warn('Document does not exist');
      return null;
    }
  } catch (err) {
    console.error('Failed to get clicked courses:', err);
    return null;
  }
}
