'use client';

import {
  Course,
  MainContainerParams,
  SelectedCoursesContextType,
} from '../../../types/types';
import CourseListBox from './CourseListBox';
import DueList from './DueList';
import SearchBar from './SearchBar';
import { createContext, useContext, useState } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';

export default function MainContainer({ courses }: MainContainerParams) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

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
          {/* Maps each assessment */}
          {selectedCourses.map((course) =>
            course.assessmentItems.map((assessment, idx) => (
              <DueList
                key={`assessment${idx}`}
                assessment={assessment}
                courseCode={course.courseCode}
              ></DueList>
            ))
          )}
        </div>
        <CourseListBox></CourseListBox>
      </section>
    </SelectedCoursesContext.Provider>
  );
}
