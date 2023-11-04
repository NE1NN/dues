'use client';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';
import { data, assessments } from '../../../firebase/data';

export default function Pdf() {
	const [rawData, setRawData] = useState<File>();

	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});

	const replaceNotApplicableWithWeek = (str: string) => {
		const randomNumber = Math.floor(Math.random() * 10) + 1;
		while (str.includes('Not Applicable')) {
			str = str.replace('Not Applicable', 'Week ' + randomNumber.toString());
		}

		return str;
	};

	const replaceWeekWithDate = (str: string) => {
		const weekDates: Record<string, string> = {
			'Week 10': '14/11/2023 11:59PM',
			'Week 1': '12/9/2023 11:59PM',
			'Week 2': '19/9/2023 11:59PM',
			'Week 3': '26/9/2023 11:59PM',
			'Week 4': '3/10/2023 11:59PM',
			'Week 5': '10/10/2023 11:59PM',
			'Week 6': '17/10/2023 11:59PM',
			'Week 7': '24/10/2023 11:59PM',
			'Week 8': '31/10/2023 11:59PM',
			'Week 9': '7/11/2023 11:59PM',
			'week 10': '14/11/2023 11:59PM',
			'week 1': '12/9/2023 11:59PM',
			'week 2': '19/9/2023 11:59PM',
			'week 3': '26/9/2023 11:59PM',
			'week 4': '3/10/2023 11:59PM',
			'week 5': '10/10/2023 11:59PM',
			'week 6': '17/10/2023 11:59PM',
			'week 7': '24/10/2023 11:59PM',
			'week 8': '31/10/2023 11:59PM',
			'week 9': '7/11/2023 11:59PM',
		};

		Object.keys(weekDates).forEach((week) => {
			while (str.includes(week)) {
				str = str.replace(week, weekDates[week]);
			}
		});

		return str;
	};

	const removeCertainWords = (str: string) => {
		const words = ['Assessment Format', 'Due Date', 'Individual', 'Group'];
		for (let word of words) {
			while (str.includes(word)) {
				str = str.replace(word, '');
			}
		}
		return str;
	};

	const extractAssessmentsInfo = (input: string[]) => {
		let output: any = [];
		let temp = [];
		for (let assessment of input) {
			temp.push(assessment.trim());
		}
		temp = temp.filter((item) => item !== '');

		temp.forEach((item) => {
			const [name, dueDate] = item
				.split(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})/)
				.filter(Boolean);

			if (name.trim() !== 'and') {
				output.push({
					assName: name.trim(),
					dueDate: dueDate.replace('11:59', '').trim().replace('2023', '23'),
					weight: 15,
					startWeek: 2,
					endWeek: 10,
					status: 'ongoing',
					isWeekly: false,
					dueDay: 4,
					courseCode: 'COMP3421',
				});
			}
		});

		return output;
	};

	const extraction2 = (text: string) => {
		let str = replaceNotApplicableWithWeek(text);
		str = replaceWeekWithDate(str);
		str = removeCertainWords(str);
		let arr = str.split(' ');
		const filter1 = arr.filter((item) => item !== '');
		const filter2 = filter1.filter((item) => !item.includes('%'));
		const cleanArr = filter2.join(' ');
		const splitByPM = cleanArr.split('PM');
		const extracted = extractAssessmentsInfo(splitByPM);
		const course = {
			courseCode: 'COMP3421',
			courseName: 'Computer Graphics',
			progress: 30,
			totalCourseMark: 25,
		};
		data.push(course);
		assessments.push(extracted);
		console.log('Assessments:', extracted);
		console.log('Course:', course);
		return extracted;
	};

	const extraction1 = (text: string) => {
		// extracts assessments from the whole page data
		const start = text.indexOf('Relevant Dates') + 'Relevant Dates '.length;
		const end = text.indexOf('Assessment Details');
		extraction2(text.slice(start, end));
		return text.slice(start, end);
	};

	function pdfToText(url: ArrayBuffer, separator = ' ') {
		pdfjsLib.GlobalWorkerOptions.workerSrc =
			'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

		let pdf = pdfjsLib.getDocument({ data: url });
		return pdf.promise.then(function (pdf) {
			// get all pages text
			let maxPages = pdf._pdfInfo.numPages;
			let countPromises = []; // collecting all page promises
			for (let i = 1; i <= maxPages; i++) {
				let page = pdf.getPage(i);
				countPromises.push(
					page.then(function (page) {
						// add page promise
						let textContent = page.getTextContent();
						return textContent.then(function (text) {
							// return content promise
							return text.items
								.map(function (obj: any) {
									return obj.str;
								})
								.join(separator); // value page text
						});
					})
				);
			}
			// wait for all pages and join text
			return Promise.all(countPromises).then(function (texts) {
				for (let i = 0; i < texts.length; i++) {
					texts[i] = texts[i].replace(/\s+/g, ' ').trim();
				}
				const output = extraction1(texts[0]);
				return output;
			});
		});
	}

	function readFileAsArrayBuffer(file: File) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();

			fileReader.onload = function () {
				const arrayBuffer = this.result;
				resolve(arrayBuffer);
			};

			fileReader.onerror = function (error) {
				reject(error);
			};

			fileReader.readAsArrayBuffer(file);
		});
	}

	const handleFileChange = (event: any) => {
		const file: File = event.target.files[0];
		setRawData(file);
	};

	const handleParseButton = async () => {
		if (rawData) {
			const fileReader = new FileReader();
			const input = await readFileAsArrayBuffer(rawData);
			const output = await pdfToText(input as unknown as ArrayBuffer);
		} else {
			alert('ERROR: cannot parse, no file uploaded');
		}
	};

	return (
		<div>
			<h1 className="font-bold text-black mt-4 text-2xl">PDF Reader</h1>
			<Button component="label" variant="contained" startIcon={<CloudUpload />}>
				Upload File
				<VisuallyHiddenInput type="file" onChange={handleFileChange} />
			</Button>
			<Button onClick={handleParseButton}>Parse Data</Button>
		</div>
	);
}
