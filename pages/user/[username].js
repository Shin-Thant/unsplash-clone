import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styles from "../../styles/UserDetails.module.css";
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    storageKey,
    Text,
} from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";
import { CardList } from "../../components/containers/CardList";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from "../../services/axios";

const getUserProfile = async ({ queryKey }) => {
    const [_key, username] = queryKey;

    if (username) {
        const { data } = await axios.get(
            `users/${username}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
        );
        return data;
    }

    return [];
};

const getUserPhotos = async ({ queryKey }) => {
    const [_key, username, field, page] = queryKey;

    if ((username, field, page)) {
        const { data } = await axios.get(
            `users/${username}/${field}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=10&page=${page}`
        );
        return data;
    }

    return [];
};

const IconBox = ({ alone, link, children }) => {
    return (
        <Link href={`https://instagram.com/`}>
            <Flex
                w="max-content"
                h="max-content"
                fontSize="1.6rem"
                border={alone ? "" : "1.5px solid"}
                borderColor="myblack"
                borderRadius="8px"
                p={alone ? "" : "0.4rem"}
                cursor="pointer"
                opacity="0.7"
                _hover={{
                    opacity: "1",
                }}
                transition="opacity 250ms ease"
            >
                {children}
            </Flex>
        </Link>
    );
};

export default function UserDetails() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [field, setField] = useState("photos");
    const [avgCards, setAvgCards] = useState(0);

    const { isLoading: photosLoading, data: photos } = useQuery(
        ["userPhotos", router?.query?.username, field, page],
        getUserPhotos,
        {
            staleTime: 10800000,
        }
    );

    const { isLoading: profileLoading, data: profile } = useQuery(
        ["userProfile", router?.query?.username],
        getUserProfile,
        { staleTime: 10800000 }
    );

    // scrolling top
    useEffect(() => {
        if (typeof window !== undefined) window.scrollTo(0, 0);
    }, []);

    // setting average card
    useEffect(() => {
        if (photos?.length) {
            setAvgCards(Math.floor(photos?.length / 3));
        }
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
                {/* change this with username or user's name */}
                <title>
                    User Details |{" "}
                    {router?.query?.username
                        ? `@${router?.query?.username}`
                        : "Unsplash"}
                </title>
            </Head>
            <Box
                w="100%"
                px={{ base: "0.8rem", sm: "1.1rem", lg: "1.2rem" }}
                mt={{ base: "6rem", lg: "2rem" }}
                mb="3.5rem"
            >
                <Box
                    width="95%"
                    minHeight="50vh"
                    mx="auto"
                    borderRadius="20px"
                    bg="white"
                    px="1.8rem"
                    py="2rem"
                    shadow="lg"
                    mt="10%"
                    position="relative"
                >
                    <Flex
                        className={styles.profileImg}
                        justify="center"
                        align="center"
                        width="180px"
                        height="180px"
                        borderRadius="50%"
                        bg="background"
                    >
                        <Image
                            src={profile?.profile_image?.large}
                            alt=""
                            width="145px"
                            height="145px"
                            borderRadius="50%"
                            objectFit="cover"
                            bg="white"
                            boxShadow="0 5px 10px rgba(0, 0, 0, 0.3)"
                        />
                    </Flex>

                    <Flex w="100%" align="center" flexDir="column" mt="5.5rem">
                        <Text fontSize="2.5rem" fontWeight="500">
                            {profile?.name}
                        </Text>

                        {profile?.bio ? (
                            <Flex
                                width="600px"
                                mt="0.8rem"
                                color="myblack"
                                fontWeight="500"
                                // fontSize="1.05rem"
                                opacity="0.85"
                                flexDir="column"
                                align="center"
                            >
                                {profile?.bio?.split("\r\n")?.length > 1 ? (
                                    profile?.bio
                                        ?.split("\r\n")
                                        ?.map((item) => <Text>{item}</Text>)
                                ) : (
                                    <Text
                                        textAlign="center"
                                        wordBreak="break-word"
                                    >
                                        {profile?.bio}
                                    </Text>
                                )}
                            </Flex>
                        ) : (
                            ""
                        )}

                        <Image
                            src="/decorate-line.svg"
                            alt="decoration line"
                            w="100px"
                            my="2rem"
                            objectFit="cover"
                        />

                        {/* location and link */}
                        {profile?.location?.length > 0 ? (
                            <Flex
                                width="max-content"
                                height="max-content"
                                justify="center"
                                align="center"
                                gap="1rem"
                                mb="1.2rem"
                            >
                                <Flex
                                    width="max-content"
                                    height="100%"
                                    align="center"
                                    gap="0.2rem"
                                >
                                    <IoLocationOutline fontSize="1.5rem" />
                                    <a
                                        href={`https://www.google.com/maps/search/${profile?.location?.replaceAll(
                                            ",",
                                            ""
                                        )}/`}
                                        target="_blank"
                                        className={styles.location}
                                    >
                                        {profile?.location}
                                    </a>
                                </Flex>

                                {!profile?.social?.instagram_username &&
                                profile?.social?.twitter_username ? (
                                    <>
                                        <Box
                                            bg="black"
                                            opacity="0.4"
                                            w="1px"
                                            height="20px"
                                            borderRadius="50px"
                                        ></Box>

                                        <IconBox
                                            link={
                                                profile?.social
                                                    ?.twitter_username
                                            }
                                            alone={
                                                profile?.social
                                                    ?.instagram_username
                                                    ? false
                                                    : true
                                            }
                                        >
                                            {/* <FiTwitter /> */}
                                            <Image
                                                src="/custom-twitter.svg"
                                                alt="Twitter-icon"
                                                width="36px"
                                                height="36px"
                                                objectFit="cover"
                                            />
                                        </IconBox>
                                    </>
                                ) : (
                                    ""
                                )}

                                {!profile?.social?.twitter_username &&
                                profile?.social?.instagram_username ? (
                                    <>
                                        <Box
                                            bg="black"
                                            opacity="0.4"
                                            w="1px"
                                            height="20px"
                                            borderRadius="50px"
                                        ></Box>

                                        <IconBox
                                            link={
                                                profile?.social
                                                    ?.instagram_username
                                            }
                                            alone={
                                                profile?.social
                                                    ?.twitter_username
                                                    ? false
                                                    : true
                                            }
                                        >
                                            {/* <FaInstagram /> */}
                                            <Image
                                                src="/custom-instagram.svg"
                                                alt="Instagram-icon"
                                                width="36px"
                                                height="36px"
                                                objectFit="cover"
                                            />
                                        </IconBox>
                                    </>
                                ) : (
                                    ""
                                )}
                            </Flex>
                        ) : (
                            ""
                        )}

                        {/* social links */}
                        {(!profile?.location &&
                            !profile?.social?.instagram_username) ||
                        (!profile?.location &&
                            !profile?.social?.twitter_username) ||
                        (profile?.social?.twitter_username &&
                            profile?.social?.instagram_username) ||
                        (!profile?.location &&
                            profile?.social?.instagram_username &&
                            profile?.social?.twitter_username) ? (
                            <Grid
                                minWidth="200px"
                                templateColumns="45% 3% 45%"
                                justifyContent="center"
                                alignItems="center"
                                gap="1rem"
                                mb="1.2rem"
                            >
                                {profile?.social?.twitter_username ? (
                                    <GridItem
                                        colSpan={
                                            profile?.social?.instagram_username
                                                ? ""
                                                : 3
                                        }
                                    >
                                        <Flex
                                            flexDir="column"
                                            justify="center"
                                            align="center"
                                            gap="0.5rem"
                                        >
                                            <IconBox
                                                link={
                                                    profile?.social
                                                        ?.twitter_username
                                                }
                                                alone={
                                                    profile?.social
                                                        ?.instagram_username
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <Image
                                                    src="/custom-twitter.svg"
                                                    alt="Twitter-icon"
                                                    width="28px"
                                                    height="28px"
                                                    objectFit="cover"
                                                />
                                            </IconBox>

                                            <Text
                                                fontSize="0.9rem"
                                                fontWeight="500"
                                                cursor="pointer"
                                            >
                                                Twitter
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                ) : (
                                    ""
                                )}

                                {profile?.social?.twitter_username &&
                                profile?.social?.instagram_username ? (
                                    <Box
                                        bg="black"
                                        opacity="0.4"
                                        w="1px"
                                        height="25px"
                                        borderRadius="50px"
                                    ></Box>
                                ) : (
                                    ""
                                )}

                                {profile?.social?.instagram_username ? (
                                    <GridItem
                                        colSpan={
                                            profile?.social?.twitter_username
                                                ? ""
                                                : 3
                                        }
                                    >
                                        <Flex
                                            flexDir="column"
                                            justify="center"
                                            align="center"
                                            gap="0.5rem"
                                        >
                                            <IconBox
                                                link={
                                                    profile?.social
                                                        ?.instagram_username
                                                }
                                                alone={
                                                    profile?.social
                                                        ?.twitter_username
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <Image
                                                    src="/custom-instagram.svg"
                                                    alt="Instagram-icon"
                                                    width="28px"
                                                    height="28px"
                                                    objectFit="cover"
                                                />
                                            </IconBox>
                                            <Text
                                                fontSize="0.9rem"
                                                fontWeight="500"
                                                cursor="pointer"
                                            >
                                                Instagram
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                ) : (
                                    ""
                                )}
                            </Grid>
                        ) : (
                            ""
                        )}

                        {/* follower, following and porfolio */}
                        <Flex w="max-content" align="center" gap="2rem">
                            <Flex flexDir="column" align="center">
                                <Text fontSize="1.4rem" fontWeight="600">
                                    {profile?.following_count || "-"}
                                </Text>
                                <Text fontSize="0.9rem" fontWeight="500">
                                    Following
                                </Text>
                            </Flex>

                            <Box
                                bg="black"
                                opacity="0.4"
                                w="1px"
                                height="20px"
                                borderRadius="50px"
                            ></Box>

                            <Flex flexDir="column" align="center">
                                <Text fontSize="1.4rem" fontWeight="600">
                                    {profile?.followers_count || "-"}
                                </Text>
                                <Text fontSize="0.9rem" fontWeight="500">
                                    Followers
                                </Text>
                            </Flex>

                            <Box
                                bg="black"
                                opacity="0.4"
                                w="1px"
                                height="20px"
                                borderRadius="50px"
                            ></Box>

                            <Flex flexDir="column" align="center">
                                <Text fontSize="1.4rem" fontWeight="600">
                                    {profile?.porfolio_url || "-"}
                                </Text>
                                <Text fontSize="0.9rem" fontWeight="500">
                                    Porfolio
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Image
                        src="/decorate-line.svg"
                        alt="decoration line"
                        w="100px"
                        mt="3.5rem"
                        mb="3rem"
                        mx="auto"
                        objectFit="cover"
                    />

                    {/* user's photo list  */}
                    <Box fontSize="1.6rem" mb="2rem">
                        <Text display="inline-block" mr="0.7rem">
                            Photos of
                        </Text>
                        <Text
                            display="inline-block"
                            fontWeight="600"
                            className={styles.username}
                        >
                            {profile?.name}
                            <motion.span
                                initial={{
                                    transform: "scaleX(0.4)",
                                }}
                                whileInView={{
                                    transform: "scaleX(1)",
                                }}
                                viewport={{
                                    once: true,
                                    margin: "0px 0px -50px 0px",
                                }}
                                transition={{
                                    type: "tween",
                                    duration: 0.7,
                                }}
                                className={styles.highlight}
                            ></motion.span>
                        </Text>
                    </Box>

                    <Flex gap="1rem">
                        <Text>Photos {profile?.total_photos}</Text>
                        <Text>Collections {profile?.total_collections}</Text>
                    </Flex>

                    <Box w="100%" mb="3rem">
                        {photosLoading ? (
                            <CardSkeleton />
                        ) : (
                            <CardList data={photos} avgCards={avgCards} />
                        )}
                    </Box>

                    {/* find how many pages will we get and then show pagination buttons */}
                    {profile?.total_photos / 10 > 1 && (
                        <Flex
                            justify="center"
                            align="center"
                            w="100%"
                            gap="2rem"
                            mt="2.8rem"
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
                                    zIndex="2"
                                    className={styles.previousBtn}
                                    onClick={goPrevious}
                                >
                                    <IoIosArrowBack fontSize="1.5rem" />
                                    <Text>Previous</Text>
                                </Flex>
                            )}
                            {page !== profile?.total_photos / 10 && (
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
                                    zIndex="2"
                                    className={styles.nextBtn}
                                    onClick={goNext}
                                >
                                    <Text>Next</Text>
                                    <IoIosArrowForward fontSize="1.5rem" />
                                </Flex>
                            )}
                        </Flex>
                    )}
                </Box>
            </Box>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const username = context.params?.username;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        ["userPhotos", username, "photos", 1],
        getUserPhotos
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
