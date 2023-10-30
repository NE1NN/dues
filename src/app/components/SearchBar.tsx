'use client';

import { Autocomplete, TextField } from '@mui/material';
import { Course, SearchBarParams } from '../../../types/types';

export default function SearchBar({ courses }: SearchBarParams) {
  // const courses = ['COMP1511', 'COMP1521', 'COMP1531'];
  const courseList = courses.map((course) => course.name);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={courseList}
      sx={{ width: '40vw' }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Course" />
      )}
    />
  );
}
