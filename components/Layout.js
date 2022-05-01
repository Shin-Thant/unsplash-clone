import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <Box>
            <Navbar />
            {children}
        </Box>
    );
}
