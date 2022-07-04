import React from "react";
import { Heading, useColorMode } from "@chakra-ui/react";

export default function HeadingMain(props) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Heading
			{...props}
			color={colorMode === "light" ? "textMain" : "textWhite"}
		></Heading>
	);
}
