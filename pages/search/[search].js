import { Box, Flex, Text, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CardSkeleton } from "../../components/CardSkeleton";
import { ImgCard } from "../../components/ImgCard";
import { UpBtn } from "../../components/UpBtn";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "../../styles/Search.module.css";
import {
    BsImageFill,
    BsFillCollectionFill,
    BsPeopleFill,
} from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Collection } from "../../components/Collection";
import { CollectionSkeleton } from "../../components/CollectionSkeleton";
import { MdClose } from "react-icons/md";
import { CardList } from "../../components/CardList";
import { ImageFilter } from "../../components/filter/ImageFilter";

import { pageNum } from "../explore";
import { CollectionList } from "../../components/containers/CollectionList";
import { UsersList } from "../../components/containers/UsersList";

const getSearchedResults = async ({ queryKey }) => {
    const [_key, query, field, page, filters] = queryKey;

    // console.log(query, page, filters);

    // * Cleaning
    // const per_page =
    //     field === "photos"
    //         ? 30
    //         : field === "collections"
    //         ? 20
    //         : field === "users" && 20;
    const per_page = 18;

    const order_by = filters.order_by ? `&order_by=${filters.order_by}` : "";

    const orientation = filters.orientation
        ? `&orientation=${filters.orientation}`
        : "";

    const color = filters.color ? `&color=${filters.color}` : "";

    if (query && field) {
        const { data } = await axios.get(
            `https://api.unsplash.com/search/${field}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=${per_page}&page=${page}&query=${query}${order_by}${orientation}${color}`
        );

        return data;
    }

    return [];
};

