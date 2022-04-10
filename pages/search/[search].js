import {
    Box,
    Flex,
    Grid,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
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

const getSearchedResults = async ({ queryKey }) => {
    const [_key, query, field, page, filters] = queryKey;

    // console.log(query, page, filters);

    // * Cleaning
    const per_page =
        field === "photos"
            ? 30
            : field === "collections"
            ? 21
            : field === "users" && 20;

    const order_by = filters.order_by ? `&order_by=${filters.order_by}` : "";

    const orientation = filters.orientation
        ? `&orientation=${filters.orientation}`
        : "";

    const color = filters.color ? `&color=${filters.color}` : "";

    if (query && field) {
        console.log(field);
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

    useEffect(() => {
        if (data?.results?.length) {
            setAvgCards(Math.floor(data?.results?.length / 3));
        }
    }, [data?.results]);

    const goPrevious = () => {
        setPage(page - 1);
        window.scrollTo(0, 0);
    };

    const goNext = () => {
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
                    mb="1.5rem"
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
                {
                    // * change it later
                    // field === "photos"
                    false && (
                        <Flex
                            w="100%"
                            justify="space-between"
                            align="center"
                            h="max-content"
                            px="1rem"
                            mb="5rem"
                        >
                            <Flex
                                align="center"
                                w="max-content"
                                h="max-content"
                                gap="1rem"
                            >
                                {/* MenuList for orientation */}
                                <Menu closeOnBlur={true} autoSelect={false}>
                                    <MenuButton
                                        border="2px solid black"
                                        borderRadius="50px"
                                        px="1.1rem"
                                        py="0.4rem"
                                    >
                                        <Flex align="center" gap="0.5rem">
                                            <Text>{orientation}</Text>{" "}
                                            <FiChevronDown />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList
                                        fontSize="0.9rem"
                                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                                    >
                                        <MenuOptionGroup
                                            defaultValue={
                                                filters?.orientation || "any"
                                            }
                                            type="radio"
                                        >
                                            <MenuItemOption
                                                value="any"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        orientation: "",
                                                    });
                                                    setOrientation(
                                                        "Any Orientation"
                                                    );
                                                }}
                                            >
                                                Any Orientation
                                            </MenuItemOption>
                                            <MenuItemOption
                                                value="portrait"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        orientation: "portrait",
                                                    });
                                                    setOrientation("Portrait");
                                                }}
                                            >
                                                Portrait
                                            </MenuItemOption>
                                            <MenuItemOption
                                                value="landscape"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        orientation:
                                                            "landscape",
                                                    });
                                                    setOrientation("Landscape");
                                                }}
                                            >
                                                Landscape
                                            </MenuItemOption>
                                            <MenuItemOption
                                                value="squarish"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        orientation: "squarish",
                                                    });
                                                    setOrientation("Squarish");
                                                }}
                                            >
                                                Squarish
                                            </MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>

                                {/* MenuList for Color */}
                                <Menu closeOnBlur={true} autoSelect={false}>
                                    <MenuButton
                                        border="2px solid black"
                                        borderRadius="50px"
                                        px="1.1rem"
                                        py="0.4rem"
                                    >
                                        <Flex align="center" gap="0.5rem">
                                            {color !== "Any Color" &&
                                            color !== "Black and White" ? (
                                                <Flex
                                                    align="center"
                                                    gap="0.5rem"
                                                >
                                                    <Box
                                                        bg={`${color}`}
                                                        w="19px"
                                                        h="19px"
                                                        borderRadius="50%"
                                                        cursor="pointer"
                                                        borderWidth="1.8px"
                                                        borderColor="gray.400"
                                                        _hover={{
                                                            borderWidth: "3px",
                                                        }}
                                                    ></Box>
                                                    <Text>{color}</Text>
                                                </Flex>
                                            ) : (
                                                <Text>{color}</Text>
                                            )}{" "}
                                            <FiChevronDown />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList
                                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                                        fontSize="0.9rem"
                                    >
                                        <MenuOptionGroup
                                            defaultValue={
                                                filters?.color ? "tone" : "any"
                                            }
                                            type="radio"
                                        >
                                            <MenuItemOption
                                                value="any"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        color: "",
                                                    });
                                                    setColor("Any Color");
                                                }}
                                            >
                                                Any Color
                                            </MenuItemOption>
                                            <MenuItemOption
                                                value="black_and_white"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        color: "black_and_white",
                                                    });
                                                    setColor("Black and White");
                                                }}
                                            >
                                                Black and White
                                            </MenuItemOption>

                                            <Text pl="1rem" cursor="default">
                                                Tone
                                            </Text>

                                            <MenuItemOption
                                                value="tone"
                                                cursor="default"
                                                _hover={{
                                                    bg: "transparent",
                                                }}
                                            >
                                                <Box w="max-content">
                                                    <Flex
                                                        w="100%"
                                                        justify="space-evenly"
                                                        align="center"
                                                        gap="0.5rem"
                                                        mb="0.6rem"
                                                    >
                                                        {colors
                                                            ?.slice(
                                                                0,
                                                                colors.length /
                                                                    2
                                                            )
                                                            ?.map((clr) => (
                                                                <Box
                                                                    onClick={() => {
                                                                        setFilters(
                                                                            {
                                                                                ...filters,
                                                                                color: clr,
                                                                            }
                                                                        );
                                                                        setColor(
                                                                            clr
                                                                        );
                                                                    }}
                                                                    key={clr}
                                                                    bg={`${clr}`}
                                                                    w="19px"
                                                                    h="19px"
                                                                    borderRadius="50%"
                                                                    cursor="pointer"
                                                                    borderWidth="1.8px"
                                                                    borderColor="gray.400"
                                                                    _hover={{
                                                                        borderWidth:
                                                                            "3px",
                                                                    }}
                                                                ></Box>
                                                            ))}
                                                    </Flex>
                                                    <Flex
                                                        w="100%"
                                                        justify="space-evenly"
                                                        align="center"
                                                        gap="0.5rem"
                                                    >
                                                        {colors
                                                            ?.slice(
                                                                colors.length /
                                                                    2,
                                                                colors.length
                                                            )
                                                            ?.map((clr) => (
                                                                <Box
                                                                    onClick={() => {
                                                                        setFilters(
                                                                            {
                                                                                ...filters,
                                                                                color: clr,
                                                                            }
                                                                        );
                                                                        setColor(
                                                                            clr
                                                                        );
                                                                    }}
                                                                    key={clr}
                                                                    bg={`${clr}`}
                                                                    w="19px"
                                                                    h="19px"
                                                                    borderRadius="50%"
                                                                    cursor="pointer"
                                                                    borderWidth="1.8px"
                                                                    borderColor="gray.400"
                                                                    _hover={{
                                                                        borderWidth:
                                                                            "3px",
                                                                    }}
                                                                ></Box>
                                                            ))}
                                                    </Flex>
                                                </Box>
                                            </MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>

                                {/* MenuList for sorting */}
                                <Menu closeOnBlur={true} autoSelect={false}>
                                    <MenuButton
                                        border="2px solid black"
                                        borderRadius="50px"
                                        px="1.1rem"
                                        py="0.4rem"
                                    >
                                        <Flex align="center" gap="0.5rem">
                                            <Text>{sort}</Text>{" "}
                                            <FiChevronDown />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList
                                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                                        fontSize="0.9rem"
                                    >
                                        <MenuOptionGroup
                                            defaultValue={
                                                filters?.order_by || "relevance"
                                            }
                                            type="radio"
                                        >
                                            <MenuItemOption
                                                value="relevance"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        order_by: "",
                                                    });
                                                    setSort("Relevance");
                                                }}
                                            >
                                                Relevance
                                            </MenuItemOption>
                                            <MenuItemOption
                                                value="latest"
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters,
                                                        order_by: "latest",
                                                    });
                                                    setSort("Latest");
                                                }}
                                            >
                                                Latest
                                            </MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>

                            {Object.values(filters).filter(Boolean).length ? (
                                <Flex
                                    onClick={resetFilter}
                                    w="120px"
                                    justify="space-between"
                                    align="center"
                                    gap="0.5rem"
                                    py="0.4rem"
                                    px="1.1rem"
                                    border="2px solid black"
                                    borderRadius="50px"
                                    cursor="pointer"
                                    position="relative"
                                    overflow="hidden"
                                    className={styles.closeBtn}
                                >
                                    <Text
                                        data-text="Reset"
                                        className={styles.closeText}
                                    >
                                        Reset
                                    </Text>
                                    <Flex
                                        align="center"
                                        justify="center"
                                        fontSize="1.6rem"
                                        className={styles.close}
                                    >
                                        <MdClose />
                                    </Flex>
                                </Flex>
                            ) : (
                                ""
                            )}
                        </Flex>
                    )
                }

                {/* main */}
                {field === "photos" ? (
                    isLoading ? (
                        <CardSkeleton />
                    ) : (
                        <CardList data={data?.results} avgCards={avgCards} />
                    )
                ) : field === "collections" ? (
                    isLoading ? (
                        <CollectionSkeleton />
                    ) : (
                        <Grid
                            templateColumns="repeat(3, 1fr)"
                            gap="1.5rem"
                            mt="5rem"
                        >
                            {data?.results.map((item) => (
                                <Collection key={item?.id} collection={item} />
                            ))}
                        </Grid>
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
                        {page > 1 && page !== data?.total_pages && (
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
                        <Flex
                            align="center"
                            gap="0.3rem"
                            p={{ base: "0.5rem 0.8rem", mobile: "0.6rem 1rem" }}
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
                    </Flex>
                )}
            </Box>
        </>
    );
}
