import { getDatabase, ref, set } from 'firebase/database';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';

export const data = [
  // {
  //   courseCode: 'COMP1511',
  //   assessmentItems: [
  //     {
  //       assName: 'Problem sets',
  //       weight: 15,
  //       startWeek: 2,
  //       endWeek: 10,
  //       dueDate: '17/11/2023',
  //       status: 'ongoing',
  //     },
  //     {
  //       assName: 'Assignment 1',
  //       weight: 20,
  //       startWeek: 4,
  //       endWeek: 7,
  //       dueDate: '17/10/2023',
  //       status: 'ongoing',
  //     },
  //     {
  //       assName: 'Assignment 2',
  //       weight: 25,
  //       startWeek: 7,
  //       endWeek: 10,
  //       dueDate: '17/11/2023',
  //       status: 'not started',
  //     },
  //     {
  //       assName: 'Final Exam',
  //       weight: 40,
  //       startWeek: 1,
  //       endWeek: 11,
  //       dueDate: '30/10/2023',
  //       status: 'not started',
  //     },
  //   ],
  //   progress: 30,
  //   totalCourseMark: 25,
  // },
  {
    courseCode: 'COMP1521',
    assessmentItems: [
      {
        assName: 'Labs',
        weight: 15,
        startWeek: 3,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Tests',
        weight: 10,
        startWeek: 3,
        endWeek: 10,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignment 1',
        weight: 30,
        startWeek: 7,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Assignment 2',
        weight: 30,
        startWeek: 7,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Final Exam',
        weight: 45,
        startWeek: 1,
        endWeek: 11,
        dueDate: '30/10/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
  {
    courseCode: 'COMP1531',
    assessmentItems: [
      {
        assName: 'Individual Project',
        weight: 30,
        startWeek: 11,
        endWeek: 11,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Major Group Project',
        weight: 60,
        startWeek: 2,
        endWeek: 10,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Labs',
        weight: 10,
        startWeek: 2,
        endWeek: 9,
        dueDate: '17/11/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
  {
    courseCode: 'COMP2511',
    assessmentItems: [
      {
        assName: 'Coursework',
        weight: 15,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Final Exam',
        weight: 50,
        startWeek: 11,
        endWeek: 11,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignment 1 - Object-Oriented Design',
        weight: 15,
        startWeek: 5,
        endWeek: 5,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Assignment 2 - Refactoring & Design Patterns',
        weight: 20,
        startWeek: 9,
        endWeek: 9,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Final Exam',
        weight: 45,
        startWeek: 11,
        endWeek: 11,
        dueDate: '17/11/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
  {
    courseCode: 'COMP2521',
    assessmentItems: [
      {
        assName: 'Assignment 1 - Trees',
        weight: 15,
        startWeek: 4,
        endWeek: 7,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignment 2 - Graphs',
        weight: 15,
        startWeek: 7,
        endWeek: 10,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Labs',
        weight: 15,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Quizzes',
        weight: 10,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Final Exam',
        weight: 45,
        startWeek: 11,
        endWeek: 11,
        dueDate: '17/11/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
  {
    courseCode: 'COMP3121',
    assessmentItems: [
      {
        assName: 'Take-home quiz',
        weight: 5,
        startWeek: 1,
        endWeek: 7,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Assignments',
        weight: 45,
        startWeek: 1,
        endWeek: 9,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Final Exam',
        weight: 50,
        startWeek: 11,
        endWeek: 11,
        dueDate: '17/11/2023',
        status: 'not started',
      },
    ],
    progress: 30,
    totalCourseMark: 25,
  },
  {
    courseCode: 'COMP3900',
    assessmentItems: [
      {
        assName: 'Proposal',
        weight: 10,
        startWeek: 1,
        endWeek: 3,
        dueDate: '17/11/2023',
        status: 'ongoing',
      },
      {
        assName: 'Progress Checkpoints',
        weight: 10,
        startWeek: 1,
        endWeek: 8,
        dueDate: '17/10/2023',
        status: 'ongoing',
      },
      {
        assName: 'Final Project Demo',
        weight: 20,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Project Report',
        weight: 20,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Software Quality',
        weight: 20,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
        status: 'not started',
      },
      {
        assName: 'Participatin & Peer Assessment',
        weight: 20,
        startWeek: 1,
        endWeek: 10,
        dueDate: '17/11/2023',
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
