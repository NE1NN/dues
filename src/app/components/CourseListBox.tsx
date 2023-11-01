'use client';

import { useContext } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';
import CourseList from './CourseList';
import { CourseListBoxProps } from '../../../types/types';
import { LockOpen } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';

export default function CourseListBox({
  isLocked,
  setIsLocked,
}: CourseListBoxProps) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      'SelectedCoursesContext must be used within a SelectedCoursesContext.Provider'
    );
  }

  function handleLockClick() {
    setIsLocked((prev) => !prev);
  }

  const { selectedCourses } = contextValue;

  return (
    <aside className="w-[30%] bg-green-500 h-full ml-auto flex flex-col p-8 justify-between gap-8 relative">
      <div
        className="absolute right-0 top-0 cursor-pointer"
        onClick={handleLockClick}
      >
        {isLocked ? <LockIcon></LockIcon> : <LockOpen></LockOpen>}
      </div>
      {selectedCourses.map((course) => (
        <CourseList key={course.id} course={course}></CourseList>
      ))}
    </aside>
  );
}
