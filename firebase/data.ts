import { getDatabase, ref, set } from 'firebase/database';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';

export const data = [
  {
    courseCode: 'COMP1511',
    courseName: 'Programming Fundamentals',
    assessmentItems: [
      {
        assName: 'Problem sets',
        weight: 15,
        startWeek: 2,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignment 1',
        weight: 20,
        startWeek: 4,
        endWeek: 7,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignment 2',
        weight: 25,
        startWeek: 7,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Final Exam',
        weight: 40,
        startWeek: 1,
        endWeek: 11,
        dueDate: '30/10/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
];

const coursesCol = collection(db, 'courses');

data.forEach(async (course) => {
  try {
    const docRef = await addDoc(coursesCol, course);
    console.log('Document written with ID: ', docRef.id);
  } catch (err) {
    console.error(err);
  }
});
