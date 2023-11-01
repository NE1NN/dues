'use client';

import {
  Assessment,
  Course,
  MainContainerProps,
  SelectedCoursesContextType,
} from '../../../types/types';
import CourseListBox from './CourseListBox';
import DueList from './DueList';
import SearchBar from './SearchBar';
import { createContext, useContext, useState } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';
import UpcomingAssessments from './UpcomingAssessments';
import DueAssessments from './DueAssessments';
import CompletedAssessments from './CompletedAssessments';

export default function MainContainer({
  courses,
  assessments,
}: MainContainerProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [mutableAssessments, setMutableAssesments] = useState(assessments);
  const [clickedCourse, setClickedCourse] = useState('');

  function getSelectedAssessments(
    assessments: Assessment[],
    selectedCourses: Course[]
  ): Assessment[] {
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
  }

  function getUpcomingAssessments(assessments: Assessment[]): Assessment[] {
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
  }

  function getDueAssessments(assessments: Assessment[]): Assessment[] {
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
  }

  function getCompletedAssessments(assessments: Assessment[]): Assessment[] {
    const filteredAss = assessments.filter(
      (assessment) => assessment.status === 'completed'
    );

    return filteredAss;
  }

  const selectedCoursesAss = getSelectedAssessments(
    mutableAssessments,
    selectedCourses
  );
  const upcomingAss = getUpcomingAssessments(selectedCoursesAss);
  const dueAss = getDueAssessments(selectedCoursesAss);
  const completedAss = getCompletedAssessments(selectedCoursesAss);

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
      }}
    >
      <section className="flex h-full" onClick={() => setClickedCourse('')}>
        <div className="flex flex-col">
          <SearchBar></SearchBar>
          <CompletedAssessments
            assessments={completedAss}
          ></CompletedAssessments>
          <DueAssessments assessments={dueAss}></DueAssessments>
          <UpcomingAssessments assessments={upcomingAss}></UpcomingAssessments>
        </div>
        <CourseListBox></CourseListBox>
      </section>
    </SelectedCoursesContext.Provider>
  );
}
