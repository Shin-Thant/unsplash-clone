import {
    Box,
    Flex,
    Grid,
    GridItem,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import React from "react";

export const UserCardSkeleton = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                miniTablet: "repeat(2, 1fr)",
                userBreak: "repeat(3, 1fr)",
            }}
            gap="1.3rem"
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <Box
                    key={`user-card-${item}`}
                    w="100%"
                    bg="white"
                    px="0.8rem"
                    py="1rem"
                    rounded="lg"
                >
                    <Grid
                        h="max-content"
                        templateColumns="max-content 1fr"
                        align="center"
                        gap="1rem"
                        mb="1.5rem"
                    >
                        <GridItem>
                            <SkeletonCircle
                                startColor="#e7e7e7"
                                endColor="#6A6A6A"
                                size="12"
                            />
                        </GridItem>
                        <GridItem>
                            <Flex
                                flexDir="column"
                                justify="space-evenly"
                                align="flex-start"
                                h="100%"
                            >
                                <Skeleton
                                    startColor="#e7e7e7"
                                    endColor="#6A6A6A"
                                    width="120px"
                                    height="10px"
                                    borderRadius="50px"
                                />
                                <Skeleton
                                    startColor="#e7e7e7"
                                    endColor="#6A6A6A"
                                    width="80px"
                                    height="10px"
                                    borderRadius="50px"
                                />
                            </Flex>
                        </GridItem>
                    </Grid>

                    <Grid
                        templateColumns="repeat(3, 1fr)"
                        gap="1rem"
                        mb="1.5rem"
                    >
                        {[1, 2, 3]?.map((item) => (
                            <GridItem key={`user-img-${item}`}>
                                <Skeleton
                                    startColor="#e7e7e7"
                                    endColor="#6A6A6A"
                                    w="100%"
                                    h="100px"
                                    borderRadius="8px"
                                />
                            </GridItem>
                        ))}
                    </Grid>

                    <Skeleton
                        startColor="#e7e7e7"
                        endColor="#6A6A6A"
                        w="100%"
                        h="40px"
                        borderRadius="8px"
                    />
                </Box>
            ))}
        </Grid>
    );
};
