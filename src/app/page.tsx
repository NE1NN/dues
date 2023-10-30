import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';

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
    <main className="flex min-h-screen items-center justify-between p-24">
      {courses.map((course) => (
        <div key={course.id}>{course.name}</div>
      ))}
    </main>
  );
}
