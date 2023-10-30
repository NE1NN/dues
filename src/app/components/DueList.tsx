'use client';

import { Checkbox } from '@mui/material';

export default function DueList() {
  return (
    <div className="flex bg-green-600 rounded-md border-black border items-center h-4/12 py-4 mt-5">
      <Checkbox />
      <div className="text-black">Assignment due in 1 minute</div>
    </div>
  );
}
