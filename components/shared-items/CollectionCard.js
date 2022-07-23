import { Box, Flex, Grid, GridItem, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/CollectionCard.module.css";
// import Link from "next/link";

export const CollectionCard = ({ collection }) => {
    const router = useRouter();

    const goDetails = () => {
        collection?.id && router.push(`/collectionDetails/${collection?.id}`);
    };

    const goUserDetails = () => {
        collection?.user?.username &&
            router.push(`/user/${collection?.user?.username}`);
    };

    return (
        <Box
            w="100%"
            h="100%"
            className={styles.collection}
            borderRadius="13px"
            p="0.7rem"
        >
            <Grid
                onClick={goDetails}
                cursor="pointer"
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
                                    onClick={goDetails}
                                    cursor="pointer"
                                    width="100%"
                                    height="100%"
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
                                onClick={goDetails}
                                cursor="pointer"
                                width="100%"
                                height="100%"
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
                                    pointerEvents="none"
                                >
                                    <Text
                                        color="white"
                                        fontWeight="500"
                                        fontSize="1.05rem"
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
                                onClick={goDetails}
                                cursor="pointer"
                                width="100%"
                                height="100%"
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
                                onClick={goDetails}
                                cursor="pointer"
                                width="100%"
                                height="100%"
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
                                onClick={goDetails}
                                cursor="pointer"
                                width="100%"
                                height="100%"
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
                                    onClick={goDetails}
                                    cursor="pointer"
                                    width="100%"
                                    height="100%"
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
                <Link
                    _focus={{
                        border: "0px",
                    }}
                    href={`/user/${collection?.user?.username}`}
                >
                    <Text
                        onClick={goDetails}
                        fontSize="1.1rem"
                        fontWeight="bold"
                        mb="1rem"
                        cursor="pointer"
                        w="max-content"
                    >
                        {collection?.title}
                    </Text>
                </Link>

                <Box>
                    <Box fontWeight="500" color="myblack" mb="0.2rem">
                        <Flex
                            justify="center"
                            align="center"
                            display="inline-flex"
                            fontWeight="600"
                            border="1.5px solid"
                            borderColor="rgba(0, 0, 0, 0.8)"
                            color="brown-tea"
                            px="0.4rem"
                            borderRadius="5px"
                            fontSize="1rem"
                            mr="0.1rem"
                            position="relative"
                        >
                            {collection?.total_photos}
                        </Flex>{" "}
                        photo{collection?.total_photos > 1 && "s"}
                    </Box>
                    <Box fontWeight="500" color="myblack" mb="1rem">
                        Created by{" "}
                        <Link
                            _focus={{
                                border: "0px",
                            }}
                            href={`/user/${collection?.user?.username}`}
                        >
                            <Text
                                className={styles.username}
                                display="inline-block"
                                fontWeight="600"
                                color="myblack"
                                cursor="pointer"
                            >
                                {collection?.user?.name
                                    ? collection?.user?.name
                                    : collection?.user?.username}
                            </Text>
                        </Link>
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
                                                  className={styles.tags}
                                                  bg="transparent"
                                                  fontWeight="600"
                                                  p="0.3rem 0.8rem"
                                                  borderRadius="5px"
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
                                              className={styles.tags}
                                              bg="transparent"
                                              fontWeight="600"
                                              p="0.3rem 0.8rem"
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
