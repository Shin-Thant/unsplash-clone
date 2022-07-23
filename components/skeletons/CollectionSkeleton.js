import { Box, Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import React from "react";
import styles from "../../styles/CollectionCard.module.css";

export const CollectionSkeleton = () => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="1.5rem">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <Box
                    key={`collection-${item}`}
                    className={styles.collection}
                    borderRadius="13px"
                    p="0.7rem"
                >
                    <Grid
                        w="100%"
                        h="300px"
                        templateColumns="repeat(2, 1fr)"
                        templateRows="repeat(2, 1fr)"
                        autoFlow="dense"
                        gap="0.7rem"
                        mb="1.2rem"
                    >
                        <GridItem rowSpan={2}>
                            <Skeleton
                                borderRadius="10px"
                                startColor="#e7e7e7"
                                endColor="#6A6A6A"
                                h="100%"
                                w="100%"
                            />
                        </GridItem>
                        <GridItem>
                            <Skeleton
                                borderRadius="10px"
                                startColor="#e7e7e7"
                                endColor="#6A6A6A"
                                h="100%"
                                w="100%"
                            />
                        </GridItem>
                        <GridItem>
                            <Skeleton
                                borderRadius="10px"
                                startColor="#e7e7e7"
                                endColor="#6A6A6A"
                                h="100%"
                                w="100%"
                            />
                        </GridItem>
                    </Grid>

                    <Skeleton
                        startColor="#e7e7e7"
                        endColor="#6A6A6A"
                        borderRadius="3px"
                        w="30%"
                        h="15px"
                        mb="0.5rem"
                    />

                    <Flex w="100%" align="center" gap="0.8rem" mb="0.5rem">
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="15%"
                            h="15px"
                        />
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="20%"
                            h="15px"
                        />
                    </Flex>

                    <Flex w="100%" align="center" gap="0.8rem" mb="1.3rem">
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="40%"
                            h="15px"
                        />
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="20%"
                            h="15px"
                        />
                    </Flex>

                    <Flex w="100%" align="center" gap="0.8rem">
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="15%"
                            h="23px"
                        />
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="15%"
                            h="23px"
                        />
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="15%"
                            h="23px"
                        />
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            borderRadius="3px"
                            w="15%"
                            h="23px"
                        />
                    </Flex>
                </Box>
            ))}
        </Grid>
    );
};
