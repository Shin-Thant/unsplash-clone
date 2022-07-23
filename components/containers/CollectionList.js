import React from "react";
import { Box, Flex, Grid, Text, Image, GridItem } from "@chakra-ui/react";
import { CollectionCard } from "../shared-items/CollectionCard";

export const CollectionList = ({ data }) => {
    return (
        <Box width="100%">
            {data?.length > 0 ? (
                <Grid
                    mx="auto"
                    width="100%"
                    justifyContent="space-between"
                    templateColumns={{
                        base: "1fr",
                        collectionBreak: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={{
                        base: "1.5rem",
                        collectionBreak: "1rem",
                        xl: "1.3rem",
                    }}
                >
                    {data?.map((item) => (
                        <GridItem key={item?.id} width="100%">
                            <CollectionCard collection={item} />
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <Flex
                    w="100%"
                    minHeight="60vh"
                    flexDir="column"
                    justify="center"
                    align="center"
                >
                    <Image
                        src="/empty-img.svg"
                        alt="No Images"
                        width={{ base: "90%", lgMobile: "350px" }}
                        objectFit="cover"
                    />
                    <Text
                        textAlign="center"
                        mt="1rem"
                        fontWeight="600"
                        fontSize="1.1rem"
                    >
                        No Collections
                    </Text>
                </Flex>
            )}
        </Box>
    );
};
