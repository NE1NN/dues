// https://github.com/adrienjoly/npm-pdfreader-example
// import { PdfReader } from 'pdfreader';
import * as pdfreader from 'pdfreader';

let rows = {};

function printRows() {
	Object.keys(rows)
		.sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
		.forEach((y) => console.log((rows[y] || []).join('')));
}

new pdfreader.PdfReader(null).parseFileItems(
	'./pdf/COMP3121-COURSE-OUTLINE.pdf',
	(err, item) => {
		if (!item || item.page) {
			// end of file, or page
			printRows();
			console.log('PAGE:', item.page);
			rows = {};
		} else if (item.text) {
			(rows[item.y] = rows[item.y] || []).push(item.text);
		}
	}
);
