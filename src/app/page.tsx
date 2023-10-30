import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';

export async function getCourses() {
  const coursesCollection = collection(db, 'courses');
  const courseDocs = await getDocs(coursesCollection);

  const courses = courseDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return courses;
}

export default async function Home() {
  const courses = await getCourses();
  console.log(courses);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Helloy
    </main>
  );
}
