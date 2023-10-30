import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import SearchBar from './components/SearchBar';

type Course = {
  id: string;
  name: string;
};

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

export default async function Home() {
  const courses = await getCourses();

  const movies = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  return (
    <main className="bg-white h-screen">
      <SearchBar></SearchBar>
      {courses.map((course) => (
        <div key={course.id}>{course.name}</div>
      ))}
    </main>
  );
}
