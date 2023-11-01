'use client';

import { MouseEvent, useContext } from 'react';
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

  function handleLockClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsLocked((prev) => !prev);
  }

  const { selectedCourses } = contextValue;

  return (
    <aside className="w-[30%] bg-green-500 h-full ml-auto flex flex-col p-8 justify-between gap-8 relative">
      <div
        className="absolute right-[-10px] top-[-10px] cursor-pointer bg-black rounded-full w-9 h-9 flex items-center justify-center"
        onClick={(e) => handleLockClick(e)}
      >
        {isLocked ? (
          <LockIcon style={{ color: '#a3b18a' }}></LockIcon>
        ) : (
          <LockOpen></LockOpen>
        )}
      </div>
      {selectedCourses.map((course) => (
        <CourseList key={course.id} course={course}></CourseList>
      ))}
    </aside>
  );
}
