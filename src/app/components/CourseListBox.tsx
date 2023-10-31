'use client';

import { useContext } from 'react';
import { CourseListParams } from '../../../types/types';
import SelectedCoursesContext from './SelectedCoursesContext';
import CourseList from './CourseList';

export default function CourseListBox({ courses }: CourseListParams) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      'SelectedCoursesContext must be used within a SelectedCoursesContext.Provider'
    );
  }

  const { selectedCourses } = contextValue;

  return (
    <aside className="w-[30%] bg-green-500 h-full ml-auto flex flex-col">
      {selectedCourses.map((course) => (
        <CourseList key={course.id} course={course}></CourseList>
      ))}
    </aside>
  );
}
