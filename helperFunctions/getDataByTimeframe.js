export default function getDataByTimeframe(coinData, timeframe) {
	//check which timeframe to use
	let n;
	if (timeframe === "daily") {
		n = 1;
	} else if (timeframe === "weekly") {
		n = 7;
	} else if (timeframe === "everyOtherWeek") {
		n = 14;
	} else if (timeframe === "monthly") {
		n = 30;
	}

	//create new array based on timeframe chosen
	let newCoinData = [];
	for (let i = coinData.length - 1; i >= 0; i -= n) {
		newCoinData.unshift(coinData[i]);
	}
	// return new array
	return newCoinData;

	// return { coinData, timeframe };
}
