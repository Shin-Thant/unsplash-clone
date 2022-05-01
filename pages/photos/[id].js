import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/ImageDetails.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";

const getPhotoDetails = async ({ queryKey }) => {
    const [_key, id] = queryKey;

    if (id) {
        const { data } = await axios.get(
            `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
        );

        return data;
    }
};

function ImageDetail({ image }) {
    const router = useRouter();
    const [isFetched, setIsFetched] = useState(false);

    const { isLoading, data, error } = useQuery(
        ["imgDetails", router?.query?.id],
        getPhotoDetails,
        {
            staleTime: 3600000,
        }
    );

    useEffect(() => {
        console.log(isFetched);
    }, [isFetched]);

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);
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
                px={{ base: "0.8rem", sm: "1.1rem", lg: "1.2rem" }}
                mt="1.5rem"
                mb="3rem"
            >
                <Box
                    w="100%"
                    bg="white"
                    borderRadius="15px"
                    p="1.3rem"
                    boxShadow="xl"
                >
                    <Flex justify="center" align="flex-start" gap="1.5rem">
                        {isLoading ? (
                            <Skeleton
                                w="100%"
                                h="420px"
                                borderRadius="15px"
                                startColor="#F0F0F0"
                                endColor="#6A6A6A"
                            />
                        ) : (
                            <Box
                                className={styles.imgContainer}
                                borderRadius="15px"
                                bg="rgb(168, 168, 168)"
                            >
                                {data?.urls?.regular ||
                                data?.urls?.thumb ||
                                data?.urls?.full ||
                                data?.urls?.raw ? (
                                    <LazyLoadImage
                                        src={
                                            data?.urls?.regular ||
                                            data?.urls?.thumb ||
                                            data?.urls?.full ||
                                            data?.urls?.raw
                                        }
                                        alt={
                                            data?.description ||
                                            data?.alt_description ||
                                            ""
                                        }
                                        width="100%"
                                        maxheight="100%"
                                        style={{
                                            objectFit: "cover",
                                            minHeight:
                                                data?.height > 3000
                                                    ? data?.height > 4000
                                                        ? data?.height > 5000
                                                            ? data?.height >=
                                                              6000
                                                                ? "400px"
                                                                : "270px"
                                                            : "250px"
                                                        : "210px"
                                                    : "200px",
                                        }}
                                    />
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
                            </Box>
                        )}
                        <Box className={styles.contentContainer}>
                            <Flex align="center" gap="0.8rem">
                                <Image
                                    width="45px"
                                    height="45px"
                                    objectFit="cover"
                                    borderRadius="50%"
                                    src={data?.user?.profile_image?.large}
                                    alt={data?.user?.username}
                                />
                                <Text>
                                    {data?.user?.name ?? data?.user?.username}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    );
}

export default ImageDetail;

// export const getStaticPaths = async () => {
//     const { data } = await axios.get(
//         `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
//     );

//     const paths = data.map((img) => {
//         return {
//             params: {
//                 id: img?.id,
//             },
//         };
//     });

//     return {
//         paths,
//         fallback: true,
//     };
// };

// export const getStaticProps = async (context) => {
//     const id = context.params?.id;

//     const { data } = await axios.get(
//         `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
//     );

//     return {
//         props: { image: data },
//     };
// };
