import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CardList } from "../../components/containers/CardList";
import styles from "../../styles/CollectionDetails.module.css";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Pagination } from "../../components/shared-items/Pagination";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";
import axios from "../../services/axios";
import { CollectionSkeleton } from "../../components/skeletons/CollectionSkeleton";
import { CollectionList } from "../../components/containers/CollectionList";

const getCollectionPhotos = async ({ queryKey }) => {
    const [_key, id, page] = queryKey;

    const { data } = await axios.get(
        `collections/${id}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=18&page=${page}`
    );

    return data;
};

const getCollection = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    if (id) {
        const { data } = await axios.get(
            `collections/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
        );
        return data;
    }

    return [];
};

const getRelatedCollections = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    if (id) {
        const { data } = await axios.get(
            `collections/${id}/related?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
        );
        return data;
    }

    return [];
};

export default function CollectionDetails() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { data: photos, isLoading } = useQuery(
        ["collectionPhotos", router?.query?.id, page],
        getCollectionPhotos,
        {
            keepPreviousData: true,
            staleTime: 10800000,
        }
    );
    const { data: collection, isLoading: collectionLoading } = useQuery(
        ["collection", router?.query?.id],
        getCollection,
        {
            staleTime: 10800000,
        }
    );
    const { data: relatedCollection, isLoading: relatedLoading } = useQuery(
        ["related-collection", router?.query?.id],
        getRelatedCollections,
        {
            staleTime: 10800000,
        }
    );

    // const {data: }

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         window.scrollTo(0, 0);
    //     }
    // }, [page]);

    useEffect(() => {
        if (collection?.total_photos) {
            // total photos / items per page
            setTotalPages(Math.ceil(collection?.total_photos / 18));
        }
    }, [collection?.total_photos]);

    const [avgCards, setAvgCards] = useState(0);
    useEffect(() => {
        if (photos?.length) setAvgCards(photos?.length / 3);
    }, [photos]);

    const changePage = useCallback((num) => {
        setPage(num);
    }, []);

    const goUserDetails = () => {
        if (collection?.user?.username) {
            router.push(`/user/${collection?.user?.username}`);
        }
    };

    return (
        <>
            <Head>
                <title>Unsplash | Collection Details</title>
            </Head>
            <Box
                w="100%"
                mb={{ base: "0.9rem", lgMobile: "1rem", lg: "1.5rem" }}
                className={styles.colDetailsContainer}
            >
                <Box
                    w="100%"
                    position="relative"
                    pt="54vh"
                    className={styles["content-container"]}
                >
                    <Flex
                        align={
                            collection?.cover_photo?.width >
                            collection?.cover_photo?.height
                                ? "flex-start"
                                : "center"
                        }
                        w="100%"
                        height="55vh"
                        className={styles.heading}
                    >
                        <Image
                            zIndex={-1}
                            w="100%"
                            h="100%"
                            bg="white"
                            objectFit="cover"
                            src={collection?.cover_photo?.urls?.regular}
                            alt=""
                        />
                    </Flex>

                    {collection?.title?.length > 0 &&
                    collection?.user?.profile_image?.large?.length > 0 ? (
                        <Box
                            className={styles["heading-content"]}
                            opacity="0.95"
                        >
                            <Text
                                as="h1"
                                fontSize="2.5rem"
                                fontWeight="700"
                                mb="0.9rem"
                            >
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "tween",
                                        delay: 0.6,
                                        duration: 0.8,
                                    }}
                                >
                                    {collection?.title}
                                </motion.p>
                            </Text>

                            <motion.div
                                style={{
                                    width: "max-content",
                                }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.7,
                                    delay: 1,
                                }}
                            >
                                <Flex
                                    w="max-content"
                                    align="center"
                                    gap="0.5rem"
                                >
                                    <Image
                                        onClick={goUserDetails}
                                        cursor="pointer"
                                        w="40px"
                                        h="40px"
                                        borderRadius="50%"
                                        bg="gray.100"
                                        src={
                                            collection?.user?.profile_image
                                                ?.large
                                        }
                                        alt=""
                                    />
                                    <Link
                                        _focus={{
                                            border: "0px",
                                        }}
                                        href={`/user/${collection?.user?.username}`}
                                    >
                                        <Text
                                            onClick={goUserDetails}
                                            cursor="pointer"
                                            _hover={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            @{collection?.user?.username}
                                        </Text>
                                    </Link>
                                    <Text
                                        ml="1rem"
                                        border="2px solid white"
                                        borderRadius="5px"
                                        p="0.2rem 0.5rem"
                                    >
                                        {collection?.total_photos} Photo
                                        {collection?.total_photos > 1
                                            ? "s"
                                            : ""}
                                    </Text>
                                </Flex>
                            </motion.div>
                        </Box>
                    ) : (
                        ""
                    )}

                    <Box
                        w="100%"
                        px={{
                            base: "0",
                            lgMobile: "1rem",
                            lg: "1.5rem",
                        }}
                        pt="2rem"
                        borderRadius="20px"
                        bg="background"
                        className={styles.mainContent}
                    >
                        {page === 1 ? (
                            <Box
                                px={{ base: "0.5rem", lgMobile: "0" }}
                                fontSize="2rem"
                                fontWeight="700"
                                mb="3.5rem"
                                minHeight="40px"
                                w="100%"
                            >
                                {collection?.title?.length ? (
                                    <motion.h1
                                        initial={{
                                            opacity: 0,
                                            x: -25,
                                        }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.9,
                                        }}
                                    >
                                        {`Photos for ${collection?.title}`}
                                    </motion.h1>
                                ) : (
                                    ""
                                )}
                            </Box>
                        ) : (
                            ""
                        )}

                        {isLoading ? (
                            <CardSkeleton />
                        ) : (
                            <CardList data={photos} avgCards={avgCards} />
                        )}

                        <Box width="100%" mt="5rem">
                            <Pagination
                                changePage={changePage}
                                page={page}
                                totalPages={totalPages}
                            />
                        </Box>

                        <Box px={{ base: "0.5rem", lgMobile: "0" }}>
                            <motion.h1
                                initial={{
                                    x: -30,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                viewport={{
                                    once: true,
                                    margin: "0px 0px -30px 0px",
                                }}
                                transition={{
                                    type: "tween",
                                    duration: 0.7,
                                }}
                            >
                                <Text
                                    mt="3rem"
                                    fontSize="1.4rem"
                                    fontWeight="600"
                                    mb="2rem"
                                >
                                    Related Collections
                                </Text>
                            </motion.h1>

                            {relatedLoading ? (
                                <CollectionSkeleton />
                            ) : (
                                <CollectionList data={relatedCollection} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

// export const getStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: "blocking",
//     };
// };

export const getServerSideProps = async (context) => {
    const id = context?.params?.id;
    const queryClient = new QueryClient();

    // await queryClient.prefetchQuery(["collection", id], getCollection);

    await queryClient.prefetchQuery(
        ["collectionPhotos", id, 1],
        getCollectionPhotos
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
