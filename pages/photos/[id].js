import {
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    Skeleton,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../../styles/ImageDetails.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { pageNum } from "../explore";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
    addImage,
    removeImage,
    selectAllIds,
} from "../../features/SavedImgSlice";
import { FaRegEye } from "react-icons/fa";
import { BsFillCalendarFill, BsFillCameraFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { CollectionList } from "../../components/containers/CollectionList";
import { motion } from "framer-motion";
import axios from "../../services/axios";

const getPhotoDetails = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    const { data } = await axios.get(
        `photos/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
    );

    return data;
};

function ImageDetail() {
    const router = useRouter();
    const dispatch = useDispatch();

    const ids = useSelector((state) => selectAllIds(state));

    const {
        isLoading,
        data: image,
        error,
    } = useQuery(["imgDetails", router?.query?.id], getPhotoDetails, {
        staleTime: 10800000,
    });

    const saveAndRemove = () => {
        if (ids?.includes(image?.id)) {
            console.log("existed");
            dispatch(removeImage(image?.id));
        } else {
            dispatch(addImage({ ...image }));
        }
    };

    return (
        <>
            <Head>
                <title>Unsplash | Image Detail</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Box
                w="100%"
                px={{ base: "0.8rem", sm: "1.1rem", xl: "1.2rem" }}
                mt="1.5rem"
                mb="1.5rem"
            >
                <Box
                    w="100%"
                    minHeight="80vh"
                    borderRadius="10px"
                    p="1rem"
                    bg="white"
                >
                    <Grid
                        templateColumns="max-content max-content 1fr"
                        alignItems="center"
                        gap="1rem"
                        px="2rem"
                        mb="2rem"
                    >
                        <GridItem>
                            <Image
                                width="42px"
                                height="42px"
                                objectFit="cover"
                                borderRadius="50%"
                                src={image?.user?.profile_image?.large}
                                alt={image?.user?.username}
                            />
                        </GridItem>
                        <GridItem>
                            <Text
                                fontSize="1.05rem"
                                fontWeight="600"
                                opacity="0.7"
                                cursor="pointer"
                                _hover={{
                                    opacity: "1",
                                }}
                                transition="all 250ms ease"
                            >
                                {image?.user?.name ?? image?.user?.username}
                            </Text>
                        </GridItem>
                        <GridItem justifySelf="flex-end">
                            <Flex gap="0.5rem">
                                <Box
                                    fontSize="1.1rem"
                                    bg="grey.third"
                                    cursor="pointer"
                                    borderRadius="5px"
                                    onClick={saveAndRemove}
                                    className={styles.addBtn}
                                    title={
                                        ids?.includes(image?.id)
                                            ? "Remove from list"
                                            : "Add to list"
                                    }
                                >
                                    <Box
                                        className={`${styles.addIcon} ${
                                            ids?.includes(image?.id)
                                                ? styles.added
                                                : ""
                                        }`}
                                        bg="black"
                                        borderRadius="50px"
                                    ></Box>
                                </Box>

                                <Box
                                    fontSize="1.4rem"
                                    bg="grey.third"
                                    p="0.5rem 0.6rem"
                                    cursor="pointer"
                                    borderRadius="8px"
                                    className={styles.downloadBtn}
                                >
                                    <a
                                        href={image?.links?.download}
                                        target="_blank"
                                        download
                                    >
                                        <FiDownload
                                            className={styles.downloadIcon}
                                        />
                                    </a>
                                </Box>
                            </Flex>
                        </GridItem>
                    </Grid>

                    {/* image display */}
                    <Flex
                        w="100%"
                        className={styles["image-side"]}
                        justify="center"
                        align="center"
                        mb="2.5rem"
                    >
                        {isLoading ? (
                            // <Skeleton
                            //     w="60%"
                            //     h="80vh"
                            //     borderRadius="15px"
                            //     startColor="#F0F0F0"
                            //     endColor="#6A6A6A"
                            // />
                            <div
                                style={{
                                    height: "30vh",
                                    backgroundColor: "tomato",
                                }}
                            >
                                hello world
                            </div>
                        ) : image &&
                          image?.urls?.regular &&
                          image?.urls?.thumb &&
                          image?.urls?.full &&
                          image?.urls?.raw ? (
                            <div
                                // layout={true}
                                // initial={{
                                //     width: "300px",
                                //     height: "300px",
                                // }}
                                // animate={{
                                //     width: "max-content",
                                //     height: "83vh",
                                // }}
                                // transition={{
                                //     duration: 0.5,
                                //     delay: 1,
                                // }}
                                className={styles.imgContainer}
                                bg="rgb(168, 168, 168)"
                            >
                                <img
                                    className={styles.image}
                                    src={
                                        image?.urls?.regular ||
                                        image?.urls?.full ||
                                        image?.urls?.thumb ||
                                        image?.urls?.raw
                                    }
                                    alt={
                                        image?.description ||
                                        image?.alt_description ||
                                        ""
                                    }
                                />
                            </div>
                        ) : (
                            <Flex
                                w="100%"
                                h="420px"
                                bg="grey.first"
                                justify="center"
                                align="center"
                                borderRadius="15px"
                            >
                                Image not available!
                            </Flex>
                        )}
                    </Flex>

                    {/* show when we have image links */}
                    {image?.urls?.regular &&
                    image?.urls?.thumb &&
                    image?.urls?.full &&
                    image?.urls?.raw ? (
                        <>
                            {/* image information */}
                            <Box
                                className={styles["content-side"]}
                                px="2rem"
                                mb="3rem"
                            >
                                <Flex gap="1rem" mb="2rem">
                                    <Flex
                                        width="max-content"
                                        minWidth="150px"
                                        align="center"
                                        border="2px solid"
                                        borderColor="myblack"
                                        borderRadius="10px"
                                        gap="1rem"
                                        pr="0.8rem"
                                        overflow="hidden"
                                    >
                                        <Flex
                                            bg="brown.1000"
                                            color="white"
                                            p="0.7rem 0.8rem"
                                        >
                                            <FaRegEye fontSize="1.2rem" />
                                        </Flex>
                                        <Text
                                            fontSize="0.95rem"
                                            fontWeight="500"
                                        >
                                            {isLoading
                                                ? "--"
                                                : image?.views || "--"}
                                        </Text>
                                    </Flex>

                                    <Flex
                                        width="max-content"
                                        minWidth="150px"
                                        align="center"
                                        border="2px solid"
                                        borderColor="myblack"
                                        borderRadius="10px"
                                        gap="1rem"
                                        pr="0.8rem"
                                        overflow="hidden"
                                    >
                                        <Flex
                                            bg="brown.1000"
                                            color="white"
                                            p="0.7rem 0.8rem"
                                        >
                                            <FiDownload fontSize="1.2rem" />
                                        </Flex>
                                        <Text
                                            fontSize="0.95rem"
                                            fontWeight="500"
                                        >
                                            {isLoading
                                                ? "--"
                                                : image?.downloads || "--"}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Box>
                                    <Flex
                                        align="center"
                                        gap="0.8rem"
                                        mb="0.5rem"
                                    >
                                        <IoLocationSharp fontSize="1.3rem" />
                                        {image?.location?.title ? (
                                            <Box
                                                fontWeight="500"
                                                position="relative"
                                                overflow="hidden"
                                            >
                                                <motion.p
                                                    whileInView={{
                                                        x: "100%",
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        margin: "0px 0px -40px 0px",
                                                    }}
                                                    transition={{
                                                        type: "tween",
                                                        duration: 1.4,
                                                    }}
                                                    className={
                                                        styles["text-cover"]
                                                    }
                                                ></motion.p>
                                                {image?.location?.title}
                                            </Box>
                                        ) : (
                                            <Text>--</Text>
                                        )}
                                    </Flex>

                                    <Flex
                                        align="center"
                                        gap="0.8rem"
                                        mb="0.5rem"
                                    >
                                        <BsFillCalendarFill fontSize="1.2rem" />
                                        {image?.created_at ? (
                                            <Box
                                                fontWeight="500"
                                                position="relative"
                                                overflow="hidden"
                                            >
                                                <motion.p
                                                    whileInView={{
                                                        x: "100%",
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        margin: "0px 0px -35px 0px",
                                                    }}
                                                    transition={{
                                                        type: "tween",
                                                        duration: 1.4,
                                                    }}
                                                    className={
                                                        styles["text-cover"]
                                                    }
                                                ></motion.p>
                                                Published on{" "}
                                                {image?.created_at
                                                    ?.split("")
                                                    ?.slice(
                                                        0,
                                                        image?.created_at?.indexOf(
                                                            image?.created_at
                                                                ?.split("")
                                                                .find(
                                                                    (item) =>
                                                                        item ===
                                                                        "T"
                                                                )
                                                        )
                                                    )
                                                    .join("")}
                                            </Box>
                                        ) : (
                                            <Text>--</Text>
                                        )}
                                    </Flex>

                                    <Flex align="center" gap="0.8rem">
                                        <BsFillCameraFill fontSize="1.2rem" />
                                        {image?.exif?.name ? (
                                            <Box
                                                fontWeight="500"
                                                position="relative"
                                                overflow="hidden"
                                            >
                                                <motion.p
                                                    whileInView={{
                                                        x: "100%",
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        margin: "0px 0px -30px 0px",
                                                    }}
                                                    transition={{
                                                        type: "tween",
                                                        duration: 1.4,
                                                    }}
                                                    className={
                                                        styles["text-cover"]
                                                    }
                                                ></motion.p>
                                                {image?.exif?.name}
                                            </Box>
                                        ) : (
                                            <Text>--</Text>
                                        )}
                                    </Flex>
                                </Box>
                            </Box>

                            {/* related collection */}
                            {image?.related_collections?.total ? (
                                <Box px="2rem" mb="2rem">
                                    <motion.h2
                                        initial={{
                                            x: -25,
                                            opacity: 0,
                                        }}
                                        whileInView={{
                                            x: 0,
                                            opacity: 1,
                                        }}
                                        viewport={{
                                            once: true,
                                            margin: "0px 0px -25px 0px",
                                        }}
                                        transition={{
                                            type: "tween",
                                            duration: 0.6,
                                        }}
                                        className={styles["related-text"]}
                                    >
                                        Related Collections
                                    </motion.h2>

                                    <CollectionList
                                        data={
                                            image?.related_collections?.results
                                        }
                                    />
                                </Box>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
        </>
    );
}

export default ImageDetail;

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps = async (context) => {
    const queryClient = new QueryClient();

    const id = context.params?.id;

    await queryClient.prefetchQuery(["imgDetails", id], getPhotoDetails);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
