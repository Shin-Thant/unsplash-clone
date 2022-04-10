import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styles from "../styles/IntroPage.module.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";

// const getRandomImg = async () => {
//     const { data } = await axios.get(
//         `https://api.unsplash.com/photos/random?client_id=${process.env.ACCESS_KEY}&query=brown&orientation=portrait`
//     );

//     return data;
// };

export const IntroPage = () => {
    // const { isLoading, error, data } = useQuery("randomImg", getRandomImg, {
    //     staleTime: 600000,
    // });

    const router = useRouter();

    const goExplore = () => {
        router.push("/explore");
    };

    return <Text>hello</Text>;
};
