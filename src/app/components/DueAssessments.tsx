import { AssContainerProps } from '../../../types/types';
import DueList from './DueList';

export default function DueAssessments({ assessments }: AssContainerProps) {
  return (
    <div>
      <h1 className="font-bold text-black mt-4 text-2xl">Due assessments</h1>
      {assessments.map((assessment, idx) => (
        <DueList key={idx} assessment={assessment}></DueList>
      ))}
    </div>
  );
}
