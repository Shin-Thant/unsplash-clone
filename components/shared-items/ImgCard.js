import React, { useEffect, useRef, useState, Skeleton } from "react";
import styles from "../../styles/ImgCard.module.css";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
// import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
    addImage,
    removeImage,
    selectAllIds,
} from "../../features/SavedImgSlice";
import { useRouter } from "next/router";

export const ImgCard = ({
    id,
    width,
    height,
    description,
    imgs,
    links,
    blur_hash,
    categories,
    current_user_collections,
    user,
    item,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const ids = useSelector((state) => selectAllIds(state));

    const goUserDetails = () => {
        user?.username && router.push(`/user/${user?.username}`);
    };

    const saveAndRemove = () => {
        if (ids?.includes(id)) {
            console.log("existed");
            dispatch(removeImage(id));
        } else {
            dispatch(addImage({ ...item }));
        }
    };

    const goDetail = () => {
        id && router.push(`/photos/${id}`);
    };

    if (!imgs?.regular || !imgs?.thumb || !imgs?.full || !imgs?.raw)
        return (
            <Flex
                w="100%"
                h="450px"
                bg="grey.first"
                justify="center"
                align="center"
                borderRadius="15px"
            >
                Image not available!
            </Flex>
        );

    return (
        <Box
            zIndex={10}
            w="100%"
            h="max-content"
            borderRadius={{ base: "8px", lgMobile: "15px" }}
            className={styles.card}
        >
            {/* giving min height to image container make the cards more good looking, while the images are loading users can see the card with 250px. */}
            <Box
                className={styles.imgContainer}
                w="100%"
                borderRadius={{ base: "8px 8px 0 0", lgMobile: "15px" }}
                bg="rgb(168, 168, 168)"
                cursor="pointer"
            >
                {imgs?.regular || imgs?.thumb || imgs?.full || imgs?.raw ? (
                    <LazyLoadImage
                        onClick={goDetail}
                        src={
                            imgs?.regular ||
                            imgs?.thumb ||
                            imgs?.full ||
                            imgs?.raw
                        }
                        alt={description || ""}
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: "cover",
                            minHeight:
                                height > 3000
                                    ? height > 4000
                                        ? height > 5000
                                            ? height >= 6000
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
                        h="450px"
                        bg="grey.first"
                        justify="center"
                        align="center"
                        borderRadius="15px"
                    >
                        Image not available!
                    </Flex>
                )}

                <Box
                    fontSize="1.1rem"
                    bg="white"
                    cursor="pointer"
                    borderRadius="5px"
                    className={styles.addBtn}
                    onClick={saveAndRemove}
                    title={
                        ids?.includes(id) ? "Remove from list" : "Add to list"
                    }
                >
                    <Box
                        className={`${styles.addIcon} ${
                            ids?.includes(id) ? styles.added : ""
                        }`}
                        bg="black"
                        borderRadius="50px"
                    ></Box>
                    {/* <BsPlusLg className={styles.addIcon} /> */}
                </Box>
            </Box>

            <Flex
                className={styles.info}
                w="100%"
                justify="space-between"
                align="center"
            >
                <Flex align="center" gap="0.8rem" className={styles.userInfo}>
                    <Box>
                        <Link
                            _focus={{
                                border: "0px",
                            }}
                            href={`/user/${user?.username}`}
                        >
                            <LazyLoadImage
                                onClick={goUserDetails}
                                src={user?.profile_image?.large}
                                alt={user?.username}
                                width="40px"
                                height="40px"
                                style={{
                                    backgroundColor: "#CBC7C0",
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                        </Link>
                    </Box>
                    <Link
                        _focus={{
                            border: "0px",
                        }}
                        _hover={{
                            textDecoration: "none",
                        }}
                        href={`/user/${user?.username}`}
                    >
                        <Text
                            fontWeight={600}
                            opacity="0.7"
                            cursor="pointer"
                            fontSize={{
                                base: "0.9rem",
                                mobile: "0.95rem",
                                lg: "1rem",
                            }}
                            transition="all 250ms ease"
                            textDecoration="none"
                            _hover={{
                                opacity: 1,
                                textDecoration: "none",
                            }}
                        >
                            {user?.name}
                        </Text>
                    </Link>
                </Flex>

                <Box
                    fontSize="1.4rem"
                    bg="grey.third"
                    p="0.5rem 0.6rem"
                    cursor="pointer"
                    borderRadius="8px"
                    className={styles.downloadBtn}
                >
                    <a href={links?.download} target="_blank" download>
                        <FiDownload className={styles.downloadIcon} />
                    </a>
                </Box>
            </Flex>
        </Box>
    );
};
