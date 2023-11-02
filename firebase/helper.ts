import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './service';

export async function pushClickedCourses(
  userId: string,
  clickedCourses: string[]
) {
  const userRef = doc(db, 'users', userId);

  try {
    await updateDoc(userRef, { clickedCourse: clickedCourses });
    console.log('Clicked courses updated');
  } catch (err) {
    console.error('Clicked courses updated failed');
  }
}

export async function getClickedCourses(userId: string) {
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
