import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Box,
	Flex,
	useColorMode,
	Text,
	Image,
	Heading,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import StatItem from "../ui/StatItem";
import HeadingMain from "../ui/HeadingMain";
import displayLength from "../../helperFunctions/parseStats";
import roundSats from "../../helperFunctions/roundSats";
import formatStats from "../../helperFunctions/formatStats";

export default function MoreStats({ portfolioData, coinInfo, formValues }) {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Flex width="100%" bg="white">
				<Flex width="340px" bg="red.200">
					Test
				</Flex>
				{coinInfo && portfolioData && formValues && (
					<Flex bg="green.200" width="100%" justifyContent="center">
						<Flex
							direction="column"
							alignItems="center"
							bg="darkBlue"
							rounded="xl"
							p={8}
						>
							<Flex mb={8} alignSelf="center" alignItems="center">
								<Flex mr={2}>
									<Image
										src={coinInfo?.image?.small}
										alt={`${coinInfo.name} logo`}
										borderRadius="full"
										w={8}
										h={8}
									/>
								</Flex>
								<Heading
									color="textWhite"
									fontSize={{ base: "md", sm: "lg", md: "xl" }}
								>
									{coinInfo.name} DCA Summary
								</Heading>
							</Flex>
							<Grid
								templateColumns="repeat(2, 1fr)"
								templateRows="auto"
								gap={1}
							>
								{/* Investment Length */}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Investment Length:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									{displayLength(
										portfolioData.frequency,
										portfolioData.history.length
									)}
								</GridItem>
								{/* Total Units Purchased */}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Total {coinInfo.name} purchased:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									{roundSats(portfolioData.totalUnitsPurchased[0])}
								</GridItem>
								{/* Current Coin Price*/}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Current Price:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									${formatStats(portfolioData.currentPrice[0])}
								</GridItem>
								{/* Average Purchase Price*/}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Average Purchase Price:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									${formatStats(portfolioData.avgPurchasePrice)}
								</GridItem>
								{/* Difference between DCA and lump sum purchase */}
								<GridItem
									rowSpan={1}
									colSpan={2}
									fontSize="lg"
									color="textWhite"
									mt={8}
									mb={4}
								>
									What if you had lump sum purchased instead of dollar cost
									averaging?
								</GridItem>
								{/* DCA Value*/}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									DCA Strategy:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									${formatStats(portfolioData.currentValue)}
								</GridItem>
								{/* Lump Sum Value */}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Lump Sum Strategy:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									$
									{formatStats(
										portfolioData.history[0].cumUnitsPurchased *
											portfolioData.history.length *
											portfolioData.currentPrice[0]
									)}
								</GridItem>
								{/* Difference Between Strategies */}
								<GridItem rowSpan={1} colSpan={1} color="textLight">
									Benefit of{" "}
									{portfolioData.benefitOfDca >= 0 ? "DCA" : "Lump Sum"}{" "}
									Strategy:
								</GridItem>
								<GridItem rowSpan={1} colSpan={1}>
									${formatStats(Math.abs(portfolioData.benefitOfDca))}
								</GridItem>
							</Grid>
						</Flex>
					</Flex>
				)}
			</Flex>
		</>
	);
}
