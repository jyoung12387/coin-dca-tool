import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";

export default function ButtonMain(props) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			{...props}
			// color={colorMode === "light" ? "red" : "blue.500"}
			bg="indigo.600"
			color="white"
			_hover={{ backgroundColor: "indigo.700" }}
			_active={{ bg: "indigo.500" }}
		></Button>
	);
}
