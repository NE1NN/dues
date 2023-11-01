import { getDatabase, ref, set } from 'firebase/database';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';

export const data = [
  {
    courseCode: 'COMP1511',
    courseName: 'Programming Fundamentals',
    progress: 30,
    totalCourseMark: 25,
  },
];

export const assessments = [
  {
    assName: 'Problem sets',
    weight: 15,
    startWeek: 2,
    endWeek: 10,
    dueDate: '17/11/2023',
    status: 'ongoing',
    courseCode: 'COMP1511',
  },
  {
    assName: 'Assignment 1',
    weight: 20,
    startWeek: 4,
    endWeek: 7,
    dueDate: '17/10/2023',
    status: 'ongoing',
    courseCode: 'COMP1511',
  },
  {
    assName: 'Assignment 2',
    weight: 25,
    startWeek: 7,
    endWeek: 10,
    dueDate: '17/11/2023',
    status: 'not started',
    courseCode: 'COMP1511',
  },
  {
    assName: 'Final Exam',
    weight: 40,
    startWeek: 1,
    endWeek: 11,
    dueDate: '30/10/2023',
    status: 'not started',
    courseCode: 'COMP1511',
  },
];
