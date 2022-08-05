import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Grid,
    Image,
    GridItem,
    Text,
    Box,
    Flex,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/ImageModal.module.css";
import { selectAllCollections } from "../../features/CollectionSlice";
import { MemoCollectionBox } from "../shared-items/modal/CollectionBox";
import { motion } from "framer-motion";
import { CollectionForm } from "../form/CollectionForm";

export const ImageModal = ({ image, isOpen, onClose }) => {
    const collectionIds = useSelector((state) => selectAllCollections(state));
    // available page = collection / form
    const [togglePage, setTogglePage] = useState("collection");

    // animation variant
    const list = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                type: "tween",
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const closeForm = useCallback(() => {
        setTogglePage("collection");
    }, []);

    // todo: place the model to the bottom of the page in large phone view

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="relative">
            <ModalOverlay
                p="0"
                // backdropFilter="blur(3px)"
                _focus={{ border: "0" }}
            />
            <ModalContent
                minWidth={{ base: "98vw", sm: "93vw", lg: "80vw" }}
                height="85vh"
                my="7.5vh"
                borderRadius="10px"
            >
                <ModalBody p="2.5vh">
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            collectionBreak: "1fr 2fr",
                        }}
                        gap="2.5vh"
                        width="100%"
                        height="100%"
                    >
                        <GridItem
                            display={{ base: "none", collectionBreak: "block" }}
                            height="80vh"
                            borderRadius="9px"
                        >
                            <Image
                                src={
                                    image?.urls?.regular ||
                                    image?.urls?.thumb ||
                                    image?.urls?.full ||
                                    image?.urls?.raw
                                }
                                alt=""
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                borderRadius="10px"
                                bg="grey.first"
                            />
                        </GridItem>

                        {togglePage === "collection" &&
                        collectionIds?.length >= 1 ? (
                            <GridItem width="100%" height="80vh">
                                <Flex
                                    width="100%"
                                    justify="space-between"
                                    align="start"
                                    height="8vh"
                                >
                                    <Text
                                        as="h2"
                                        fontSize="1.3rem"
                                        fontWeight="600"
                                        position="relative"
                                        overflow="hidden"
                                    >
                                        Add to collection
                                        <motion.div
                                            className={styles["title-cover"]}
                                            layoutId="title-cover"
                                            initial={{
                                                y: 0,
                                            }}
                                            animate={{ y: 32 }}
                                            transition={{
                                                type: "tween",
                                                duration: 1,
                                            }}
                                        ></motion.div>
                                    </Text>

                                    <Box
                                        onClick={() => setTogglePage("form")}
                                        width="max-content"
                                        height="max-content"
                                        borderRadius="50px"
                                        p="0.3rem 0.8rem"
                                        position="relative"
                                        cursor="pointer"
                                        fontWeight="600"
                                        fontSize="0.9rem"
                                        overflow="hidden"
                                        border="1.5px solid"
                                        color="myblack"
                                        borderColor="grey.second"
                                        transition="all 100ms ease"
                                        _hover={{
                                            borderColor: "myblack",
                                        }}
                                        className={styles.createBtn}
                                    >
                                        create collection
                                    </Box>
                                </Flex>

                                <Box
                                    width="100%"
                                    overflowY="auto"
                                    p="0.4rem 0.8rem 0.4rem 0.4rem"
                                    height="100%"
                                    maxHeight="72vh"
                                    className={styles.collections}
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={list}
                                    >
                                        {collectionIds?.map((id) => (
                                            <MemoCollectionBox
                                                key={id}
                                                image={image}
                                                collectionId={id}
                                            />
                                        ))}
                                    </motion.div>
                                </Box>
                            </GridItem>
                        ) : (
                            <GridItem>
                                <CollectionForm
                                    collectionCount={collectionIds?.length}
                                    closeForm={closeForm}
                                />
                            </GridItem>
                        )}
                    </Grid>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
