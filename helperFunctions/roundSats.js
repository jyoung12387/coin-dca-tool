export default function formatStats(num) {
	let numFixed;
	let numLocal;

	if (Math.abs(num) >= 1000) {
		numFixed = num.toFixed(0);
		numLocal = parseFloat(numFixed).toLocaleString("en-US");
	} else if (Math.abs(num) > 1) {
		numFixed = num.toFixed(2);
		numLocal = parseFloat(numFixed).toLocaleString("en-US");
	} else {
		numFixed = num.toFixed(8);
		numLocal = numFixed;
	}

	return numLocal;
}
