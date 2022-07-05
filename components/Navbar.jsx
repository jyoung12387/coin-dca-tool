import React from "react";
import {
	Flex,
	Heading,
	HStack,
	Text,
	Button,
	Icon,
	Show,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react/";
import HeadingMain from "./ui/HeadingMain";
import ButtonMain from "../components/ui/ButtonMain";
import ColorModeToggle from "./ui/ColorModeToggle";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure, useColorMode } from "@chakra-ui/react";

export default function Navbar() {
	const [isSmall] = useMediaQuery("(max-width: 480px)");
	const [showTitle] = useMediaQuery("(min-width: 850px)");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex
			as="nav"
			mt={8}
			width="full"
			maxW="1440px"
			justifyContent="space-between"
		>
			<Flex alignItems="center">
				<HeadingMain fontSize={{ base: "24px", sm: "30px" }}>Coin</HeadingMain>
				<Heading fontSize={{ base: "24px", sm: "30px" }} color="indigo.600">
					DCA
				</Heading>
				<HeadingMain fontSize={{ base: "24px", sm: "30px" }}>Tool</HeadingMain>
			</Flex>
			{showTitle && (
				<Flex>
					<HeadingMain fontFamily="poppins" fontSize="4xl">
						Crypto DCA Calculator
					</HeadingMain>
				</Flex>
			)}

			<HStack spacing={4}>
				<ButtonMain
					onClick={onOpen}
					leftIcon={<FaRegHeart />}
					size={{ base: "sm", sm: "md" }}
				>
					Donate
				</ButtonMain>
				<ColorModeToggle />
			</HStack>
			<Modal
				blockScrollOnMount={false}
				size={{ base: "xs", sm: "lg" }}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader mb={0}>
						<Text position="relative" fontSize={{ base: "lg", md: "2xl" }}>
							Donate to Support
						</Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mb={4}>
							<Text
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg" }}
								mb={1}
							>
								{" "}
								If you feel like supporting this site you can donate to:
							</Text>
						</Flex>
						<Flex alignItems="center">
							<Show breakpoint={`(min-width: 500px)`}>
								<Flex>
									<Image
										src="/Ethereum.svg"
										alt="Ethereum"
										width="30px"
										height="30px"
									/>
								</Flex>
							</Show>
							<a
								href="https://etherscan.io/address/0x677f672e5Ab3cd1eDE86B675990D335Da9D5d461"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Text
									color={colorMode === "dark" ? "#9aaade" : "indigo.600"}
									fontWeight="semibold"
									ml={{ base: 0, sm: 4 }}
									fontSize={{ base: "xs", sm: "md" }}
									_hover={{ color: "pink.600" }}
									transition="all ease-in-out 150ms"
								>
									0x677f672e5Ab3cd1eDE86B675990D335Da9D5d461
								</Text>
							</a>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<ButtonMain onClick={onClose} size={{ base: "sm", sm: "md" }}>
							Close
						</ButtonMain>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}
