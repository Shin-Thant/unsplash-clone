import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Collection.module.css";

export const Collection = ({ collection }) => {
    const router = useRouter();

    return (
        <Box className={styles.collection} borderRadius="13px" p="0.7rem">
            <Grid
                w="100%"
                h="300px"
                templateColumns={
                    collection?.preview_photos?.length >= 2
                        ? "repeat(2, 1fr)"
                        : "repeat(1, 1fr)"
                }
                templateRows="repeat(2, 1fr)"
                autoFlow="dense"
                gap="0.7rem"
                mb="1rem"
            >
                {collection?.preview_photos?.length >= 3 ? (
                    <>
                        <GridItem
                            overflow="hidden"
                            className={styles.gridItem}
                            rowSpan={2}
                        >
                            {
                                <Image
                                    className={styles.photos}
                                    src={
                                        collection?.preview_photos[0]?.urls
                                            ?.regular
                                    }
                                    alt={collection?.title}
                                />
                            }
                        </GridItem>
                        <GridItem overflow="hidden" className={styles.gridItem}>
                            <Image
                                className={styles.photos}
                                src={
                                    collection?.preview_photos[1]?.urls?.regular
                                }
                                alt={collection?.title}
                            />
                        </GridItem>
                        <GridItem
                            overflow="hidden"
                            position="relative"
                            cursor="default"
                            className={`${styles.gridItem} ${styles.lastGridItem}`}
                        >
                            {collection?.total_photos > 3 && (
                                <Flex
                                    justify="center"
                                    align="center"
                                    className={styles.morePhotos}
                                >
                                    <Text
                                        color="white"
                                        fontWeight="500"
                                        fontSize="1.15rem"
                                    >
                                        +{" "}
                                        {parseInt(collection?.total_photos) -
                                            3 >
                                        1000
                                            ? `${(
                                                  (parseInt(
                                                      collection?.total_photos
                                                  ) -
                                                      3) /
                                                  1000
                                              ).toFixed(1)}k`
                                            : parseInt(
                                                  collection?.total_photos
                                              ) - 3}
                                        {/* {parseInt(collection?.total_photos) - 3} */}
                                    </Text>
                                </Flex>
                            )}

                            <Image
                                className={styles.photos}
                                src={
                                    collection?.preview_photos[2]?.urls?.regular
                                }
                                alt={collection?.title}
                            />
                        </GridItem>
                    </>
                ) : collection?.preview_photos?.length === 2 ? (
                    <>
                        <GridItem
                            overflow="hidden"
                            rowSpan={2}
                            className={styles.gridItem}
                        >
                            <Image
                                className={styles.photos}
                                src={
                                    collection?.preview_photos[0]?.urls?.regular
                                }
                                alt={collection?.title}
                            />
                        </GridItem>
                        <GridItem
                            overflow="hidden"
                            rowSpan={2}
                            className={styles.gridItem}
                        >
                            <Image
                                className={styles.photos}
                                src={
                                    collection?.preview_photos[1]?.urls?.regular
                                }
                                alt={collection?.title}
                            />
                        </GridItem>
                    </>
                ) : (
                    collection?.preview_photos?.length === 1 && (
                        <>
                            <GridItem
                                overflow="hidden"
                                rowSpan={2}
                                className={styles.gridItem}
                            >
                                <Image
                                    className={styles.photos}
                                    src={
                                        collection?.preview_photos[0]?.urls
                                            ?.regular
                                    }
                                    alt={collection?.title}
                                />
                            </GridItem>
                        </>
                    )
                )}
            </Grid>

            <Box p="0.5rem" w="100%">
                <Text fontSize="1.3rem" fontWeight="bold" mb="1rem">
                    {collection?.title}
                </Text>

                <Box>
                    <Box fontWeight="400" color="myblack" mb="0.2rem">
                        <Text
                            display="inline-block"
                            fontWeight="600"
                            fontSize="1.05rem"
                        >
                            {collection?.total_photos}
                        </Text>{" "}
                        photo{collection?.total_photos > 1 && "s"}
                    </Box>
                    <Box fontWeight="400" color="myblack" mb="1rem">
                        Created by{" "}
                        <Text
                            className={styles.username}
                            display="inline-block"
                            fontWeight="600"
                            fontSize="1.05rem"
                            cursor="pointer"
                        >
                            {collection?.user?.name
                                ? collection?.user?.name
                                : collection?.user?.username}
                        </Text>
                    </Box>
                    <Flex align="center" gap="0.8rem" wrap="wrap">
                        {collection?.tags?.filter(
                            (tag) => tag?.type === "search"
                        )?.length
                            ? collection?.tags
                                  ?.filter((tag) => tag?.type === "search")
                                  ?.map(
                                      (t, index) =>
                                          index < 3 && (
                                              <Box
                                                  onClick={() =>
                                                      router.push(
                                                          `/search/${t?.title}`
                                                      )
                                                  }
                                                  key={`${t.title}${index}`}
                                                  bg="myblack"
                                                  p="0.3rem 0.8rem"
                                                  color="white"
                                                  borderRadius="8px"
                                                  fontSize="0.9rem"
                                                  cursor="pointer"
                                              >
                                                  {t.title}
                                              </Box>
                                          )
                                  )
                            : collection?.tags?.map(
                                  (tag, index) =>
                                      index < 3 && (
                                          <Box
                                              onClick={() =>
                                                  router.push(
                                                      `/search/${tag?.title}`
                                                  )
                                              }
                                              key={`${tag.title}${index}`}
                                              bg="myblack"
                                              p="0.3rem 0.8rem"
                                              color="white"
                                              borderRadius="8px"
                                              fontSize="0.9rem"
                                              cursor="pointer"
                                          >
                                              {tag?.title}
                                          </Box>
                                      )
                              )}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};
