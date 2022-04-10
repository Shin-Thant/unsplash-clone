import Head from "next/head";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { CgArrowLongRight } from "react-icons/cg";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useRouter } from "next/router";

const getRandomImg = async () => {
    const { data } = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&query=brown&orientation=portrait`
    );

    return data;
};

export default function Home() {
    const router = useRouter();

    const goExplore = () => {
        router.push("/explore");
    };

    const { isLoading, error, data } = useQuery("randomImg", getRandomImg, {
        staleTime: 900000,
    });

    return (
        <>
            <Head>
                <title>Unsplash</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Box width="100%">
                {/* side icons */}
                <Flex
                    direction="column"
                    justify="center"
                    gap="1.4rem"
                    className={styles.followUs}
                >
                    <Box
                        width="3px"
                        height="7.5rem"
                        bg="white"
                        display="inline-block"
                        alignSelf="center"
                        className={styles.lightSaber}
                    ></Box>
                    <Text
                        cursor="pointer"
                        color="white"
                        className={`${styles.links} ${styles.first}`}
                        title="facebook"
                    >
                        <FaFacebookF fontSize="1.3rem" />
                    </Text>
                    <Text
                        cursor="pointer"
                        color="white"
                        className={`${styles.links} ${styles.second}`}
                        title="twitter"
                    >
                        <FaTwitter fontSize="1.3rem" />
                    </Text>
                    <Text
                        cursor="pointer"
                        color="white"
                        className={`${styles.links} ${styles.third}`}
                        title="instagram"
                    >
                        <FiInstagram fontSize="1.3rem" />
                    </Text>
                </Flex>

                {/* main */}
                <Flex
                    w="100%"
                    minH="85vh"
                    justify="center"
                    align="center"
                    direction="column"
                >
                    <Box className={styles.container}>
                        <Box className={styles.img_container}>
                            {isLoading ? (
                                <Skeleton
                                    startColor="#230D0D"
                                    endColor="#9E6E44"
                                    h="100%"
                                    w="100%"
                                    borderRadius="200px 200px 0 0"
                                />
                            ) : data?.urls?.regular ? (
                                <img
                                    src={data?.urls?.regular}
                                    alt={
                                        data?.description
                                            ? data?.description
                                            : ""
                                    }
                                    className={styles.img}
                                />
                            ) : (
                                <Flex
                                    w="100%"
                                    h="100%"
                                    bg="#9E6E44"
                                    justify="center"
                                    align="center"
                                    borderRadius="200px 200px 0 0"
                                >
                                    Image not available!
                                </Flex>
                            )}
                            <img
                                src="./circle-text.svg"
                                className={styles.circle}
                            />
                        </Box>

                        <Box
                            width="100%"
                            mb="0.5rem"
                            letterSpacing="0.08rem"
                            zIndex="2"
                        >
                            <Text
                                className={styles.mainName}
                                display="inline-block"
                                w="max-content"
                                fontSize="4.5rem"
                                fontWeight="700"
                                letterSpacing="0.15em"
                                color="brown.1000"
                                mb="1rem"
                                textTransform="uppercase"
                                position="relative"
                                overflow="hidden"
                                fontFamily="condensed"
                            >
                                unsplash
                            </Text>
                            <Box
                                color="white"
                                fontSize="2rem"
                                fontWeight="600"
                                lineHeight="1.1em"
                                w="max-content"
                            >
                                For Ultimate{" "}
                                <Box
                                    d="inline-block"
                                    color="brown.1000"
                                    position="relative"
                                    p="0.3rem 0.5rem"
                                    zIndex="5"
                                >
                                    <Text>Photos</Text>
                                    <Box className={styles.highlight}></Box>
                                </Box>{" "}
                                and{" "}
                                <Box
                                    d="inline-block"
                                    color="brown.1000"
                                    position="relative"
                                    p="0.3rem 0.5rem"
                                    zIndex="5"
                                >
                                    <Text>Wallpapers</Text>
                                    <Box className={styles.highlight}></Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            fontSize="1.2rem"
                            fontWeight="500"
                            opacity="0.8"
                            color="brown.3000"
                            mb="3rem"
                        >
                            With thousands of worldwide creators.
                        </Box>

                        <Flex
                            onClick={goExplore}
                            align="center"
                            gap="0.5rem"
                            w="max-content"
                            cursor="pointer"
                            p="0.65rem 1.2rem"
                            className={styles.btn}
                        >
                            <Text
                                fontSize="0.95rem"
                                fontWeight="700"
                                fontFamily="condensed"
                                letterSpacing="0.3rem"
                            >
                                Get Started
                            </Text>
                            <CgArrowLongRight
                                className={styles.arrow}
                                fontSize="1.8rem"
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
