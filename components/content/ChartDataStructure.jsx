import React from "react";
import { useState, useEffect } from "react";
import { Button, color, Flex, useColorMode } from "@chakra-ui/react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export default function ChartDataStructure({ portfolioData }) {
	// setup
	const data = {
		datasets: [
			{
				label: "Account Value",
				data: portfolioData.history,
				backgroundColor: "#ef4444",
				borderColor: "#ef4444",
				borderWidth: 1,
				tension: 0.4,
				parsing: {
					xAxisKey: "dateFormatted",
					yAxisKey: "portfolioValueOverTime",
				},
			},
			// {
			// 	label: "Drink Sales",
			// 	data: salesNumbers,
			// 	backgroundColor: "#22c55e",
			// 	borderColor: "#22c55e",
			// 	borderWidth: 1,
			// 	tension: 0.4,
			// 	parsing: {
			// 		xAxisKey: "day",
			// 		yAxisKey: "sales.drinks",
			// 	},
			// },
		],
	};

	// data: portfolioData.history.map(
	// 	(item) => item.portfolioValueOverTime
	// ),

	// config
	const config = {
		type: "line",
		// data,
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	return (
		<Flex height={400} width={900} mb={40}>
			<Line data={data} options={config} />
		</Flex>
	);
}
