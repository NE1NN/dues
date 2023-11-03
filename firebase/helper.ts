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

export async function pushAssessmentNewUser(
  userId: string,
  assessments: Assessment[]
) {
  const userRef = doc(db, 'users', userId);
  const assCol = collection(userRef, 'assessments');

  await Promise.all(
    assessments.map(async (assessment) => {
      const assDocRef = doc(userRef, 'assessments', assessment.id);
      try {
        await setDoc(assDocRef, assessment);
        console.log(
          'Assessment written to new user with ID: ',
          assDocRef.id,
          'userid',
          userId
        );
      } catch (err) {
        console.error(err);
      }
    })
  );
}

export async function getUserAssessments(userId: string) {
  const userRef = doc(db, 'users', userId);
  const assCol = collection(userRef, 'assessments');

  try {
    const assDocs = await getDocs(assCol);

    if (!assDocs.empty) {
      const assessments: Assessment[] = [];
      assDocs.forEach((doc) => {
        const assessment = doc.data() as Assessment;
        assessments.push(assessment);
      });
      return assessments;
    } else {
      console.warn('No assessments found for user');
      return null;
    }
  } catch (err) {
    console.error('Failed to get assessments' + err);
    return null;
  }
}

export async function updateUserAssessment(
  userId: string,
  assessmentId: string,
  status: 'completed' | 'incomplete'
) {
  const userRef = doc(db, 'users', userId);
  const assessmentDoc = doc(userRef, 'assessments', assessmentId);
  console.log(assessmentId);

  try {
    await updateDoc(assessmentDoc, {
      status: status,
    });
    console.log('Assessment status updated successfully');
  } catch (err) {
    console.error('Error updating assessment status: ', err);
  }
}
