import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const UserCard = ({ user }) => {
    const router = useRouter();

    const goDetails = () => {
        // router.push(`/user/${user?.id}`);
    };

    return (
        <Box
            w="100%"
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
                h="max-content"
                templateColumns="max-content max-content 1fr"
                gap="1rem"
                mb="1.5rem"
            >
                <Image
                    onClick={goDetails}
                    cursor="pointer"
                    src={user?.profile_image?.large}
                    backgroundColor="gray.300"
                    width="50px"
                    height="50px"
                    borderRadius="50%"
                />
                <Box w="max-content">
                    <Text
                        onClick={goDetails}
                        cursor="pointer"
                        fontSize="1rem"
                        fontWeight="600"
                        mb="0.1rem"
                    >
                        {user?.name}
                    </Text>
                    <Text
                        onClick={goDetails}
                        fontSize="0.9rem"
                        cursor="pointer"
                        fontWeight="500"
                        opacity="0.8"
                    >
                        @{user?.username}
                    </Text>
                </Box>
                <Flex
                    justifySelf="flex-end"
                    justify="center"
                    align="center"
                    width="max-content"
                    minWidth="30px"
                    height="30px"
                    bg="brown.1000"
                    color="white"
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
                </Flex>
            </Grid>

            {user?.photos?.length ? (
                <Grid w="full" templateColumns="repeat(3, 1fr)" gap="0.6rem">
                    {user?.photos?.slice(0, 4)?.map((photo) => (
                        <GridItem
                            onClick={goDetails}
                            cursor="pointer"
                            w="100%"
                            height="120px"
                            overflow="hidden"
                            borderRadius="5px"
                            shadow="md"
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
                        </GridItem>
                    ))}
                </Grid>
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
                border="1.5px solid black"
                fontWeight="600"
                fontSize="0.95rem"
                borderRadius="5px"
                cursor="pointer"
                opacity="0.8"
                _hover={{
                    opacity: "1",
                }}
                transition="all 220ms ease"
            >
                View Profile
            </Flex>
        </Box>
    );
};
