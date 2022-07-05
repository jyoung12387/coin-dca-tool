import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
	return (
		<Flex
			mt={{ base: 16, sm: 32 }}
			mb={8}
			fontFamily="poppins"
			fontWeight="semibold"
		>
			<p>Data provided by&nbsp;</p>
			<a
				href="https://www.coingecko.com/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Text
					color="indigo.600"
					decoration="underline"
					_hover={{ color: "pink.600" }}
					transition="all ease-in-out 150ms"
				>
					CoinGecko
				</Text>
			</a>
		</Flex>
	);
}
