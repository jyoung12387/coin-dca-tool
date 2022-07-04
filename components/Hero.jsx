import React from "react";
import HeadingMain from "./ui/HeadingMain";
import { useBreakpointValue } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

export default function Hero() {
	const breakpoint = useBreakpointValue({
		sm: "Small - 30em",
		md: "Medium - 48em",
		lg: "Large - 62em",
		xl: "XL - 80em",
		"2xl": "2XL - 96em",
	});
	const [isLargerThanMedium] = useMediaQuery("(min-width: 768px)");
	const [isSmallerThanMedium] = useMediaQuery("(max-width: 767px)");

	const heading = {
		base: "Cryptocurrency DCA Calculator",
		md: "Cryptocurrency Dollar Cost Average Calculator",
	};
	return (
		<Flex direction="column" mt={12}>
			{/* <HeadingMain fontSize="clamp(0.5rem, 4vw, 3rem)">
				{isLargerThanMedium && "Cryptocurrency Dollar Cost Average Calculator"}
			</HeadingMain>
			<HeadingMain mt={4} fontSize="clamp(1.3rem, 5vw, 3.5rem)">
				{isSmallerThanMedium && "Cryptocurrency DCA Calculator"}
			</HeadingMain> */}
			<div>{breakpoint}</div>
		</Flex>
	);
}
