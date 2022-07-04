import React, { useState, useEffect } from "react";
import { Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import Stats from "./Stats";
import Form from "./Form";
import getPortfolioData from "../../helperFunctions/getPortfolioData";
import getDataByTimeframe from "../../helperFunctions/getDataByTimeframe";
import { ChartBasic } from "./ChartBasic";
import ChartDataStructure from "./ChartDataStructure";
import MoreStats from "./MoreStats";
import Summary from "./Summary";

export default function ContentLayout() {
	// state to store the form inputs in
	// this info is used to determine what
	// data is fetched from the API
	const [formValues, setFormValues] = useState({
		coin: "bitcoin",
		amount: "100",
		frequency: "monthly",
		numOfPeriods: "24",
	});

	// handle submit of form
	// this changes the state of the formValues
	function handleFormChange(event) {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			[event.target.name]: event.target.value,
		}));
	}

	// state to store the current coin data
	const [coinData, setCoinData] = useState({});

	// state to store the current coin info
	// like the name and logo, etc
	const [coinInfo, setCoinInfo] = useState({});

	// fetch coin data based on formValues state
	// this function is called once on page load
	// and once every time the coinData state is updated
	function fetchCoinData() {
		let days;
		if (formValues.frequency === "daily") {
			days = formValues.numOfPeriods - 1;
		} else if (formValues.frequency === "weekly") {
			days = 7 * formValues.numOfPeriods - 1;
		} else if (formValues.frequency === "everyOtherWeek") {
			days = 14 * formValues.numOfPeriods - 1;
		} else if (formValues.frequency === "monthly") {
			days = 30 * formValues.numOfPeriods - 1;
		}

		fetch(
			`https://api.coingecko.com/api/v3/coins/${formValues.coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`
		)
			.then((res) => res.json())
			.then((data) =>
				setCoinData(getDataByTimeframe(data.prices, formValues.frequency))
			);

		fetch(
			`https://api.coingecko.com/api/v3/coins/${formValues.coin}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
		)
			.then((res) => res.json())
			.then((data) => setCoinInfo(data));
	}

	// fetch coin data initially on page load
	// coinData state will be updated everytime the fetchCoinData
	// function is called inside Form component on form submit
	useEffect(() => {
		fetchCoinData();
	}, []);

	// PortfolioData State
	const [portfolioData, setPortfolioData] = useState(
		getPortfolioData(coinData, formValues.amount, formValues.frequency)
	);

	// Sets portfolioData State
	// This runs once on page load and whenever CoinData changes.
	// CoinData only changes on form submit, so in essence this
	// runs every time the form is submitted.
	useEffect(() => {
		setPortfolioData(
			getPortfolioData(coinData, formValues.amount, formValues.frequency)
		);
	}, [coinData]);

	// ****************************
	// ****************************
	// End of data logic
	// ****************************
	// ****************************

	return (
		<Flex mt={{ base: 16, lg: 24 }} direction="column" w="100%" maxW="1440px">
			<Flex
				direction={{ base: "column", lg: "row" }}
				alignItems={{ base: "center", lg: "flex-start" }}
				justifyContent="center"
			>
				<Flex w={{ base: "340px" }} flexShrink={0}>
					<Form
						formValues={formValues}
						setFormValues={setFormValues}
						handleFormChange={handleFormChange}
						fetchCoinData={fetchCoinData}
						coinData={coinData}
					/>
				</Flex>
				<Flex
					direction="column"
					alignItems={{ base: "center", lg: "center" }}
					// justifyContent="center"
					ml={{ base: 0, lg: 12 }}
					mt={{ base: 8, lg: 0 }}
					width="full"
				>
					{portfolioData && (
						<Stats
							portfolioData={portfolioData}
							coinInfo={coinInfo}
							formValues={formValues}
						/>
					)}

					<Flex
						mt={4}
						mr={{ base: 0, lg: 6, xl: 6, "2xl": 8 }}
						justifyContent="center"
						height="30rem"
						width={{ base: "85vw", lg: "60vw", xl: "53rem", "2xl": "58rem" }}
					>
						{portfolioData && <ChartBasic portfolioData={portfolioData} />}
					</Flex>
				</Flex>
			</Flex>
			{/* <button
				style={{ marginTop: "32px" }}
				onClick={() => console.log(portfolioData.history)}
			>
				Log Coin Data
			</button> */}
			{/* Container for More Stats and Amazon Associates Links */}
			<Flex
				direction={{ base: "column-reverse", lg: "row" }}
				alignItems={{ base: "center", lg: "flex-start" }}
				w="100%"
				boxShadow="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
			>
				<Flex
					mt={{ base: 12, md: 20 }}
					width={{ base: "100%", lg: "30%" }}
					// bg="green.300"
				>
					{/* Ads Go Here */}
				</Flex>

				{/* Summary Section */}
				<Flex
					width={{ base: "100%", lg: "70%" }}
					rounded="md"
					mt={{ base: 12, md: 20 }}
					justifyContent={{ base: "center", lg: "flex-start" }}
				>
					{portfolioData && coinInfo && formValues && (
						<Summary
							portfolioData={portfolioData}
							coinInfo={coinInfo}
							formValues={formValues}
						/>
					)}
				</Flex>
			</Flex>

			{/* <MoreStats
				portfolioData={portfolioData}
				coinInfo={coinInfo}
				formValues={formValues}
			/> */}
			{/* {portfolioData && <ChartDataStructure portfolioData={portfolioData} />} */}
		</Flex>
	);
}
