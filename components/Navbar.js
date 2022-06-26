import { Box, Flex, FormControl, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUnsplash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { IoClose } from "react-icons/io5";
import { CustomToast } from "./CustomToast";
import { useStorage } from "../hooks/useStorage";
import { useDispatch, useSelector } from "react-redux";
import { useRecent } from "../hooks/useRecent";
import { fetchUserImages } from "../features/FollowSlice";

export default function Navbar() {
    const home = useRef(null);
    const explore = useRef(null);
    const collection = useRef(null);
    const contact = useRef(null);

    const link1 = useRef(null);
    const link2 = useRef(null);
    const link3 = useRef(null);
    const link4 = useRef(null);

    const slider = useRef(null);

    const [currentRoute, setCurrentRoute] = useState(1);

    const router = useRouter();

    const search = useRef(null);

    const toast = useToast();

    const [storage, setStorage] = useStorage("search");

    // * states for recent search list box
    const [show, setShow] = useState(false);
    const [recent, error, setRecent, recentSearch] = useRecent("recentSearch");

    const historyBox = useRef(null);
    const recentList = useRef(null);

    useEffect(() => {
        // * set recent if there is a value in the input
        if (storage) setRecent(storage);
    }, []);

    // const { images } = useSelector((state) => state.savedImg);

    useEffect(() => {
        if (typeof window !== undefined) {
            // if (currentRoute === 1) {
            //     slider.current.width = link1.current?.clientWidth;
            // }
            // if (currentRoute === 2) {
            //     slider.current.width = link2.current?.clientWidth;
            // }
            // if (currentRoute === 3) {
            //     slider.current.width = link3.current?.clientWidth;
            // }
            // if (currentRoute === 4) {
            //     slider.current.width = link1.current?.clientWidth;
            // }

            switch (currentRoute) {
                case 1:
                    {
                        home.current.checked = true;
                        explore.current.checked = false;
                        collection.current.checked = false;
                        contact.current.checked = false;
                    }
                    break;
                case 2:
                    {
                        home.current.checked = false;
                        explore.current.checked = true;
                        collection.current.checked = false;
                        contact.current.checked = false;
                    }
                    break;
                case 3:
                    {
                        home.current.checked = true;
                        explore.current.checked = false;
                        collection.current.checked = true;
                        contact.current.checked = false;
                    }
                    break;
                case 4:
                    {
                        home.current.checked = true;
                        explore.current.checked = false;
                        collection.current.checked = false;
                        contact.current.checked = true;
                    }
                    break;
                default: {
                    home.current.checked = false;
                    explore.current.checked = false;
                    collection.current.checked = false;
                    contact.current.checked = false;
                }
            }
        }

        // slider.current.width = width;
    }, [currentRoute]);

    const goHome = () => {
        setCurrentRoute(1);
        router.push("/");
    };
    const goExplore = () => {
        setCurrentRoute(2);
        router.push("/explore");
    };
    const goCollections = () => {
        setCurrentRoute(3);
        router.push("/collections");
        // router.push({
        //     pathname: "/collections",
        //     query: { search: "hello world".replaceAll(" ", "") },
        // });
    };
    const goContact = () => {
        setCurrentRoute(4);
        // router.push("/contact");
    };

    useEffect(() => {
        // * handling currentRoute state on router change
        if (router.pathname === "/") setCurrentRoute(1);
        else if (router.pathname === "/explore") setCurrentRoute(2);
        else if (router.pathname === "/collections") setCurrentRoute(3);
        else if (router.pathname === "/contact") setCurrentRoute(4);

        // * handling search bar value with parameter from url
        if (router.query?.search) {
            if (storage !== router?.query?.search) {
                setStorage(router?.query?.search);
            }
            setRecent(router.query?.search);
        }

        // * setting storage if the current page is not search page
        if (router.pathname !== "/search/[search]") {
            setStorage("");
            search.current.value = "";
        }
    }, [router]);

    // * searching input handler
    const goSearch = () => {
        if (storage) {
            if (router.pathname !== "/search/[search]") {
                router.push(`/search/${storage}`);
            } else {
                router.push(`/search/${storage}`, undefined, {
                    shallow: true,
                });
            }
            // * setting recent search
            setRecent(storage);

            // * remove focus from input
            search.current?.blur();

            // * hide history box
            setShow(false);
        } else {
            toast({
                duration: 3000,
                position: "bottom-left",
                isClosable: true,
                // * adding custom toast with close button
                render: ({ id, onClose }) => (
                    <CustomToast id={id} onClose={onClose} />
                ),
            });
        }
    };

    // * search input handler
    const searchController = (e) => {
        setStorage(e.target.value);
    };

    // * reset search input handler
    const closeSearch = () => {
        setStorage("");
        search.current.value = "";
    };

    // * add click event to document body to handle history box visibility
    useEffect(() => {
        const bodyClickHandler = function (e) {
            if (
                e.target !== historyBox.current &&
                e.target !== search.current &&
                e.target?.parentElement !== historyBox.current &&
                e.target?.parentElement !== recentList.current
            ) {
                setShow(false);
            } else {
                setShow(true);
            }
        };

        if (typeof window !== "undefined") {
            document.body.addEventListener("click", bodyClickHandler);
        }

        return () => {
            document.body.removeEventListener("click", bodyClickHandler);
            // console.log("event removed");
        };
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserImages());
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Flex
                position="sticky"
                top="0"
                left="0"
                right="0"
                w="100%"
                mx="auto"
                align="center"
                justify="space-between"
                gap="1.5rem"
                py="0.8rem"
                px="1rem"
                mb="0.5rem"
                style={{ background: "#D5D2C3" }}
                shadow="lg"
                zIndex="20"
            >
                <Flex
                    w="max-content"
                    h="100%"
                    justify="center"
                    align="center"
                    fontSize="2.5rem"
                    onClick={goHome}
                >
                    <FaUnsplash title="Unsplash" cursor="pointer" />
                </Flex>

                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        goSearch();
                    }}
                >
                    <Flex
                        w="100%"
                        px="0.9rem"
                        py="0.5rem"
                        rounded="full"
                        gap="1rem"
                        border="2px solid black"
                        align="center"
                        position="relative"
                    >
                        <Text
                            w="max-content"
                            fontSize="1.3rem"
                            cursor="pointer"
                            opacity="0.8"
                            transition="all 200ms ease"
                            _hover={{
                                opacity: "1",
                            }}
                            onClick={goSearch}
                        >
                            <FiSearch />
                        </Text>

                        <input
                            onFocus={() => {
                                setShow(true);
                            }}
                            list="recentSearch"
                            ref={search}
                            onChange={searchController}
                            value={storage}
                            type="search"
                            placeholder="Search free high-resolution photos"
                            className={styles.searchInput}
                        />

                        <Text
                            w="max-content"
                            fontSize="1.5rem"
                            cursor="pointer"
                            opacity="0.8"
                            transition="all 200ms ease"
                            _hover={{
                                opacity: "1",
                            }}
                            display={
                                search.current?.value?.length < 1
                                    ? "none"
                                    : "block"
                            }
                            onClick={closeSearch}
                        >
                            <IoClose />
                        </Text>

                        {recentSearch?.length && show && storage?.length < 1 ? (
                            <Box
                                className={styles.recentSearch}
                                // * change display property according to the screend width
                                ref={historyBox}
                                boxShadow="xl"
                                w="100%"
                                bg="white"
                                p="1rem 1.5rem"
                                borderRadius="8px"
                            >
                                <Flex
                                    mb="1.5rem"
                                    align="center"
                                    justify="space-between"
                                >
                                    <Text fontWeight="600" fontSize="1.2rem">
                                        Recent{" "}
                                        {recentSearch?.length > 1
                                            ? "Searches"
                                            : "Search"}
                                    </Text>
                                    <Text
                                        cursor="pointer"
                                        fontWeight="500"
                                        fontSize="0.8rem"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                        onClick={() => setRecent([])}
                                    >
                                        Clear
                                    </Text>
                                </Flex>

                                <Flex
                                    ref={recentList}
                                    align="center"
                                    gap="1rem"
                                    wrap="wrap"
                                >
                                    {recentSearch?.map((item, index) => (
                                        <Box
                                            key={index}
                                            border="2px solid"
                                            borderColor="myblack"
                                            borderRadius="8px"
                                            color="myblack"
                                            fontWeight="400"
                                            p="0.3rem 0.8rem"
                                            cursor="pointer"
                                            fontSize="0.9rem"
                                            bg="white"
                                            _hover={{
                                                boxShadow: "lg",
                                            }}
                                            className={styles.recentItem}
                                            onClick={() => {
                                                router.push(`/search/${item}`);
                                                setStorage(item);
                                                search.current.value = storage;

                                                setRecent(item);

                                                // * hide history box
                                                setShow(false);
                                            }}
                                        >
                                            {item}
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        ) : (
                            ""
                        )}
                    </Flex>
                </form>

                <div className={styles.linksContainer}>
                    <input
                        ref={home}
                        type="radio"
                        id="home"
                        className={styles.home}
                    />
                    <Box
                        height="100%"
                        ref={link1}
                        fontWeight={currentRoute === 1 ? "700" : "600"}
                        color={currentRoute === 1 ? "white" : "brown.2000"}
                        className={styles.routes}
                    >
                        <label
                            htmlFor="home"
                            className={styles.text}
                            onClick={goHome}
                        >
                            HOME
                        </label>
                    </Box>

                    <input
                        ref={explore}
                        type="radio"
                        id="explore"
                        className={styles.explore}
                    />
                    <Box
                        height="100%"
                        ref={link2}
                        fontWeight={currentRoute === 2 ? "700" : "600"}
                        color={currentRoute === 2 ? "white" : "brown.2000"}
                        className={styles.routes}
                    >
                        <label
                            htmlFor="explore"
                            className={styles.text}
                            onClick={goExplore}
                        >
                            EXPLORE
                        </label>
                    </Box>

                    <input
                        ref={collection}
                        type="radio"
                        id="collection"
                        className={styles.collection}
                    />
                    <Box
                        height="100%"
                        ref={link3}
                        fontWeight={currentRoute === 3 ? "700" : "600"}
                        color={currentRoute === 3 ? "white" : "brown.2000"}
                        className={styles.routes}
                    >
                        <label
                            htmlFor="collection"
                            className={styles.text}
                            onClick={goCollections}
                        >
                            COLLECTIONS
                        </label>
                    </Box>

                    <input
                        ref={contact}
                        type="radio"
                        id="contact"
                        className={styles.contact}
                    />
                    <Box
                        height="100%"
                        ref={link4}
                        fontWeight={currentRoute === 4 ? "700" : "600"}
                        color={currentRoute === 4 ? "white" : "brown.2000"}
                        className={styles.routes}
                    >
                        <label
                            htmlFor="contact"
                            className={styles.text}
                            onClick={goContact}
                        >
                            CONTACT US
                        </label>
                    </Box>

                    <Box
                        ref={slider}
                        bg="brown.1000"
                        borderRadius="50px"
                        h="100%"
                        className={styles.slider}
                    ></Box>
                </div>
            </Flex>
        </>
    );
}
