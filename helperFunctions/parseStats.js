export default function displayLength(frequency, numOfPeriods) {
	let text;
	let plural = "";
	let length;

	if (frequency === "daily") {
		length = numOfPeriods;
		text = "Day";
	} else if (frequency === "weekly") {
		length = numOfPeriods;
		text = "Week";
	} else if (frequency === "everyOtherWeek") {
		length = numOfPeriods * 2;
		text = "Week";
	} else {
		length = numOfPeriods;
		text = "Month";
	}

	if (length > 1) {
		plural = "s";
	}

	// if (frequency === "daily") {
	// 	if (numOfPeriods > 1) {
	// 		text = "days";
	// 	} else {
	// 		text = "day";
	// 	}
	// } else if (frequency === "weekly") {
	// 	if (numOfPeriods > 1) {
	// 		text = "weeks";
	// 	} else {
	// 		text = "week";
	// 	}
	// } else if (frequency === "everyOtherWeek") {
	// 	text = "weeks";
	// 	length = length * 2;
	// } else {
	// 	if (numOfPeriods > 1) {
	// 		text = "months";
	// 	} else {
	// 		text = "month";
	// 	}
	// }

	return `${length} ${text}${plural}`;
}
