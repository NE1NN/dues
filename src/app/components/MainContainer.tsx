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

  const selectedCoursesAss = getSelectedAssessments(
    assessments,
    selectedCourses
  );

  return (
    <SelectedCoursesContext.Provider
      value={{ courses, selectedCourses, setSelectedCourses }}
    >
      <section className="flex h-full">
        <div className="flex flex-col">
          <SearchBar></SearchBar>
          <h1 className="font-bold text-black mt-4 text-2xl">
            Upcoming deadlines
          </h1>
          {selectedCoursesAss.map((assessment, idx) => (
            <DueList key={idx} assessment={assessment}></DueList>
          ))}
        </div>
        <CourseListBox></CourseListBox>
      </section>
    </SelectedCoursesContext.Provider>
  );
}
