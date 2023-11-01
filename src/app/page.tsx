import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/service';
import SearchBar from './components/SearchBar';
import DueList from './components/DueList';
import {
	Assessment,
	AssessmentToPush,
	Course,
	CourseToPush,
} from '../../types/types';
import CourseListBox from './components/CourseListBox';
import MainContainer from './components/MainContainer';
import { assessments, data } from '../../firebase/data';
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

export async function getAssessments() {
	const assCollection = collection(db, 'assessments');
	const assDocs = await getDocs(assCollection);

	const assessments: Assessment[] = assDocs.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			} as Assessment)
	);

	return assessments;
}

function convertTimeToISO(data: AssessmentToPush[]) {
	data.forEach((assignment) => {
		const [day, month, year] = assignment.dueDate.split('/');
		const dt = DateTime.fromObject(
			{ day: Number(day), month: Number(month), year: Number(year) },
			{ zone: 'Australia/Sydney' }
		);
		if (dt.isValid) {
			assignment.dueDate = dt.toISO() || '';
		} else {
			console.error('Invalid date conversion:', dt.invalidExplanation);
			assignment.dueDate = ''; // or set to some default value
		}
	});
	return data;
}

export async function pushCourses() {
	const coursesCol = collection(db, 'courses');

	await Promise.all(
		data.map(async (course) => {
			try {
				const docRef = await addDoc(coursesCol, course);
				console.log('Document written with ID: ', docRef.id);
			} catch (err) {
				console.error(err);
			}
		})
	);
}

export async function pushAssessments() {
	const assCol = collection(db, 'assessments');
	const converted = convertTimeToISO(assessments);

	await Promise.all(
		converted.map(async (course) => {
			try {
				const docRef = await addDoc(assCol, course);
				console.log('Document written with ID: ', docRef.id);
			} catch (err) {
				console.error(err);
			}
		})
	);
}

export default async function Home() {
	// pushCourses();
	// pushAssessments();
	const courses = await getCourses();
	const assessments = await getAssessments();

	return (
		<main className="bg-white h-screen">
			<MainContainer
				courses={courses}
				assessments={assessments}
			></MainContainer>
		</main>
	);
}
