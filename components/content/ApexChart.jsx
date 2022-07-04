import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ApexChart({ portfolioData }) {
	// set state for series and options
	const [series, setSeries] = useState(null);
	const [options, setOptions] = useState(null);

	// update chart data state on page load and whenever portfolioData changes
	useEffect(() => {
		setSeries([
			{
				name: "Account Value",
				data: portfolioData.accountValue,
				color: "#4f46e5",
			},
			{
				name: "Profit/Loss",
				data: portfolioData.accountProfitLoss,
				color: "#3b82f6",
			},
			{
				name: "Total Invested",
				data: portfolioData.cumTotalInvested,
				color: "#f87171",
			},
		]);
		setOptions({
			xaxis: {
				categories: portfolioData.timestamps,
				type: "datetime",
			},
			yaxis: [
				{
					seriesName: "Account Value",

					axisBorder: {
						show: true,
					},
					opposite: true,
					forceNiceScale: true,
					labels: {
						show: true,
						formatter: (value) => {
							return `$${formatChartNumbers(value)}`;
						},
					},
				},
				{
					seriesName: "Profit/Loss",

					axisBorder: {
						show: false,
					},
					labels: {
						show: false,
						formatter: (value) => {
							return `$${formatChartNumbers(value)}`;
						},
					},
					opposite: true,
				},
				{
					seriesName: "Total Invested",

					axisBorder: {
						show: false,
					},
					labels: {
						show: false,
						formatter: (value) => {
							return `$${formatChartNumbers(value)}`;
						},
					},
					opposite: true,
				},
			],
			legend: {
				position: "top",
			},
			tooltip: {},
			chart: {
				zoom: {
					enabled: false,
				},
			},
			annotations: {
				yaxis: [
					{
						y: 0,
						borderColor: "#9ca3af",
						opacity: 1,
						strokeDashArray: 0,
					},
				],
			},
			stroke: {
				curve: "smooth",
				width: [3, 3, 3, 3],
				dashArray: [0, 0, 4, 0],
			},
		});
	}, [portfolioData]);

	// format numbers on chart based on decimal places
	function formatChartNumbers(num) {
		let numFixed;
		let numLocal;

		if (Math.abs(num) > 1) {
			numFixed = num.toFixed(0);
			numLocal = parseFloat(numFixed).toLocaleString("en-US");
		} else if (Math.abs(num) > 0.1) {
			numFixed = num.toFixed(2);
			numLocal = numFixed;
		} else if (Math.abs(num) > 0.01) {
			numFixed = num.toFixed(4);
			numLocal = numFixed;
		} else if (Math.abs(num) > 0) {
			numFixed = num.toFixed(8);
			numLocal = numFixed;
		} else {
			numFixed = num.toFixed(0);
			numLocal = numFixed;
		}

		return numLocal;
	}

	return (
		<Flex direction="column" width="100%" height="100%">
			<Flex direction="column" width="100%" height="100%">
				{series && options && (
					<Chart
						options={options}
						series={series}
						type="line"
						// height="500"
						width="100%"
					/>
				)}
			</Flex>
		</Flex>
	);
}
