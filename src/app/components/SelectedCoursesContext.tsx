import { createContext } from 'react';
import { SelectedCoursesContextType } from '../../../types/types';

const SelectedCoursesContext = createContext<
  SelectedCoursesContextType | undefined
>(undefined);

export default SelectedCoursesContext;
