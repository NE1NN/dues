import { AssessmentToPush,  CourseToPush } from '../types/types';

export const data: CourseToPush[] = [];

export const assessments: AssessmentToPush[] = [];

export const returnData = () => {
	return data;
};

export const returnAssesments = () => {
	return assessments;
};
