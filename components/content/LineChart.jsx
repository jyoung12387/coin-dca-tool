import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend
);
import { Flex } from "@chakra-ui/react";

export default function LineChart({ portfolioData }) {
	const [chartData, setChartData] = useState({
		datasets: [],
	});

	const [chartOptions, setChartOptions] = useState({});

	const [parsedData, setParsedData] = useState({});

	useEffect(() => {
		setParsedData([
			portfolioData.history.map((item) => ({
				x: item.dateHistory,
				y: item.portfolioValueOverTime,
			})),
		]);
		console.log(parsedData);
	}, [portfolioData]);

	useEffect(() => {
		setChartData({
			// labels: ["John", "Kevin", "George", "Michael", "Oreo"],
			datasets: [
				{
					label: "Account Value",
					data: parsedData,
					borderColor: "#4f46e5",
					backgroundColor: "#4f46e5",
				},
				// {
				// 	label: "coinB",
				// 	data: [
				// 		{ x: "2016-12-1", y: 1 },
				// 		{ x: "2016-12-2", y: 22 },
				// 		{ x: "2016-12-3", y: 44 },
				// 		{ x: "2016-12-4", y: 34 },
				// 		{ x: "2016-12-5", y: 45 },
				// 		{ x: "2016-12-6", y: 66 },
				// 		{ x: "2016-12-7", y: 67 },
				// 		{ x: "2016-12-8", y: 68 },
				// 		{ x: "2016-12-9", y: 88 },
				// 		{ x: "2016-12-10", y: 99 },
				// 		{ x: "2016-12-11", y: 104 },
				// 		{ x: "2016-12-12", y: 133 },
				// 		{ x: "2016-12-13", y: 123 },
				// 		{ x: "2016-12-14", y: 154 },
				// 		{ x: "2016-12-15", y: 224 },
				// 		{ x: "2016-12-16", y: 265 },
				// 		{ x: "2016-12-17", y: 215 },
				// 		{ x: "2016-12-18", y: 215 },
				// 		{ x: "2016-12-19", y: 206 },
				// 		{ x: "2016-12-20", y: 178 },
				// 		{ x: "2016-12-21", y: 199 },
				// 		{ x: "2016-12-22", y: 167 },
				// 		{ x: "2016-12-23", y: 145 },
				// 		{ x: "2016-12-24", y: 123 },
				// 	],
				// 	borderColor: "#db2777",
				// 	backgroundColor: "#db2777",
				// },
			],
		});
		setChartOptions({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: false,
				},
			},
		});
	}, [parsedData]);

	return (
		<>
			<Line options={chartOptions} data={chartData} />
			<button onClick={() => console.log(portfolioData.history)}>
				Log Portfolio Data
			</button>
		</>
	);
}
