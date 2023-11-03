"use client";

import { MouseEvent, useContext } from "react";
import SelectedCoursesContext from "./SelectedCoursesContext";
import CourseList from "./CourseList";
import { CourseListBoxProps } from "../../../types/types";
import { LockOpen } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

export default function CourseListBox({
  isLocked,
  setIsLocked,
}: CourseListBoxProps) {
  const contextValue = useContext(SelectedCoursesContext);

  if (!contextValue) {
    throw new Error(
      "SelectedCoursesContext must be used within a SelectedCoursesContext.Provider"
    );
  }

  function handleLockClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsLocked((prev) => !prev);
  }

  const { selectedCourses } = contextValue;

  return (
<aside className="w-full lg:w-[30%] bg-white h-full ml-auto mr-auto lg:mr-0 flex flex-col p-8 justify-between gap-8 relative border-2 rounded-lg border-green-500 text-sm lg:mx-auto">
      <div
        className="absolute right-[-10px] top-[-10px] cursor-pointer bg-green-600 rounded-full w-9 h-9 flex items-center justify-center hover:opacity-60"
        onClick={(e) => handleLockClick(e)}
      >
        {isLocked ? (
          <LockIcon style={{ color: "white" }}></LockIcon>
        ) : (
          <LockOpen style={{ color: "white" }}></LockOpen>
        )}
      </div>
      {selectedCourses.map((course) => (
        <CourseList key={course.id} course={course}></CourseList>
      ))}
    </aside>
  );
}
