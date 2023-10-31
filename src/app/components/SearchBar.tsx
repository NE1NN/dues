'use client';

import { Autocomplete, TextField } from '@mui/material';
import { Course, SearchBarParams } from '../../../types/types';
import { useContext } from 'react';
import SelectedCoursesContext from './SelectedCoursesContext';

export default function SearchBar({ courses }: SearchBarParams) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      'SelectedCoursesContext must be used within a SelectedCoursesContext.Provider'
    );
  }

  const { setSelectedCourses } = contextValue;

  const courseList = courses.map((course) => course.courseCode);

  return (
    <Autocomplete
      disablePortal
      multiple
      id="combo-box-demo"
      options={courseList}
      sx={{ width: '40vw' }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Course" />
      )}
      onChange={(event, value) => {
        // Filters the courses so that it contains the values
        // inside the input
        const filteredCourses = courses.filter((course) =>
          value.includes(course.courseCode)
        );

        setSelectedCourses(filteredCourses);
      }}
    />
  );
}
