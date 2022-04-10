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

    useEffect(() => {
        setStorage(search.current.value);
    }, [search.current?.value]);

    // useEffect(() => {
    //     if(router.pathname === '/search/[search]' && storage.length < 1) {
    //         setStorage(router)
    //     }
    // }, [])

    useEffect(() => {
        if (router.pathname !== "/search/[search]") setStorage("");
        console.log(router.query);
    }, [router]);

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
        // router.push("/collections");
    };
    const goContact = () => {
        setCurrentRoute(4);
        // router.push("/contact");
    };

    useEffect(() => {
        //  handling currentRoute state on router change
        if (router.pathname === "/") setCurrentRoute(1);
        else if (router.pathname === "/explore") setCurrentRoute(2);
        else if (router.pathname === "/collections") setCurrentRoute(3);
        else if (router.pathname === "/contact") setCurrentRoute(4);

        // handling search bar value with parameter from url
        if (router?.query?.search) {
            if (storage !== router?.query?.search) {
                setStorage(router?.query?.search);
            }
        }
    }, [router]);

    const goSearch = () => {
        if (storage) {
            if (router.pathname !== "/search/[search]") {
                router.push(`/search/${storage}`);
            } else {
                router.push(`/search/${storage}`, undefined, {
                    shallow: true,
                });
            }
        } else {
            toast({
                duration: 4000,
                position: "bottom-left",
                isClosable: true,
                // * adding custom toast with close button
                render: ({ id, onClose }) => (
                    <CustomToast id={id} onClose={onClose} />
                ),
            });
        }
    };

    const pressedEnter = (e) => {
        const ENTER_KEY_CODE = 13;

        if (e.keyCode === ENTER_KEY_CODE) {
            goSearch();
        }
    };

    const searchController = (e) => {
        setStorage(e.target.value);
    };

    const closeSearch = () => {
        setStorage("");
    };

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
                zIndex="10"
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

                <FormControl width="50%">
                    <Flex
                        w="100%"
                        px="0.9rem"
                        py="0.5rem"
                        rounded="full"
                        gap="1rem"
                        border="2px solid black"
                        align="center"
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
                            ref={search}
                            onKeyUp={pressedEnter}
                            onChange={searchController}
                            value={storage}
                            type="text"
                            placeholder="Search free high-resolution photos"
                            className={styles.searchInput}
                            required
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
                            display={storage?.length < 1 ? "none" : "block"}
                            onClick={closeSearch}
                        >
                            <IoClose />
                        </Text>
                    </Flex>
                </FormControl>

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
