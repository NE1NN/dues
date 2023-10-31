import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';
import SearchBar from './components/SearchBar';
import DueList from './components/DueList';
import { Course } from '../../types/types';
import CourseListBox from './components/CourseListBox';
import MainContainer from './components/MainContainer';

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

// export async function pushCourses() {
//   const coursesCol = collection(db, 'courses');

//   data.forEach(async (course) => {
//     try {
//       const docRef = await addDoc(coursesCol, course);
//       console.log('Document written with ID: ', docRef.id);
//     } catch (err) {
//       console.error(err);
//     }
//   });
// }

export default async function Home() {
  const courses = await getCourses();
  return (
    <main className="bg-white h-screen px-52 py-20">
      <MainContainer courses={courses}></MainContainer>
    </main>
  );
}
