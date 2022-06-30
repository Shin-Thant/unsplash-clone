import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CardList } from "../../components/CardList";
import { useCollection } from "../../context/CollectionContext";
import styles from "../../styles/CollectionDetails.module.css";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const getCollectionPhotos = async ({ queryKey }) => {
    const [_key, id, page] = queryKey;

    const { data } = await axios.get(
        `https://api.unsplash.com/collections/${id}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=18&page=${page}`
    );

    return data;
};

const getCollection = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    if (id) {
        const { data } = await axios.get(
            `https://api.unsplash.com/collections/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
        );
        return data;
    }

    return [];
};

export default function CollectionDetails() {
    const router = useRouter();
    const [page, setPage] = useState(1);

    const { data: photos, isLoading } = useQuery(
        ["collectionPhotos", router?.query?.id, page],
        getCollectionPhotos,
        {
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

    const fetchedPhotos = 18 * page;

    const [avgCards, setAvgCards] = useState(0);
    useEffect(() => {
        if (photos?.length) setAvgCards(photos?.length / 3);
    }, [photos]);

    const goPrevious = () => {
        // pageNum -= 1;
        setPage(page - 1);
        window.scrollTo(0, 0);
    };

    const goNext = () => {
        // pageNum += 1;
        setPage(page + 1);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Head>
                <title>Unsplash | Collection Details</title>
            </Head>
            <Box
                w="100%"
                // px={{ base: "0.8rem", sm: "1.1rem", lg: "1.3rem" }}
                mb="5rem"
            >
                <Box w="100%" position="relative" pt="53vh">
                    <Box w="100%" height="55vh" className={styles.heading}>
                        <Image
                            zIndex={-1}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            src={collection?.cover_photo?.urls?.full}
                            alt=""
                        />
                    </Box>

                    <Box className={styles["heading-content"]} opacity="0.95">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "tween",
                                delay: 0.6,
                                duration: 1.5,
                            }}
                        >
                            <Text
                                fontSize="2.5rem"
                                fontWeight="700"
                                mb="0.5rem"
                            >
                                {collection?.title}
                            </Text>
                        </motion.h1>

                        <motion.div
                            style={{
                                width: "max-content",
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "tween",
                                duration: 0.7,
                                delay: 2,
                            }}
                        >
                            <Flex w="max-content" align="center" gap="0.5rem">
                                <Image
                                    cursor="pointer"
                                    w="40px"
                                    h="40px"
                                    borderRadius="50%"
                                    bg="gray.100"
                                    src={collection?.user?.profile_image?.large}
                                    alt=""
                                />
                                <Text
                                    opacity="0.9"
                                    cursor="pointer"
                                    _hover={{
                                        textDecoration: "underline",
                                    }}
                                >
                                    @{collection?.user?.username}
                                </Text>
                                <Text
                                    ml="1rem"
                                    border="2px solid white"
                                    borderRadius="5px"
                                    p="0.2rem 0.5rem"
                                >
                                    {collection?.total_photos} Photo
                                    {collection?.total_photos > 1 ? "s" : ""}
                                </Text>
                            </Flex>
                        </motion.div>
                    </Box>

                    <Box
                        w="100%"
                        px="1.5rem"
                        pt="2rem"
                        pb="3rem"
                        borderRadius="20px"
                        bg="background"
                        className={styles.mainContent}
                    >
                        {page === 1 ? (
                            <Box
                                fontSize="2rem"
                                fontWeight="700"
                                mb="3.5rem"
                                minHeight="40px"
                                w="100%"
                                overflow="hidden"
                            >
                                {collection?.title ? (
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
                                        {page === 1
                                            ? `Photos for ${collection?.title}`
                                            : ""}
                                    </motion.h1>
                                ) : (
                                    ""
                                )}
                            </Box>
                        ) : (
                            ""
                        )}

                        {isLoading ? (
                            "loading"
                        ) : (
                            <CardList data={photos} avgCards={avgCards} />
                        )}
                    </Box>

                    <Flex
                        justify="center"
                        align="center"
                        w="100%"
                        gap="2rem"
                        pb="3rem"
                    >
                        {page > 1 && (
                            <Flex
                                align="center"
                                gap="0.3rem"
                                p={{
                                    base: "0.5rem 0.8rem",
                                    mobile: "0.6rem 1rem",
                                }}
                                borderRadius="8px"
                                fontWeight="600"
                                w="max-content"
                                cursor="pointer"
                                className={styles.previousBtn}
                                onClick={goPrevious}
                            >
                                <IoIosArrowBack fontSize="1.5rem" />
                                <Text>Prev</Text>
                            </Flex>
                        )}
                        {fetchedPhotos <= collection?.total_photos && (
                            <Flex
                                align="center"
                                gap="0.3rem"
                                p={{
                                    base: "0.5rem 0.8rem",
                                    mobile: "0.6rem 1rem",
                                }}
                                borderRadius="8px"
                                fontWeight="600"
                                w="max-content"
                                cursor="pointer"
                                className={styles.nextBtn}
                                onClick={goNext}
                            >
                                <Text>Next</Text>
                                <IoIosArrowForward fontSize="1.5rem" />
                            </Flex>
                        )}
                    </Flex>
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
