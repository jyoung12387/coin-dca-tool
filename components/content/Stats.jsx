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

export default function Stats({ portfolioData, coinInfo, formValues }) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex width="100%" mb={4}>
			<Flex direction="column" width="100%" alignItems="center">
				<Flex
					direction={{ base: "column", xl: "row" }}
					width="100%"
					justifyContent="center"
				>
					<Flex>
						<StatItem
							label="Total Invested"
							amount={portfolioData.totalInvested}
							type="number"
							iconType="static"
						/>
						<StatItem
							label="Account Value"
							amount={portfolioData.currentValue}
							type="number"
							iconType="arrow"
						/>
					</Flex>
					<Flex>
						<StatItem
							label="Profit/Loss"
							amount={portfolioData.profitLoss}
							type="number"
							iconType="arrow"
						/>
						<StatItem
							label="Rate of Return"
							amount={portfolioData.rateOfReturn}
							type="percent"
							iconType="arrow"
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
