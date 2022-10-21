import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { extendTheme } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { persistor, Store } from "../app/store";
import { Provider } from "react-redux";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import EditColProvider from "../context/collectionContext/editColContext";
import { NavbarContextProvider } from "../context/navbarContext/navbarContext";
import ContactFormProvider from "../context/contactFormContext/contactFormContext";

const breakpoints = createBreakpoints({
	base: "300px",
	smMobile: "440px",
	mobile: "490px",
	sm: "550px",
	lgMobile: "600px",
	miniTablet: "650px",
	collectionBreak: "680px",
	modalBreak: "750px",
	md: "850px",
	lg: "960px",
	userBreak: "990px",
	xl: "1200px",
	"2xl": "1536px",
});

const theme = extendTheme({
	colors: {
		background: "#cdc8b7",
		text: "#9E6E44",
		brown: {
			tea: "#df853c",
			1000: "#95633A",
			2000: "#684026",
			3000: "#230D0D",
		},
		grey: {
			first: "#CBC7C0",
			second: "#C4C4C4",
			third: "#EBEBEB",
		},
		red: {
			favorited: "hsl(0, 100%, 60%)",
			error: "hsl(0, 100%, 55%)",
		},
		black: {
			placeholder: "hsl(0, 0%, 5%, 0.5)",
		},
		myblack: "#242423",
	},
	fonts: {
		condensed: "Roboto Condensed, sans-serif",
		saira: "Saira Condensed, sans-serif",
	},
	breakpoints,
});

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<Provider store={Store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<NavbarContextProvider>
							<EditColProvider>
								<ContactFormProvider>
									<ChakraProvider theme={theme}>
										<Layout>
											<ReactQueryDevtools
												initialIsOpen={false}
											/>
											<Component {...pageProps} />
										</Layout>
									</ChakraProvider>
								</ContactFormProvider>
							</EditColProvider>
						</NavbarContextProvider>
					</Hydrate>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
