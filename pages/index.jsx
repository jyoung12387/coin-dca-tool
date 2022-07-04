import Head from "next/head";
import { useColorMode } from "@chakra-ui/react";
import { Box, Button, Text } from "@chakra-ui/react";

export default function Home() {
	const { colorMode, toggleColorMode } = useColorMode();

	const CustomButton = (props) => {
		const { colorMode, toggleColorMode } = useColorMode();
		return (
			<Button
				{...props}
				// color={colorMode === "light" ? "red" : "blue.500"}
				bg="indigo.600"
				color="white"
				_hover={{ backgroundColor: "indigo.700" }}
			></Button>
		);
	};

	return <div></div>;
}
