// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const colors = {
	bgMainDark: "#1a202c",
	bgMainLight: "#f1f1f3",
	darkBlue: "#2a3240",
	"indigo.50": "#dbe4ff",
	"indigo.500": "#6366f1",
	"indigo.600": "#4f46e5",
	"indigo.700": "#4338ca",
	"pink.600": "#db2777",
	textWhite: "#f1f1f3",
	textMain: "#343338",
	textLight: "#a5a8b6",
	borderLight: "#cbd5e0",
	panelColorLight: "#e7ebf1",
};

const fonts = {
	// heading: `Poppins, sans-serif`,
	// body: `Poppins, sans-serif`,
	// inter: `Inter, sans-serif`,
	// system: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
	poppins: `Poppins, sans-serif`,
	inter: `Inter, sans-serif`,
};

// const components = {
// 	Button: {
// 		baseStyle: {
// 			borderRadius: "md",
// 			color: "red.500",
// 		},
// 	},
// };

// 3. extend the theme
const theme = extendTheme({ config, colors, fonts });

export default theme;
