import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';
import SearchBar from './components/SearchBar';
import DueList from './components/DueList';
import { Course, CourseToPush } from '../../types/types';
import CourseListBox from './components/CourseListBox';
import MainContainer from './components/MainContainer';
import { data } from '../../firebase/data';
import { DateTime } from 'luxon';

export async function getCourses() {
  const coursesCollection = collection(db, 'courses');
  const courseDocs = await getDocs(coursesCollection);

  const courses: Course[] = courseDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Course)
  );

  return courses;
}

function convertTimeToISO(data: CourseToPush[]) {
  data.forEach((course) => {
    course.assessmentItems.forEach((item) => {
      const [day, month, year] = item.dueDate.split('/');
      const dt = DateTime.fromObject(
        { day: Number(day), month: Number(month), year: Number(year) },
        { zone: 'Australia/Sydney' }
      );
      if (dt.isValid) {
        item.dueDate = dt.toISO() || '';
      } else {
        console.error('Invalid date conversion:', dt.invalidExplanation);
        item.dueDate = ''; // or set to some default value
      }
    });
  });
  console.log(data);
  return data;
}

export async function pushCourses() {
  const coursesCol = collection(db, 'courses');
  const converted = convertTimeToISO(data);

  console.log(converted);

  await Promise.all(
    converted.map(async (course) => {
      try {
        const docRef = await addDoc(coursesCol, course);
        console.log('Document written with ID: ', docRef.id);
      } catch (err) {
        console.error(err);
      }
    })
  );
}

export default async function Home() {
  // pushCourses();
  const courses = await getCourses();
  return (
    <main className="bg-white h-screen px-52 py-20">
      <MainContainer courses={courses}></MainContainer>
    </main>
  );
}
