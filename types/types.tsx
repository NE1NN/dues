export type Course = {
  id: string;
  name: string;
  courseCode: string;
};

export type MainContainerParams = {
  courses: Course[];
};

export type SelectedCoursesContextType = {
  courses: Course[];
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
};

export type CourseListProps = {
  course: Course;
};
