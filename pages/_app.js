import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { extendTheme } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { Store } from "../app/store";
import { Provider } from "react-redux";
import { useState } from "react";

const breakpoints = createBreakpoints({
    base: "320px",
    mobile: "490px",
    sm: "550px",
    lgMobile: "600px",
    miniTablet: "650px",
    md: "850px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
});

const theme = extendTheme({
    colors: {
        background: "#CDC8B7",
        text: "#9E6E44",
        brown: {
            'tea': '#df853c',
            1000: "#95633A",
            2000: "#684026",
            3000: "#230D0D",
        },
        grey: {
            first: "#CBC7C0",
            second: "#C4C4C4",
            third: "#EBEBEB",
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
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ChakraProvider theme={theme}>
                        <Layout>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                </Hydrate>
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
