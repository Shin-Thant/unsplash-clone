import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImgCard } from "./ImgCard";

export const CardList = ({ data, avgCards }) => {
    useEffect(() => {
        data?.length && console.log(data);
    }, [data]);

    return (
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
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
                        name={img?.user?.name}
                        username={img?.user?.username}
                        profileImgs={img?.user?.profile_image}
                    />
                ))}
            </Box>
        </Grid>
    );
};
