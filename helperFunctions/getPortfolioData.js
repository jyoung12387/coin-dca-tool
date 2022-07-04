import { format } from "date-fns";

export default function getPortfolioData(coinHistory, purchaseAmt, frequency) {
	if (coinHistory.length > 0) {
		const timestamps = coinHistory.map((date) => date[0]);

		// beginning price data
		const coinPrice = coinHistory.map((history) => history[1]);

		// units purchased
		const unitsPurchased = coinPrice.map((price) => purchaseAmt / price);

		// cum units purchased
		const cumUnitsPurchased = unitsPurchased.map(
			(
				(sum) => (value) =>
					(sum += value)
			)(0)
		);

		let portfolioValueOverTime = [];
		for (let i = 0; i < coinPrice.length; i++) {
			portfolioValueOverTime.push(cumUnitsPurchased[i] * coinPrice[i]);
		}

		let accountProfitLoss = [];
		for (let i = 0; i < coinPrice.length; i++) {
			accountProfitLoss.push(portfolioValueOverTime[i] - purchaseAmt * [i + 1]);
		}

		let cumTotalInvested = [];
		for (let i = 0; i < coinPrice.length; i++) {
			cumTotalInvested.push(purchaseAmt * [i + 1]);
		}

		const domainMin =
			Math.min(
				...portfolioValueOverTime,
				...accountProfitLoss,
				...cumTotalInvested
			) * 1.1;
		const domainMax =
			Math.max(
				...portfolioValueOverTime,
				...accountProfitLoss,
				...cumTotalInvested
			) * 1.1;

		const coinDomainMax = Math.max(...coinPrice) * 1.1;
		const coinDomainMin = Math.min(...coinPrice) * 1.1;

		function roundDomains(num) {
			if (Math.abs(num) > 10000) {
				return Math.round(num / 1000) * 1000;
			} else if (Math.abs(num) > 1000) {
				return Math.round(num / 100) * 100;
			} else if (Math.abs(num) > 100) {
				return Math.round(num / 10) * 10;
			}
		}

		//summary statistics
		const currentPrice = coinPrice.slice(-1);
		const totalUnitsPurchased = cumUnitsPurchased.slice(-1);
		const currentValue = currentPrice * totalUnitsPurchased;
		const totalInvested = purchaseAmt * coinPrice.length;
		const profitLoss = currentValue - totalInvested;
		const rateOfReturn = (currentValue / totalInvested - 1) * 100;
		const avgPurchasePrice = totalInvested / totalUnitsPurchased;

		let history = [];

		for (let i = 0; i < coinPrice.length; i++) {
			let dateItem = timestamps[i];
			let dateFormatItem = format(new Date(timestamps[i]), "MM/dd/yyyy");
			let priceHistoryItem = coinPrice[i];
			let unitsPurchasedItem = unitsPurchased[i];
			let cumUnitsPurchasedItem = cumUnitsPurchased[i];
			let portfolioValueOverTimeItem = portfolioValueOverTime[i];
			let totalInvestedOverTimeItem = purchaseAmt * [i + 1];

			let profitLossItem = portfolioValueOverTime[i] - purchaseAmt * [i + 1];

			history.push({
				dateHistory: dateItem,
				dateFormatted: dateFormatItem,
				priceHistory: priceHistoryItem,
				profitLossHistory: profitLossItem,
				unitsPurchased: unitsPurchasedItem,
				cumUnitsPurchased: cumUnitsPurchasedItem,
				portfolioValueOverTime: portfolioValueOverTimeItem,
				totalInvestedOverTime: totalInvestedOverTimeItem,
			});
		}

		const lumpSumStrategy =
			history[0].cumUnitsPurchased * coinHistory.length * currentPrice;
		const benefitOfDca = currentValue - lumpSumStrategy;

		return {
			history,
			currentPrice,
			totalUnitsPurchased,
			currentValue,
			totalInvested,
			profitLoss,
			timestamps,
			coinPrice,
			accountValue: portfolioValueOverTime,
			accountProfitLoss,
			cumUnitsPurchased,
			cumTotalInvested,
			domainMin,
			domainMax,
			coinDomainMax,
			coinDomainMin,
			rateOfReturn,
			frequency,
			avgPurchasePrice,
			lumpSumStrategy,
			benefitOfDca,
		};
		// return { coinHistory, purchaseAmt };
	}
}
