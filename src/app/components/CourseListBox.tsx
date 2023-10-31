'use client';

import { useContext } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';
import CourseList from './CourseList';

export default function CourseListBox() {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      'SelectedCoursesContext must be used within a SelectedCoursesContext.Provider'
    );
  }

  const { selectedCourses } = contextValue;

  return (
    <aside className="w-[30%] bg-green-500 h-full ml-auto flex flex-col p-8 justify-between gap-8">
      {selectedCourses.map((course) => (
        <CourseList key={course.id} course={course}></CourseList>
      ))}
    </aside>
  );
}
