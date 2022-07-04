import {
	Box,
	Flex,
	Heading,
	useColorMode,
	FormControl,
	FormLabel,
	Button,
	Select,
	VStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect } from "react";
import allCoinList from "../../coins/allCoinList";

import getDataByTimeframe from "../../helperFunctions/getDataByTimeframe";

export default function CoinDetailsForm({
	formValues,
	setFormValues,
	handleFormChange,
	fetchCoinData,
	coinData,
}) {
	const { colorMode, toggleColorMode } = useColorMode();

	function handleFormSubmit(event) {
		event.preventDefault();
		fetchCoinData();
	}

	function textColor() {
		if (colorMode === "dark") {
			return "#ebebeb";
		} else {
			return "#343338";
		}
	}

	// Whenever CoinData changes, change the NumOfPeriods value
	// to be equal to coinData.length
	// This fixes the issue of user trying to query longer
	// time frame than exists from query
	useEffect(() => {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			numOfPeriods: coinData.length,
		}));
	}, [coinData]);

	return (
		<Flex
			mt={{ base: 0, lg: 4 }}
			// height="30rem"
			width="100%"
			direction="column"
			bg={colorMode === "dark" ? "darkBlue" : "white"}
			rounded={8}
			alignItems="center"
			border={colorMode === "dark" ? "" : "solid 1px #e5e7eb"}
			boxShadow="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
		>
			<Heading
				pt="8"
				fontSize="xl"
				fontFamily="poppins"
				color={colorMode === "dark" ? "textWhite" : "indigo.600"}
			>
				DCA Settings
			</Heading>
			<form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
				<VStack
					mt={2}
					paddingX={8}
					paddingY={2}
					spacing={2}
					w="full"
					fontFamily="poppins"
				>
					<FormControl>
						<FormLabel
							htmlFor="coin"
							m={1}
							fontSize="14px"
							fontWeight="semibold"
							color={colorMode === "dark" ? "textLight" : "#676767"}
						>
							Coin
						</FormLabel>
						<Select
							name="coin"
							id="coin"
							value={formValues.coin}
							onChange={handleFormChange}
							type="text"
							size="md"
							fontWeight="semibold"
							color={colorMode === "dark" ? "#f1f1f3" : "#292524"}
							borderColor={colorMode === "dark" ? "gray.600" : "gray.400"}
							focusBorderColor="indigo.600"
						>
							<option
								value="popular-coins"
								disabled
								style={{ color: textColor(), fontWeight: "bold" }}
							>
								Popular Coins
							</option>
							<option value="bitcoin">Bitcoin</option>
							<option value="ethereum">Ethereum</option>
							<option value="avalanche-2">Avalanche</option>
							<option value="cardano">Cardano</option>
							<option value="dogecoin">Dogecoin</option>
							<option value="solana">Solana</option>
							<option value="ripple">XRP</option>
							<option
								value="all-coins"
								disabled
								style={{ color: textColor(), fontWeight: "bold" }}
							>
								All Coins
							</option>
							{allCoinList.map((coin) => (
								<option key={coin.id} value={coin.apiName}>
									{coin.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor="amount"
							m={1}
							fontSize="14px"
							fontWeight="semibold"
							color={colorMode === "dark" ? "textLight" : "#676767"}
						>
							Amount
						</FormLabel>
						<NumberInput
							name="amount"
							id="amount"
							value={formValues.amount}
							onChange={(value) =>
								handleFormChange({ target: { name: "amount", value } })
							}
							size="md"
							defaultValue={100}
							min={1}
							max={999999999999}
							borderColor={colorMode === "dark" ? "gray.600" : "gray.400"}
							focusBorderColor="indigo.600"
						>
							<NumberInputField
								fontWeight="semibold"
								color={colorMode === "dark" ? "#f1f1f3" : "#292524"}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor="coin"
							m={1}
							fontSize="14px"
							fontWeight="semibold"
							color={colorMode === "dark" ? "textLight" : "#676767"}
						>
							Frequency
						</FormLabel>
						<Select
							name="frequency"
							id="frequency"
							value={formValues.frequency}
							onChange={handleFormChange}
							type="text"
							size="md"
							fontWeight="semibold"
							color={colorMode === "dark" ? "#f1f1f3" : "#292524"}
							borderColor={colorMode === "dark" ? "gray.600" : "gray.400"}
							focusBorderColor="indigo.600"
						>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="everyOtherWeek">Every Other Week</option>
							<option value="monthly">Monthly</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel
							htmlFor="numOfPeriods"
							m={1}
							fontSize="14px"
							fontWeight="semibold"
							color={colorMode === "dark" ? "textLight" : "#676767"}
						>
							Investment Length
						</FormLabel>
						<NumberInput
							name="numOfPeriods"
							id="numOfPeriods"
							value={formValues.numOfPeriods}
							onChange={(value) =>
								handleFormChange({
									target: { name: "numOfPeriods", value },
								})
							}
							defaultValue={365}
							min={1}
							max={9999}
							borderColor={colorMode === "dark" ? "gray.600" : "gray.400"}
							focusBorderColor="indigo.600"
						>
							<NumberInputField
								fontWeight="semibold"
								color={colorMode === "dark" ? "#f1f1f3" : "#292524"}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
				</VStack>
				<Flex width="100%" px={8} pt={4} pb={8}>
					<Button
						type="submit"
						width="full"
						color="white"
						size="lg"
						bg="indigo.600"
						_hover={{ backgroundColor: "indigo.700", color: "white" }}
						_active={{ backgroundColor: "indigo.500" }}
					>
						SUBMIT
					</Button>
				</Flex>
			</form>
		</Flex>
	);
}