export default function search() {
    const router = useRouter();

    const [avgCards, setAvgCards] = useState(0);

    const [active, setActive] = useState(1);

    const [page, setPage] = useState(1);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && page !== pageNum) pageNum = page;

        return () => {
            isMounted = false;
        };
    }, [page]);

    const [field, setField] = useState("photos");

    const [colors, setColors] = useState([
        "black",
        "white",
        "yellow",
        "orange",
        "red",
        "purple",
        "magenta",
        "green",
        "teal",
        "blue",
    ]);

    const [orientation, setOrientation] = useState("Any Orientation");
    const [color, setColor] = useState("Any Color");
    const [sort, setSort] = useState("Relevance");

    const [filters, setFilters] = useState({
        orientation: "",
        color: "",
        order_by: "",
    });

    const { isLoading, data } = useQuery(
        ["search", router.query?.search, field, page, filters],
        getSearchedResults,
        {
            staleTime: 86400000,
        }
    );

    // scrolling top
    useEffect(() => {
        if (typeof window !== undefined) window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (data?.results?.length) {
            setAvgCards(Math.floor(data?.results?.length / 3));
        }
    }, [data?.results]);

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

    const resetFilter = () => {
        setFilters({
            orientation: "",
            color: "",
            order_by: "",
        });
    };

    // * testing
    // useEffect(() => {
    //     if (data?.results?.length && field !== "photos") {
    //         console.log(data?.results);
    //     }
    // }, [data?.results]);

    useEffect(() => {
        switch (field) {
            case "photos":
                setActive(1);
                break;
            case "collections":
                setActive(2);
                break;
            case "users":
                setActive(3);
                break;
            default:
                setActive(0);
        }
    }, [field]);

    return (
        <>
            <Head>
                <title>Unsplash | Search</title>
            </Head>

            <Box
                w="100%"
                px={{ base: "0.8rem", sm: "1.1rem", lg: "1.2rem" }}
                mt="2rem"
                mb="3.5rem"
            >
                <UpBtn />

                <Box fontSize="2.8rem" fontWeight="600" mb="1.5rem">
                    {router.query?.search ? (
                        <Text w="max-content">
                            {router.query?.search
                                ?.replace(
                                    router.query?.search[0],
                                    router.query?.search[0].toUpperCase()
                                )
                                .replace("-", " ")}
                        </Text>
                    ) : (
                        <Skeleton
                            startColor="#e7e7e7"
                            endColor="#6A6A6A"
                            w="25%"
                            h="50px"
                        />
                    )}
                </Box>

                {/* Tabs */}
                <Flex
                    borderBottom="1px solid black"
                    w="100%"
                    align="center"
                    justify="space-evenly"
                    gap="5px"
                    h="max-content"
                    position="relative"
                    mb={field === "photos" ? "1.5rem" : "5rem"}
                    pb="1.5rem"
                >
                    <Flex
                        className={styles.boxes}
                        onClick={() => {
                            setField("photos");
                            setActive(1);
                        }}
                        color={active === 1 ? "brown.2000" : "black"}
                        justify="center"
                        align="center"
                        py="0.9rem"
                        borderRadius="10px"
                        cursor="pointer"
                        gap="0.8rem"
                        fontWeight="600"
                        title="Photos"
                    >
                        <Box
                            fontSize="1.5rem"
                            className={styles.tabIcons}
                            color={active === 1 ? "white" : "myblack"}
                        >
                            <BsImageFill className={styles.svgIcon} />
                        </Box>{" "}
                        <Flex
                            className={styles.tabs}
                            align="center"
                            gap="0.4rem"
                        >
                            <Text>Photos</Text>{" "}
                            {active === 1 && (
                                <Text>
                                    {data?.total >= 1000
                                        ? `${Math.floor(
                                              (data?.total / 1000).toFixed(1)
                                          )}k`
                                        : data?.total}
                                </Text>
                            )}
                        </Flex>
                    </Flex>

                    <Flex
                        className={styles.boxes}
                        onClick={() => {
                            setField("collections");
                            setActive(2);
                        }}
                        color={active === 2 ? "brown.2000" : "black"}
                        justify="center"
                        align="center"
                        py="1rem"
                        borderRadius="10px"
                        cursor="pointer"
                        gap="0.8rem"
                        fontWeight="600"
                        title="Collections"
                    >
                        <Box
                            fontSize="1.5rem"
                            className={styles.tabIcons}
                            color={active === 2 ? "white" : "myblack"}
                        >
                            <BsFillCollectionFill className={styles.svgIcon} />
                        </Box>{" "}
                        <Flex
                            className={styles.tabs}
                            align="center"
                            gap="0.4rem"
                        >
                            <Text>Collections</Text>{" "}
                            {active === 2 && (
                                <Text>
                                    {data?.total >= 1000
                                        ? `${Math.floor(
                                              (data?.total / 1000).toFixed(1)
                                          )}k`
                                        : data?.total}
                                </Text>
                            )}
                        </Flex>
                    </Flex>

                    <Flex
                        className={styles.boxes}
                        onClick={() => {
                            setField("users");
                            setActive(3);
                        }}
                        color={active === 3 ? "brown.2000" : "black"}
                        justify="center"
                        align="center"
                        py="1rem"
                        borderRadius="10px"
                        cursor="pointer"
                        gap="0.8rem"
                        fontWeight="600"
                        title="Users"
                    >
                        <Box
                            fontSize="1.5rem"
                            className={styles.tabIcons}
                            color={active === 3 ? "white" : "myblack"}
                        >
                            <BsPeopleFill className={styles.svgIcon} />
                        </Box>{" "}
                        <Flex
                            className={styles.tabs}
                            align="center"
                            gap="0.4rem"
                        >
                            <Text>Users</Text>{" "}
                            {active === 3 && (
                                <Text>
                                    {data?.total >= 1000
                                        ? `${Math.floor(
                                              (data?.total / 1000).toFixed(1)
                                          )}k`
                                        : data?.total}
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                </Flex>

                {/* Filters */}
                {field === "photos" && (
                    <ImageFilter
                        filters={filters}
                        orientation={orientation}
                        setOrientation={setOrientation}
                        color={color}
                        colors={colors}
                        setColor={setColor}
                        setFilters={setFilters}
                        sort={sort}
                        setSort={setSort}
                        resetFilter={resetFilter}
                    />
                )}

                {/* main */}
                {field === "photos" ? (
                    isLoading ? (
                        // <CardSkeleton />
                        <h2
                            style={{
                                backgroundColor: "tomato",
                                height: "50vh",
                            }}
                        >
                            loading
                        </h2>
                    ) : (
                        <CardList data={data?.results} avgCards={avgCards} />
                    )
                ) : field === "collections" ? (
                    isLoading ? (
                        // <CollectionSkeleton />
                        <h2
                            style={{
                                backgroundColor: "tomato",
                                height: "50vh",
                            }}
                        >
                            loading
                        </h2>
                    ) : (
                        <CollectionList data={data?.results} />
                    )
                ) : field === "users" ? (
                    isLoading ? (
                        <h2
                            style={{
                                backgroundColor: "tomato",
                                height: "50vh",
                            }}
                        >
                            loading
                        </h2>
                    ) : (
                        <UsersList data={data?.results} />
                    )
                ) : (
                    ""
                )}

                {data?.total_pages > 1 && (
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
                                className={styles.previousBtn}
                                onClick={goPrevious}
                            >
                                <IoIosArrowBack fontSize="1.5rem" />
                                <Text>Previous</Text>
                            </Flex>
                        )}
                        {page !== data?.total_pages && (
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
                )}
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
    const queryClient = new QueryClient();

    const initialReqQuery = [
        context?.params?.search,
        "photos",
        1,
        "",
        {
            orientation: "",
            color: "",
            order_by: "",
        },
    ];

    await queryClient.prefetchQuery(
        ["search", ...initialReqQuery],
        getSearchedResults
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
