'use client';

import { Checkbox } from '@mui/material';
import { DueListProps } from '../../../types/types';
import { DateTime } from 'luxon';

export default function DueList({ assessment }: DueListProps) {
  function findDaysDifference(dueDate: string) {
    const dueDateString = DateTime.fromISO(dueDate);
    const today = DateTime.local().startOf('day');
    const daysDifference = Math.round(dueDateString.diff(today, 'days').days);

    return daysDifference;
  }

  function setDueString(days: number) {
    if (days === 0) return 'due today';
    if (days === 1) return 'due tomorrow';
    if (days === -1) return 'due yesterday';

    return days > 0 ? `due in ${days} days` : `due ${Math.abs(days)} days ago`;
  }

  return (
    <div className="flex bg-green-600 rounded-md border-black border items-center h-4/12 py-4 mt-5">
      <Checkbox />
      <div>
        <div className="text-black">
          <strong>{assessment.courseCode} </strong>
          {assessment.assName}
        </div>
        <div className="text-black">
          {setDueString(findDaysDifference(assessment.dueDate))}
        </div>
      </div>
    </div>
  );
}
