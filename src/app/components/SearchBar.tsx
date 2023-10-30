'use client';

import { Autocomplete, TextField } from '@mui/material';

export default function SearchBar() {
  const courses = ['COMP1511', 'COMP1521', 'COMP1531'];

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={courses}
      sx={{ width: '40vw' }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Course" />
      )}
    />
  );
}
