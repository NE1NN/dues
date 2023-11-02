import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './service';
import { Assessment, AssessmentToPush, Course } from '../types/types';
import { FirebaseError } from 'firebase/app';
import { DateTime } from 'luxon';

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
      if (err instanceof FirebaseError && err.code === 'not-found') {
        // The document doesn't exist, so create it
        await setDoc(userRef, { clickedCourse: clickedCourses });
        console.log('Clicked courses set for new user');
      } else {
        console.error('Clicked courses update failed', err);
      }
    }
  } else {
    console.log('User id null');
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

export async function getUserAssessments(userId: string) {
  const userRef = doc(db, 'users', userId);
  const assCol = collection(userRef, 'assessments');
  const assDocs = await getDocs(assCol);

  const assessments: Assessment[] = assDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Assessment)
  );

  return assessments;
}

function convertTimeToISO(data: AssessmentToPush[]) {
  data.forEach((assignment) => {
    const [day, month, year] = assignment.dueDate.split('/');
    const dt = DateTime.fromObject(
      { day: Number(day), month: Number(month), year: Number(year) },
      { zone: 'Australia/Sydney' }
    );
    if (dt.isValid) {
      assignment.dueDate = dt.toISO() || '';
    } else {
      console.error('Invalid date conversion:', dt.invalidExplanation);
      assignment.dueDate = ''; // or set to some default value
    }
  });
  return data;
}

export async function pushAssessmentNewUser(
  userId: string,
  assessments: Assessment[]
) {
  const userRef = doc(db, 'users', userId);
  const assCol = collection(userRef, 'assessments');

  await Promise.all(
    assessments.map(async (assessment) => {
      try {
        const docRef = await addDoc(assCol, assessment);
        console.log('Assessment written to new user with ID: ', docRef.id);
      } catch (err) {
        console.error(err);
      }
    })
  );
}

// export async function pushUserAssessments(
//   userId: string,
//   assessments: Assessment[]
// ) {
//   const userRef = doc(db, 'users', userId);
//   const assCol = collection(userRef, 'assessments');
//   const converted =
// }
