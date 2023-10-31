export type Course = {
  id: string;
  name: string;
  courseCode: string;
};

export type SearchBarParams = {
  courses: Course[];
};
