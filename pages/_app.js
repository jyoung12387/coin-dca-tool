import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Layout from "../components/Layout";
import "@fontsource/poppins";
import "@fontsource/inter";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
