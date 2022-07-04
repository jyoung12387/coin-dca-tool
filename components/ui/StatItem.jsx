import {
	Flex,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
	useColorMode,
	Icon,
} from "@chakra-ui/react";
import {
	BsFillArrowUpCircleFill,
	BsArrowDownCircleFill,
	BsFillPieChartFill,
} from "react-icons/bs";
import millify from "millify";

import formatStats from "../../helperFunctions/formatStats";

export default function StatItem({ label, amount, type, iconType }) {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Stat w="100%" py={4} px={2} fontFamily="poppins">
			<Flex
				minW={{
					base: "8rem",
					sm: "12rem",
					lg: "12rem",
					xl: "12rem",
					"2xl": "13rem",
				}}
				width="auto"
				p={4}
				rounded="lg"
				direction="column"
				bg={colorMode === "dark" ? "darkBlue" : "white"}
				border={colorMode === "dark" ? "" : "solid 1px #e5e7eb"}
				boxShadow="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
			>
				<StatLabel
					color={colorMode === "dark" ? "textLight" : "indigo.600"}
					fontSize={{
						base: "0.75rem",
						sm: "clamp(0.5rem, 1vw + 0.4rem, 1.1rem)",
					}}
					mb={2}
				>
					{label}
				</StatLabel>
				<Flex alignItems="center">
					{iconType === "arrow" ? (
						amount >= 0 ? (
							<Icon
								as={BsFillArrowUpCircleFill}
								w={6}
								h={6}
								mr={4}
								color="#34d399"
							/>
						) : (
							<Icon
								as={BsArrowDownCircleFill}
								w={6}
								h={6}
								mr={4}
								color="#db2777"
							/>
						)
					) : (
						<Icon as={BsFillPieChartFill} w={6} h={6} mr={4} color="#34d399" />
					)}
					<StatNumber
						color={colorMode === "dark" ? "textWhite" : "textMain"}
						fontSize={{ base: "1rem", sm: "clamp(1.4rem, 2vw, 1.8rem)" }}
					>
						{type === "number" ? "$" : null}
						{Math.abs(amount) > 1000000
							? millify(amount, { precision: 2 })
							: formatStats(amount)}
						{/* {formatStats(amount)} */}
						{type === "percent" ? "%" : null}
					</StatNumber>
				</Flex>
			</Flex>
		</Stat>
	);
}
