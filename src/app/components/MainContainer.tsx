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

export default function MainContainer({
  courses,
  assessments,
}: MainContainerProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  function getSelectedAssessments(
    assessments: Assessment[],
    selectedCourses: Course[]
  ): Assessment[] {
    // Filters the assessments based on selected courses
    const filteredAssessments = assessments.filter((assessment) =>
      selectedCourses.some(
        (course) => course.courseCode === assessment.courseCode
      )
    );

    return filteredAssessments;
  }

  function getUpcomingAssessments(assessments: Assessment[]): Assessment[] {
    const today = new Date();
    // Set the time to midnight to only compare by date
    today.setHours(0, 0, 0, 0);

    const filteredAss = assessments.filter(
      (assessment) => new Date(assessment.dueDate) >= today
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
      (assessment) => new Date(assessment.dueDate) < today
    );

    return filteredAss.sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
  }

  const selectedCoursesAss = getSelectedAssessments(
    assessments,
    selectedCourses
  );

  const upcomingAss = getUpcomingAssessments(selectedCoursesAss);
  const dueAss = getDueAssessments(selectedCoursesAss);

  return (
    <SelectedCoursesContext.Provider
      value={{ courses, selectedCourses, setSelectedCourses }}
    >
      <section className="flex h-full">
        <div className="flex flex-col">
          <SearchBar></SearchBar>
          <DueAssessments assessments={dueAss}></DueAssessments>
          <UpcomingAssessments assessments={upcomingAss}></UpcomingAssessments>
        </div>
        <CourseListBox></CourseListBox>
      </section>
    </SelectedCoursesContext.Provider>
  );
}
