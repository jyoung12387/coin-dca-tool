import React from "react";
import { useState, useEffect } from "react";
import {
	Button,
	color,
	Flex,
	useColorMode,
	useMediaQuery,
} from "@chakra-ui/react";
import { format } from "date-fns";
import "chartjs-adapter-moment";
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
	TimeScale,
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
	Legend,
	TimeScale
);

export function ChartBasic({ portfolioData }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const [lineColor, setLineColor] = useState("#4f46e5");
	const [areaColor, setAreaColor] = useState(
		colorMode === "dark" ? "#4f46e5" : "#4f46e5"
	);

	const [tickColor, setTickColor] = useState(
		colorMode === "dark" ? "#a5a8b6" : "#666666"
	);

	const [tooltipBg, setTooltipBg] = useState(
		colorMode === "dark" ? "#1a202c" : "#f1f1f3"
	);
	const [titleColor, setTitleColor] = useState(
		colorMode === "dark" ? "#f1f1f3" : "#343338"
	);

	// set max number of ticks on chart
	const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
	function xTicks() {
		if (isLargerThan1280) {
			return 7;
		} else {
			return 4;
		}
	}

	// change colors whenever state is changed
	useEffect(() => {
		// setLineColor(colorMode === "dark" ? "#38bdf8" : "#4f46e5");

		setTitleColor(colorMode === "dark" ? "#f1f1f3" : "#343338");

		setAreaColor(colorMode === "dark" ? "#4f46e5" : "#4f46e5");

		setTickColor(colorMode === "dark" ? "#a5a8b6" : "#666666");
		console.log(`color changed to ${lineColor}`);

		setTooltipBg(colorMode === "dark" ? "#1a202c" : "#f8fafc");
	}, [colorMode]);

	const [chartData, setChartData] = useState({
		datasets: [
			{
				label: "Account Value",
				data: portfolioData.history,
				backgroundColor: areaColor,
				borderColor: lineColor,
				borderWidth: 2,
				tension: 0.4,
				parsing: {
					xAxisKey: "dateFormatted",
					yAxisKey: "portfolioValueOverTime",
				},
			},
		],
	});

	useEffect(() => {
		if (portfolioData) {
			setChartData({
				datasets: [
					{
						label: "Account Value",
						data: portfolioData.history,
						fill: false,
						backgroundColor: areaColor,
						borderColor: lineColor,
						borderWidth: 3,
						tension: 0.4,
						pointRadius: 0,
						pointHoverBackgroundColor: lineColor,
						hoverBorderColor: lineColor,
						parsing: {
							xAxisKey: "dateFormatted",
							yAxisKey: "portfolioValueOverTime",
						},
					},
					{
						label: "Total Invested",
						data: portfolioData.history,
						fill: false,
						backgroundColor: "#db2777",
						borderColor: "#db2777",
						// borderDash: [10, 5],
						borderWidth: 3,
						tension: 0.4,
						pointRadius: 0,
						pointHoverBackgroundColor: "#db2777",
						hoverBorderColor: "#db2777",
						parsing: {
							xAxisKey: "dateFormatted",
							yAxisKey: "totalInvestedOverTime",
						},
					},
				],
			});
		}
	}, [portfolioData, colorMode]);

	const options = {
		responsive: true,

		maintainAspectRatio: false,
		scales: {
			x: {
				ticks: {
					autoSkip: true,
					maxRotation: 0,
					// padding: 10,
					maxTicksLimit: xTicks,
					// count: 3,
					color: tickColor,
					crossAlign: "near",
					align: "start",

					// format the dates to only show month and year
					callback: function (value, index) {
						const formatted = format(
							new Date(this.getLabelForValue(value)),
							"MMM yyy"
						);
						return formatted;
					},
				},
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					color: tickColor,
					maxTicksLimit: 5,

					// format yaxis lables to currency with no decimals
					callback: function (context) {
						if (context !== null) {
							context = new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
								minimumFractionDigits: 0,
							}).format(context);
						}
						return context;
					},
				},
			},
		},
		// allows you to see tooltip even when you aren't hovering over a dot
		interaction: {
			mode: "nearest",
			axis: "x",
			intersect: false,
		},
		plugins: {
			legend: {
				position: "top",
				align: "end",
				usePointStyle: true,
				// boxWidth: 400,
				// boxHeight: 40,
				labels: {
					color: tickColor,
				},
			},
			title: {
				display: true,
				text: "Account Value Over Time",
				color: titleColor,
				font: {
					size: 20,
					family: "poppins",
				},
			},
			tooltip: {
				backgroundColor: tooltipBg,
				titleColor: tickColor,
				bodyColor: tickColor,
				borderWidth: 1,
				borderColor: lineColor,
				usePointStyle: true,
				titleSpacing: 8,
				bodySpacing: 8,
				padding: 8,
				// padding between the color box and the text
				boxPadding: 4,

				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";

						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(context.parsed.y);
						}
						return label;
					},
				},
			},
		},
	};

	return (
		<>
			<Line options={options} data={chartData} />
			{/* <Button onClick={() => changeLineColor()}>Change Color</Button> */}
		</>
	);
}
