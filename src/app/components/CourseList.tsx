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

  const { clickedCourse, setClickedCourse } = contextValue;

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setClickedCourse(course.courseCode);
  }

  return (
    <div
      className={`w-full text-lg ${
        clickedCourse === course.courseCode
          ? `bg-green-1000 text-white`
          : `bg-green-600`
      } text-center flex-1 text-black flex flex-col justify-center items-center cursor-pointer hover:bg-opacity-80 hover:bg-green-1000 hover:text-white transition ease-in-out rounded-lg`}
      onClick={(e) => handleClick(e)}
    >
      <strong>{course.courseCode}</strong>
      <div>{course.courseName}</div>
    </div>
  );
}
