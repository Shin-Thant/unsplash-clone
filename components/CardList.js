import { Box, Flex, Grid, Image, position, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImgCard } from "./ImgCard";

export const CardList = ({ data, avgCards }) => {
    return data?.length < 1 ? (
        <Flex w="100%" minHeight="60vh" justify="center" align="center">
            <Box
                w={{
                    base: "50%",
                    mobile: "45%",
                    sm: "37%",
                    miniTablet: "30%",
                    md: "28%",
                    lg: "27%",
                    xl: "25%",
                }}
            >
                <Image
                    src="/archive.svg"
                    alt="No Images"
                    w="100%"
                    objectFit="cover"
                />
                <Text
                    textAlign="center"
                    mt="1.5rem"
                    fontWeight="600"
                    fontSize="1.1rem"
                >
                    No Images
                </Text>
            </Box>
        </Flex>
    ) : (
        <Grid
            zIndex="15"
            w="100%"
            gridTemplateColumns={{
                base: "1fr",
                lgMobile: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            alignItems="start"
            gridColumnGap={{
                sm: "1.1rem",
                lg: "1.2rem",
            }}
        >
            {/* for laptop screens */}
            <Box
                display={{ base: "none", lg: "grid" }}
                gridRowGap={{
                    sm: "1.1rem",
                    lg: "1.2rem",
                }}
                height="max-content"
            >
                {data?.slice(0, avgCards).map((img) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>

            <Box
                display={{ base: "none", lg: "grid" }}
                gridRowGap={{
                    sm: "1.1rem",
                    lg: "1.2rem",
                }}
                height="max-content"
            >
                {data?.slice(avgCards, avgCards * 2).map((img, index) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>

            <Box
                display={{ base: "none", lg: "grid" }}
                gridRowGap={{
                    sm: "1.1rem",
                    lg: "1.2rem",
                }}
                height="max-content"
            >
                {data?.slice(avgCards * 2, data?.length + 1).map((img) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>

            {/* for tablet screens */}
            <Box
                display={{
                    base: "none",
                    lgMobile: "grid",
                    lg: "none",
                }}
                gridRowGap={{
                    sm: "1.1rem",
                }}
                height="max-content"
            >
                {data?.slice(0, data?.length / 2).map((img) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>
            <Box
                display={{
                    base: "none",
                    lgMobile: "grid",
                    lg: "none",
                }}
                gridRowGap={{
                    sm: "1.1rem",
                }}
                height="max-content"
            >
                {data?.slice(data?.length / 2, data?.length + 1).map((img) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>

            <Box
                display={{ base: "grid", lgMobile: "none" }}
                gridRowGap={{ base: "1.1rem", sm: "1.3rem" }}
                height="max-content"
            >
                {data?.map((img) => (
                    <ImgCard
                        key={img?.id}
                        id={img?.id}
                        width={img?.width}
                        height={img?.height}
                        description={img?.description || img?.alt_description}
                        imgs={img?.urls}
                        links={img?.links}
                        blur_hash={img?.blur_hash}
                        categories={img?.categories}
                        current_user_collections={img?.current_user_collections}
                        user={img?.user}
                    />
                ))}
            </Box>
        </Grid>
    );
};
