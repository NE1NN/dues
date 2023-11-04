"use client";

import { Checkbox } from "@mui/material";
import { DueListProps } from "../../../types/types";
import { DateTime } from "luxon";
import { useContext } from "react";
import SelectedCoursesContext from "./SelectedCoursesContext";
import { updateUserAssessment } from "../../../firebase/helper";

export default function DueList({ assessment }: DueListProps) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      "SelectedCoursesContext must be used within a SelectedCoursesContext.Provider"
    );
  }

  const { setMutableAssesments, userId } = contextValue;

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    const newStatus = event.target.checked ? "completed" : "incomplete";
    setMutableAssesments((prev) =>
      prev.map((ass) =>
        ass.id === assessment.id
          ? {
              ...ass,
              status: newStatus,
            }
          : ass
      )
    );
    if (userId) {
      await updateUserAssessment(userId, assessment.id, newStatus);
    }
  }

  function findDaysDifference(dueDate: string) {
    const dueDateString = DateTime.fromISO(dueDate);
    const today = DateTime.local().startOf("day");
    const daysDifference = Math.round(dueDateString.diff(today, "days").days);

    return daysDifference;
  }

  function setDueString(days: number) {
    if (days === 0)
      return (
        <span>
          due <span className="text-red-500">today</span>
        </span>
      );
    if (days === 1)
      return (
        <span>
          due <span className="text-red-500">tomorrow</span>
        </span>
      );
    if (days === -1)
      return (
        <span>
          due <span className="text-red-500">yesterday</span>
        </span>
      );

    // For days < 3 and days > 0, apply the text-red-500 class, otherwise text-black
    const dayTextClass = days > 0 && days <= 3 ? "text-red-500" : "text-black";

    return days > 0 ? (
      <span>
        due in <span className={dayTextClass}>{days} days</span>
      </span>
    ) : (
      <span>
        due <span className="text-black">{Math.abs(days)}</span> days ago
      </span>
    );
  }

  return (
    <div
      className="flex bg-green-600 rounded-md border-black border items-center h-4/12 py-4 mt-5"
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        onChange={handleChange}
        checked={assessment.status === "completed" ? true : false}
      />
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
