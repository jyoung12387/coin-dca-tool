import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<IconButton
			icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
			aria-label="Color Mode Toggle"
			onClick={toggleColorMode}
			bg={colorMode === "dark" ? "gray.700" : "gray.200"}
			color={colorMode === "dark" ? "white" : "gray.500"}
			size={{ base: "sm", sm: "md" }}
			_hover={{
				backgroundColor: colorMode === "dark" ? "gray.600" : "gray.300",
			}}
		/>
	);
};

export default ColorModeToggle;
