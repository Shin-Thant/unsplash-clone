import { Box, Grid, Skeleton } from "@chakra-ui/react";
import React from "react";

export const CardSkeleton = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                lgMobile: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gridColumnGap="1.2rem"
            alignItems="start"
        >
            <Box display="grid" gridRowGap="1.2rem" height="max-content">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Skeleton
                        key={item}
                        startColor="#F0F0F0"
                        endColor="#6A6A6A"
                        borderRadius="15px"
                        height={
                            item === 2
                                ? "250px"
                                : item === 5
                                ? "280px"
                                : item === 7
                                ? "250px"
                                : "550px"
                        }
                    />
                ))}
            </Box>
            <Box display="grid" gridRowGap="1.2rem" height="max-content">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Skeleton
                        key={item}
                        startColor="#F0F0F0"
                        endColor="#6A6A6A"
                        borderRadius="15px"
                        height={
                            item === 1
                                ? "280px"
                                : item === 2
                                ? "250px"
                                : item === 5
                                ? "280px"
                                : item === 7
                                ? "250px"
                                : "500px"
                        }
                    />
                ))}
            </Box>
            <Box
                display={{ base: "none", md: "grid" }}
                gridRowGap="1.2rem"
                height="max-content"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Skeleton
                        key={item}
                        startColor="#F0F0F0"
                        endColor="#6A6A6A"
                        borderRadius="15px"
                        height={
                            item === 4
                                ? "250px"
                                : item === 6
                                ? "280px"
                                : item === 8
                                ? "250px"
                                : "550px"
                        }
                    />
                ))}
            </Box>
        </Grid>
    );
};
