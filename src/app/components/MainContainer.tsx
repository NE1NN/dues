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

    // Sorts based on due date and returns the result
    return filteredAssessments.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  function getUpcomingAssessments(assessments: Assessment[]): Assessment[] {
    const today = new Date();
    // Set the time to midnight to only compare by date
    today.setHours(0, 0, 0, 0);

    return assessments.filter(
      (assessment) => new Date(assessment.dueDate) >= today
    );
  }

  const selectedCoursesAss = getSelectedAssessments(
    assessments,
    selectedCourses
  );

  const upcomingAss = getUpcomingAssessments(selectedCoursesAss);

  return (
    <SelectedCoursesContext.Provider
      value={{ courses, selectedCourses, setSelectedCourses }}
    >
      <section className="flex h-full">
        <div className="flex flex-col">
          <SearchBar></SearchBar>
          <UpcomingAssessments upcomingAss={upcomingAss}></UpcomingAssessments>
        </div>
        <CourseListBox></CourseListBox>
      </section>
    </SelectedCoursesContext.Provider>
  );
}
