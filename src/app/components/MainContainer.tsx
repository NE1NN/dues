'use client';

import { Assessment, Course, MainContainerProps } from '../../../types/types';
import CourseListBox from './CourseListBox';
import SearchBar from './SearchBar';
import Pdf from './Pdf';
import { useEffect, useState } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';
import UpcomingAssessments from './UpcomingAssessments';
import DueAssessments from './DueAssessments';
import CompletedAssessments from './CompletedAssessments';
import { signInAnonymous } from '../../../firebase/auth';
import {
  getSelectedCourses,
  getUserAssessments,
  pushAssessmentNewUser,
} from '../../../firebase/helper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import useMediaQuery from '@mui/material/useMediaQuery';

export default function MainContainer({
  courses,
  assessments,
}: MainContainerProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [mutableAssessments, setMutableAssesments] = useState(assessments);
  const [clickedCourse, setClickedCourse] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const getSelectedAssessments = (
    assessments: Assessment[],
    selectedCourses: Course[]
  ): Assessment[] => {
    // Filters the assessments based on selected courses
    let filteredAssessments = assessments.filter((assessment) =>
      selectedCourses.some(
        (course) => course.courseCode === assessment.courseCode
      )
    );

    if (clickedCourse !== '') {
      filteredAssessments = filteredAssessments.filter(
        (assessment) => assessment.courseCode === clickedCourse
      );
    }

    return filteredAssessments;
  };

  const getUpcomingAssessments = (assessments: Assessment[]): Assessment[] => {
    const today = new Date();
    // Set the time to midnight to only compare by date
    today.setHours(0, 0, 0, 0);

    const filteredAss = assessments.filter(
      (assessment) =>
        new Date(assessment.dueDate) >= today &&
        assessment.status !== 'completed'
    );

    return filteredAss.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  };

  const getDueAssessments = (assessments: Assessment[]): Assessment[] => {
    const today = new Date();
    // Set the time to midnight to only compare by date
    today.setHours(0, 0, 0, 0);

    const filteredAss = assessments.filter(
      (assessment) =>
        new Date(assessment.dueDate) < today &&
        assessment.status !== 'completed'
    );

    return filteredAss.sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
  };

  const getCompletedAssessments = (assessments: Assessment[]): Assessment[] => {
    const filteredAss = assessments.filter(
      (assessment) => assessment.status === 'completed'
    );

    return filteredAss;
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUserId(uid);

        // Get assessments from the database
        const userAssessments = await getUserAssessments(uid);
        if (userAssessments) {
          setMutableAssesments(userAssessments);
        }
      } else {
        // User not signed in
        const uid = await signInAnonymous();
        if (uid) {
          setUserId(uid);
          await pushAssessmentNewUser(uid, assessments);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [assessments]);

  useEffect(() => {
    async function getInitialSelectedCourses(userId: string | null) {
      if (userId) {
        const initialSelectedCourses = await getSelectedCourses(userId);
        if (initialSelectedCourses) {
          setSelectedCourses(initialSelectedCourses);
        }
      }
    }
    getInitialSelectedCourses(userId);
  }, [userId]);

  const selectedCoursesAss = getSelectedAssessments(
    mutableAssessments,
    selectedCourses
  );
  const upcomingAss = getUpcomingAssessments(selectedCoursesAss);
  const dueAss = getDueAssessments(selectedCoursesAss);
  const completedAss = getCompletedAssessments(selectedCoursesAss);
  const isPhoneScreen = useMediaQuery('(max-width:1023px)'); // Define your breakpoint accordingly

  return (
    <SelectedCoursesContext.Provider
      value={{
        courses,
        selectedCourses,
        setSelectedCourses,
        mutableAssessments,
        setMutableAssesments,
        clickedCourse,
        setClickedCourse,
        userId,
      }}
    >
      {/* Phone Screen Layout */}
      {isPhoneScreen ? (
        <section
          className="flex mx-auto h-full pb-8"
          onClick={() => setClickedCourse('')}
        >
          <div className="flex flex-col gap-5 mx-auto h-full px-4 py-10 pb-8">
            <SearchBar isLocked={isLocked}></SearchBar>
            <Pdf />
            <CourseListBox
              setIsLocked={setIsLocked}
              isLocked={isLocked}
            ></CourseListBox>
            <UpcomingAssessments
              assessments={upcomingAss}
            ></UpcomingAssessments>
            <CompletedAssessments
              assessments={completedAss}
            ></CompletedAssessments>
            <DueAssessments assessments={dueAss}></DueAssessments>
            <div className="py-4"></div>
          </div>
        </section>
      ) : (
        // Default Layout
        <section
          className="flex mx-auto h-full px-52 py-20 pb-8"
          onClick={() => setClickedCourse('')}
        >
          <div className="flex flex-col gap-5">
            <SearchBar isLocked={isLocked}></SearchBar>
            <Pdf />
            <UpcomingAssessments
              assessments={upcomingAss}
            ></UpcomingAssessments>
            <CompletedAssessments
              assessments={completedAss}
            ></CompletedAssessments>
            <DueAssessments assessments={dueAss}></DueAssessments>
            <div className="h-4 py-4"></div>
          </div>
          <div className="my-4"></div>
          <CourseListBox
            setIsLocked={setIsLocked}
            isLocked={isLocked}
          ></CourseListBox>
          <div className="h-4 my-4"></div>
        </section>
      )}
    </SelectedCoursesContext.Provider>
  );
}
