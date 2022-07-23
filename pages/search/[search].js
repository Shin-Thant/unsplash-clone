import { Box, Flex, Text, Skeleton } from "@chakra-ui/react";
// import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";
import { UpBtn } from "../../components/UpBtn";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "../../styles/Search.module.css";
import {
    BsImageFill,
    BsFillCollectionFill,
    BsPeopleFill,
} from "react-icons/bs";
import { CollectionSkeleton } from "../../components/skeletons/CollectionSkeleton";
import { CardList } from "../../components/containers/CardList";
import { ImageFilter } from "../../components/filter/ImageFilter";
import { CollectionList } from "../../components/containers/CollectionList";
import { UsersList } from "../../components/containers/UsersList";
import { UserCardSkeleton } from "../../components/skeletons/UserCardSkeleton";
import {
    MemoPagination,
    Pagination,
} from "../../components/shared-items/Pagination";
import axios from "../../services/axios";

const getSearchedResults = async ({ queryKey }) => {
    const [_key, query, field, page, filters] = queryKey;

    // console.log(query, page, filters);

    const per_page = 18;
    const order_by = filters.order_by ? `&order_by=${filters.order_by}` : "";

    const orientation = filters.orientation
        ? `&orientation=${filters.orientation}`
        : "";

    const color = filters.color ? `&color=${filters.color}` : "";

    if (query && field) {
        const { data } = await axios.get(
            `search/${field}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=${per_page}&page=${page}&query=${query}${order_by}${orientation}${color}`
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

    // useEffect(() => {
    //     let isMounted = true;

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [page]);

    const [field, setField] = useState("photos");

    // track previous field
    const [prevField, setPrevField] = useState("");

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

    const { isLoading, data, isFetching, isPreviousData } = useQuery(
        ["search", router.query?.search, field, page, filters],
        getSearchedResults,
        {
            keepPreviousData: true,
            staleTime: 86400000,
        }
    );

    // reset field and page number when url change
    useEffect(() => {
        let isMounted = true;
        if (isMounted && field !== "photos" && active !== 1)
            changeField("photos", 1);

        return () => {
            isMounted = false;
        };
    }, [router?.pathname]);

    // handle page change
    const changePage = useCallback((num) => {
        setPrevField(field);

        setPage(num);
        window.scrollTo(0, 0);
    }, []);

    // reset filter handler
    const resetFilter = useCallback(() => {
        setFilters({
            orientation: "",
            color: "",
            order_by: "",
        });
        setColor("Any Color");
        setOrientation("Any Orientation");
        setSort("Relevance");
    }, []);

    // scrolling top
    useEffect(() => {
        if (typeof window !== undefined) window.scrollTo(0, 0);
    }, []);

    // setting average cards
    useEffect(() => {
        if (data?.results?.length) {
            setAvgCards(Math.floor(data?.results?.length / 3));
        }
    }, [data?.results]);

    // handle field and active field
    const changeField = (name, num) => {
        // set previous field
        setPrevField(field);

        setField(name);
        setActive(num);
        setPage(1);
    };

    // useEffect(() => {
    //     switch (field) {
    //         case "photos":
    //             setActive(1);
    //             break;
    //         case "collections":
    //             setActive(2);
    //             break;
    //         case "users":
    //             setActive(3);
    //             break;
    //         default:
    //             setActive(0);
    //     }
    // }, [field]);

    return (
        <>
            <Head>
                <title>
                    Search |{" "}
                    {router.query?.search
                        ?.replace(
                            router.query?.search[0],
                            router.query?.search[0].toUpperCase()
                        )
                        .replace("-", " ")}
                </title>
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
                        onClick={() => changeField("photos", 1)}
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
                                          )}K`
                                        : data?.total}
                                </Text>
                            )}
                        </Flex>
                    </Flex>

                    <Flex
                        className={styles.boxes}
                        onClick={() => changeField("collections", 2)}
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
                                          )}K`
                                        : data?.total}
                                </Text>
                            )}
                        </Flex>
                    </Flex>

                    <Flex
                        className={styles.boxes}
                        onClick={() => changeField("users", 3)}
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
                                          )}K`
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
                        <CardSkeleton />
                    ) : prevField !== "photos" && isFetching ? (
                        <CardSkeleton />
                    ) : (
                        <CardList data={data?.results} avgCards={avgCards} />
                    )
                ) : field === "collections" ? (
                    isLoading ? (
                        <CollectionSkeleton />
                    ) : prevField !== "collections" && isFetching ? (
                        <CollectionSkeleton />
                    ) : (
                        <CollectionList data={data?.results} />
                    )
                ) : field === "users" ? (
                    isLoading ? (
                        <UserCardSkeleton />
                    ) : prevField !== "users" && isFetching ? (
                        <UserCardSkeleton />
                    ) : (
                        <UsersList data={data?.results} />
                    )
                ) : (
                    ""
                )}

                <Flex w="100%" justify="center" mt="4rem">
                    <MemoPagination
                        changePage={changePage}
                        page={page}
                        totalPages={data?.total_pages}
                    />
                </Flex>
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
