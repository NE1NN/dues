import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import SearchBar from './components/SearchBar';
import DueList from './components/DueList';

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
  return (
    <main className="bg-white h-screen px-52 py-20">
      <section className="flex h-full">
        <div className="flex flex-col">
          <SearchBar courses={courses}></SearchBar>
          <h1 className="font-bold text-black mt-4 text-2xl">
            Upcoming deadlines
          </h1>
          <DueList></DueList>
        </div>
        <aside className="w-[30%] bg-green-500 h-full ml-auto"></aside>
      </section>
    </main>
  );
}
