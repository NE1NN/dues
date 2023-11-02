// https://github.com/adrienjoly/npm-pdfreader-example
// import { PdfReader } from 'pdfreader';

// HOW TO RUN: cd src/app/, terus node pdfReader.js
import * as pdfreader from 'pdfreader';

export async function PdfReader() {
	let rows = {};
	let data = [];
	let output = [];

	function printRows() {
		Object.keys(rows)
			.sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
			.forEach((y) => {
				// console.log((rows[y] || []).join(''));
				data.push((rows[y] || []).join(''));
			});
		return data;
	}

	new pdfreader.PdfReader(null).parseFileItems(
		'./pdf/COMP3121-COURSE-OUTLINE.pdf',
		(err, item) => {
			if (err) {
				console.error('error:', err);
			} else if (!item || item.page) {
				// end of file, or page
				if (item && item.page && item.page == 2) {
					const data = printRows();
					return data;
				}
			} else if (item.text) {
				(rows[item.y] = rows[item.y] || []).push(item.text);
			}
		}
	);
}

PdfReader().then((res) => console.log(res));
