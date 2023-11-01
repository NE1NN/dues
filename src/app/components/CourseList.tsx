import { MouseEvent, useContext } from 'react';
import { CourseListProps } from '../../../types/types';
import SelectedCoursesContext from './SelectedCoursesContext';

export default function CourseList({ course }: CourseListProps) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      'SelectedCoursesContext must be used within a SelectedCoursesContext.Provider'
    );
  }

  const { setClickedCourse } = contextValue;

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setClickedCourse(course.courseCode);
  }

  return (
    <div
      className="w-full bg-green-600 flex-1 text-black flex items-center pl-8 cursor-pointer hover:bg-green-700 transition ease-in-out"
      onClick={(e) => handleClick(e)}
    >
      {course.courseCode} <br></br>
      {course.courseName}
    </div>
  );
}
