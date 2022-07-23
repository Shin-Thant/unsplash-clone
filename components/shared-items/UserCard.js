import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/UserCard.module.css";

export const UserCard = ({ user }) => {
    const router = useRouter();
    const [focusImg, setFocusImg] = useState(1);

    const goDetails = () => {
        user?.username && router.push(`/user/${user?.username}`);
    };

    const handleFocus = (num) => {
        num !== focusImg && setFocusImg(num);
    };

    return (
        <Flex
            className={styles.userCard}
            flexDir="column"
            justify="space-between"
            w="100%"
            h="100%"
            bg="white"
            px="0.8rem"
            py="1rem"
            rounded="lg"
            _hover={{
                shadow: "xl",
            }}
            transition="all 230ms ease"
        >
            <Grid
                w="100%"
                h="max-content"
                templateColumns="max-content 1fr 1fr"
                gap="1rem"
                mb="1.5rem"
                // bg="blue.200"
            >
                <GridItem>
                    <Image
                        onClick={goDetails}
                        cursor="pointer"
                        src={user?.profile_image?.large}
                        backgroundColor="gray.300"
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                    />
                </GridItem>
                <GridItem width="max-content">
                    <Box w="100%">
                        <Text
                            onClick={goDetails}
                            cursor="pointer"
                            fontSize="1rem"
                            fontWeight="600"
                            mb="0.1rem"
                            color="myblack"
                            opacity="0.8"
                            transition="opacity 200ms ease"
                            _hover={{
                                opacity: "1",
                            }}
                        >
                            {user?.name?.length > 17
                                ? `${user?.name?.slice(0, 18)}...`
                                : user?.name}
                        </Text>
                        <Text
                            onClick={goDetails}
                            fontSize="0.95rem"
                            cursor="pointer"
                            fontWeight="500"
                            opacity="0.8"
                            transition="opacity 200ms ease"
                            _hover={{
                                opacity: "1",
                            }}
                        >
                            @
                            {user?.username?.length > 17
                                ? `${user?.username?.slice(0, 18)}...`
                                : user?.username}
                        </Text>
                    </Box>
                </GridItem>

                {/* <Flex
                    justifySelf="flex-end"
                    justify="center"
                    align="center"
                    width="max-content"
                    minWidth="30px"
                    height="30px"
                    border="1.5px solid"
                    borderColor="myblack"
                    color="myblack"
                    p="2px 10px"
                    fontSize="0.9rem"
                    borderRadius="5px"
                    fontWeight="600"
                    gap="0.5rem"
                >
                    <Text
                        w="max-content"
                        display="inline-block"
                        fontWeight="500"
                    >
                        Photos
                    </Text>{" "}
                    {user?.total_photos}
                </Flex> */}
            </Grid>

            {user?.photos?.length ? (
                user?.photos?.length >= 3 ? (
                    <Flex width="100%" gap="0.5rem">
                        {user?.photos?.slice(0, 4)?.map((photo, i) => (
                            <Box
                                key={
                                    photo?.urls?.small ||
                                    photo?.urls?.regular ||
                                    photo?.urls?.full ||
                                    photo?.urls?.raw
                                }
                                onClick={() => handleFocus(i + 1)}
                                className={`${
                                    focusImg === i + 1
                                        ? styles.focusImg
                                        : styles.normalImg
                                }`}
                                cursor="pointer"
                                height="150px"
                                overflow="hidden"
                                borderRadius="5px"
                                transition="width 280ms ease, box-shadow 280ms ease"
                            >
                                <Image
                                    bg="gray.200"
                                    src={
                                        photo?.urls?.small ||
                                        photo?.urls?.regular ||
                                        photo?.urls?.full ||
                                        photo?.urls?.raw
                                    }
                                    alt=""
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                />
                            </Box>
                        ))}
                    </Flex>
                ) : (
                    <Flex width="100%" gap="0.5rem">
                        {user?.photos?.map((photo) => (
                            <Box
                                key={
                                    photo?.urls?.small ||
                                    photo?.urls?.regular ||
                                    photo?.urls?.full ||
                                    photo?.urls?.raw
                                }
                                width="100%"
                                height="150px"
                                overflow="hidden"
                                borderRadius="5px"
                                transition="width 280ms ease, box-shadow 280ms ease"
                            >
                                <Image
                                    bg="gray.200"
                                    src={
                                        photo?.urls?.small ||
                                        photo?.urls?.regular ||
                                        photo?.urls?.full ||
                                        photo?.urls?.raw
                                    }
                                    alt=""
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                />
                            </Box>
                        ))}
                    </Flex>
                )
            ) : (
                ""
            )}

            <Flex
                onClick={goDetails}
                mt={user?.photos?.length >= 1 ? "1.5rem" : "0"}
                w="100%"
                py="0.5rem"
                display="flex"
                justify="center"
                align="center"
                border="1.5px solid"
                borderColor="rgba(0,0,0,0.7)"
                fontWeight="600"
                fontSize="0.95rem"
                borderRadius="5px"
                cursor="pointer"
                opacity="0.8"
                _hover={{
                    opacity: "1",
                    borderColor: "black",
                }}
                transition="all 220ms ease"
            >
                View Profile
            </Flex>
        </Flex>
    );
};
