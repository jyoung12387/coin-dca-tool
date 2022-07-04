import React from "react";
import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";
import { useColorMode } from "@chakra-ui/react";
import ContentLayout from "./content/ContentLayout";
import ChartDataStructure from "./content/ChartDataStructure";
import Footer from "./Footer";

export default function Layout({ children }) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		// Container and styles for main body of html document
		<Flex
			direction="column"
			// minH="100vh"
			// minW="100vw"
			// h="100vh"
			// w="100vw"
			alignItems="center"
			px={{ base: 4, md: 8 }}
			bg={colorMode === "dark" ? "#1a202c" : "#f8fafc"}
			// bg="red"
		>
			{/* Content to be rendered on every page */}
			<Navbar />
			{/* <Hero /> */}
			<ContentLayout />
			<div>{children}</div>
			<Footer />
		</Flex>
	);
}
