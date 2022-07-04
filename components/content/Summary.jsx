import React from "react";
import { Flex, Image, Text, Heading, useColorMode } from "@chakra-ui/react";
import formatStats from "../../helperFunctions/formatStats";
import displayLength from "../../helperFunctions/parseStats";
import roundSats from "../../helperFunctions/roundSats";
import millify from "millify";

export default function Summary({ portfolioData, coinInfo, formValues }) {
	console.log({ portfolioData, coinInfo, formValues });
	const { colorMode, toggleColorMode } = useColorMode();

	function StatContainer({ itemLabel, item, color }) {
		return (
			<Flex mt={3} my={2} rounded="md">
				<Flex w="8px" h="100%" bg={color} mr={2} rounded="md"></Flex>
				<Flex
					minW={{ base: "15rem", sm: "20rem", md: "20rem" }}
					// color="#343338"
					color={colorMode === "dark" ? "textWhite" : "textMain"}
					fontWeight="semibold"
					fontSize={{ base: "sm", sm: "md", md: "lg" }}
				>
					{itemLabel}
				</Flex>
				<Flex
					// color="#343338"
					color={colorMode === "dark" ? "textWhite" : "textMain"}
					fontWeight="semibold"
					fontSize={{ base: "sm", sm: "md", md: "lg" }}
				>
					{item}
				</Flex>
			</Flex>
		);
	}

	return (
		<Flex
			direction="column"
			// width="100%"
			p={{ base: 2, sm: 8 }}
			fontFamily="poppins"
			boxShadow="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"

			// p={4}
		>
			<Flex>
				<Image
					src={coinInfo?.image?.small}
					alt={coinInfo.name}
					// width={12}
					// height={12}
					rounded="full"
				/>
				<Heading
					as="h3"
					pt={{ base: 3, sm: 2 }}
					ml={{ base: 4, sm: 8 }}
					size={{ base: "md", sm: "lg" }}
					color={colorMode === "dark" ? "textWhite" : "textMain"}
					// borderBottom={`3px solid ${
					// 	colorMode === "dark" ? "#a5a8b6" : "#343338"
					// }`}
				>
					{coinInfo.name} DCA Summary
				</Heading>
			</Flex>
			<Heading
				as="h4"
				mt={6}
				mb={2}
				size="md"
				color={colorMode === "dark" ? "textLight" : "#676767"}
			>
				Key Stats
			</Heading>
			<StatContainer
				itemLabel="Current Price"
				item={`$${formatStats(portfolioData.currentPrice[0])}`}
				color="indigo.600"
			/>
			<StatContainer
				itemLabel="Scenario Timeframe"
				item={displayLength(
					portfolioData.frequency,
					portfolioData.history.length
				)}
				color="pink.600"
			/>
			{coinInfo && (
				<StatContainer
					itemLabel={`Total ${
						coinInfo.symbol && coinInfo.symbol.toUpperCase()
					} Purchased`}
					item={roundSats(portfolioData.totalUnitsPurchased[0])}
					color="indigo.600"
				/>
			)}
			<Heading
				as="h4"
				size="md"
				mt={6}
				mb={2}
				color={colorMode === "dark" ? "textLight" : "#676767"}
			>
				DCA vs Lump Sum Strategy
			</Heading>
			<StatContainer
				itemLabel="DCA Current Value"
				item={`$${
					portfolioData.currentValue > 1000000
						? millify(portfolioData.currentValue, { precision: 2 })
						: formatStats(portfolioData.currentValue)
				}`}
				color="indigo.600"
			/>
			<StatContainer
				itemLabel="Lump Sum Current Value"
				item={`$${
					portfolioData.history[0].cumUnitsPurchased *
						portfolioData.history.length *
						portfolioData.currentPrice[0] >
					1000000
						? millify(
								portfolioData.history[0].cumUnitsPurchased *
									portfolioData.history.length *
									portfolioData.currentPrice[0],
								{ precision: 2 }
						  )
						: formatStats(
								portfolioData.history[0].cumUnitsPurchased *
									portfolioData.history.length *
									portfolioData.currentPrice[0]
						  )
				}`}
				color="pink.600"
			/>
			<StatContainer
				itemLabel={`Benefit of ${
					portfolioData.benefitOfDca >= 0 ? "DCA" : "Lump Sum"
				}`}
				item={`$${
					Math.abs(portfolioData.benefitOfDca) > 1000000
						? millify(Math.abs(portfolioData.benefitOfDca), {
								decimalSeparator: ".",
								precision: 2,
						  })
						: formatStats(Math.abs(portfolioData.benefitOfDca))
				}`}
				color="indigo.600"
			/>
		</Flex>
	);
}
