import {
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    position,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { ImgCard } from "../shared-items/ImgCard";

export const CardList = ({ data, avgCards }) => {
    return (
        <Box w="100%">
            {data?.length < 1 ? (
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
                        No Images
                    </Text>
                </Flex>
            ) : data?.length > 0 && data?.length <= 3 ? (
                <Grid
                    w="100%"
                    templateColumns={{
                        base: "1fr",
                        lgMobile: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gridGap={{
                        sm: "1.1rem",
                        lg: "1.25rem",
                    }}
                >
                    {data?.map((img) => (
                        <GridItem
                            w="100%"
                            mb={{ base: "1.25rem", lgMobile: "" }}
                            key={img?.id}
                        >
                            <ImgCard
                                id={img?.id}
                                width={img?.width}
                                height={img?.height}
                                description={
                                    img?.description || img?.alt_description
                                }
                                imgs={img?.urls}
                                links={img?.links}
                                blur_hash={img?.blur_hash}
                                categories={img?.categories}
                                current_user_collections={
                                    img?.current_user_collections
                                }
                                user={img?.user}
                                item={img}
                            />
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <Grid
                    zIndex="15"
                    w="100%"
                    gridTemplateColumns={{
                        base: "1fr",
                        lgMobile: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    alignItems="flex-start"
                    gridColumnGap={{
                        sm: "1.1rem",
                        lg: "1.25rem",
                    }}
                >
                    {/* for laptop screens */}
                    <Box
                        display={{ base: "none", lg: "grid" }}
                        gridRowGap={{
                            sm: "1.1rem",
                            lg: "1.25rem",
                        }}
                        height="max-content"
                    >
                        {data?.slice(0, avgCards).map((img) => (
                            <ImgCard
                                key={img?.id}
                                id={img?.id}
                                width={img?.width}
                                height={img?.height}
                                description={
                                    img?.description || img?.alt_description
                                }
                                imgs={img?.urls}
                                links={img?.links}
                                blur_hash={img?.blur_hash}
                                categories={img?.categories}
                                current_user_collections={
                                    img?.current_user_collections
                                }
                                user={img?.user}
                                item={img}
                            />
                        ))}
                    </Box>

                    <Box
                        display={{ base: "none", lg: "grid" }}
                        gridRowGap={{
                            sm: "1.1rem",
                            lg: "1.25rem",
                        }}
                        height="max-content"
                    >
                        {data
                            ?.slice(avgCards, avgCards * 2)
                            .map((img, index) => (
                                <ImgCard
                                    key={img?.id}
                                    id={img?.id}
                                    width={img?.width}
                                    height={img?.height}
                                    description={
                                        img?.description || img?.alt_description
                                    }
                                    imgs={img?.urls}
                                    links={img?.links}
                                    blur_hash={img?.blur_hash}
                                    categories={img?.categories}
                                    current_user_collections={
                                        img?.current_user_collections
                                    }
                                    user={img?.user}
                                    item={img}
                                />
                            ))}
                    </Box>

                    <Box
                        display={{ base: "none", lg: "grid" }}
                        gridRowGap={{
                            sm: "1.1rem",
                            lg: "1.25rem",
                        }}
                        height="max-content"
                    >
                        {data
                            ?.slice(avgCards * 2, data?.length + 1)
                            .map((img) => (
                                <ImgCard
                                    key={img?.id}
                                    id={img?.id}
                                    width={img?.width}
                                    height={img?.height}
                                    description={
                                        img?.description || img?.alt_description
                                    }
                                    imgs={img?.urls}
                                    links={img?.links}
                                    blur_hash={img?.blur_hash}
                                    categories={img?.categories}
                                    current_user_collections={
                                        img?.current_user_collections
                                    }
                                    user={img?.user}
                                    item={img}
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
                                description={
                                    img?.description || img?.alt_description
                                }
                                imgs={img?.urls}
                                links={img?.links}
                                blur_hash={img?.blur_hash}
                                categories={img?.categories}
                                current_user_collections={
                                    img?.current_user_collections
                                }
                                user={img?.user}
                                item={img}
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
                        {data
                            ?.slice(data?.length / 2, data?.length + 1)
                            .map((img) => (
                                <ImgCard
                                    key={img?.id}
                                    id={img?.id}
                                    width={img?.width}
                                    height={img?.height}
                                    description={
                                        img?.description || img?.alt_description
                                    }
                                    imgs={img?.urls}
                                    links={img?.links}
                                    blur_hash={img?.blur_hash}
                                    categories={img?.categories}
                                    current_user_collections={
                                        img?.current_user_collections
                                    }
                                    user={img?.user}
                                    item={img}
                                />
                            ))}
                    </Box>

                    <Box
                        display={{ base: "grid", lgMobile: "none" }}
                        gridRowGap={{ base: "1.5rem", sm: "1.6rem" }}
                        height="max-content"
                    >
                        {data?.map((img) => (
                            <ImgCard
                                key={img?.id}
                                id={img?.id}
                                width={img?.width}
                                height={img?.height}
                                description={
                                    img?.description || img?.alt_description
                                }
                                imgs={img?.urls}
                                links={img?.links}
                                blur_hash={img?.blur_hash}
                                categories={img?.categories}
                                current_user_collections={
                                    img?.current_user_collections
                                }
                                user={img?.user}
                                item={img}
                            />
                        ))}
                    </Box>
                </Grid>
            )}
        </Box>
    );
};
