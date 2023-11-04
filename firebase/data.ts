import { getDatabase, ref, set } from 'firebase/database';
import { db } from './service';
import { addDoc, collection } from 'firebase/firestore';

export const data: any = [];

export const assessments: any = [];

export const returnData = () => {
	return data;
};

export const returnAssesments = () => {
	return assessments;
};
