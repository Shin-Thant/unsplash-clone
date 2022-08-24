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
	Button,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/ImageModal.module.css";
import { selectCollectionIds } from "../../features/CollectionSlice";
import { MemoCollectionBox } from "../shared-items/modal/CollectionBox";
import { motion } from "framer-motion";
import { CollectionForm } from "../form/CollectionForm";
import { MdClose } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import { MdOutlineCollections } from "react-icons/md";

export const ImageModal = ({ image, isOpen, onClose }) => {
	const collectionIds = useSelector((state) => selectCollectionIds(state));
	// available page = collection / form
	const [togglePage, setTogglePage] = useState("form");

	// track element in view
	const { ref, inView } = useInView({
		threshold: 0,
	});

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

	// animation variant
	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "tween", duration: 0.5 },
		},
	};

	const closeForm = useCallback(() => {
		setTogglePage("collection");
	}, []);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && collectionIds?.length >= 1) {
			setTogglePage("collection");
		}

		return () => {
			isMounted = false;
		};
	}, [collectionIds?.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay p="0" _focus={{ border: "0" }} />

			<ModalContent
				minWidth={{ base: "100%", modalBreak: "95vw", lg: "85vw" }}
				height={{ base: "91vh", modalBreak: "90vh", lg: "85vh" }}
				mt={{ base: "9vh", modalBreak: "7.5vh", lg: "7.5vh" }}
				mb={{ base: "0", modalBreak: "0", lg: "7.5vh" }}
				borderRadius={{
					base: "10px 10px 0 0",
					modalBreak: "10px",
				}}
			>
				<ModalBody
					height="100%"
					p={{ base: "0 0.8rem", modalBreak: "2.5vh" }}
				>
					<Button
						position="fixed"
						top={{ base: "0.5rem", modalBreak: "0.2rem" }}
						left="0.5rem"
						onClick={onClose}
						color={{
							base: "hsl(0, 0%, 40%)",
							modalBreak: "hsl(0, 0%, 80%)",
						}}
						bg={{ base: "white", modalBreak: "transparent" }}
						_hover={{
							color: {
								base: "hsl(0, 0%, 10%)",
								modalBreak: "white",
							},
						}}
						_active={{
							color: {
								base: "hsl(0, 0%, 10%)",
								modalBreak: "white",
							},
						}}
						_focus={{
							color: {
								base: "hsl(0, 0%, 10%)",
								modalBreak: "white",
							},
						}}
						justifySelf="flex-end"
						minWidth="30px"
						height="33px"
						fontSize="1.6rem"
						p="0 0.5rem"
						autoFocus={false}
					>
						<MdClose />
					</Button>

					<Grid
						templateColumns={{
							base: "1fr",
							modalBreak: "1fr 2fr",
						}}
						gap={{ modalBreak: "2.5vh", lg: "3vh" }}
						width="100%"
						height="100%"
					>
						<GridItem
							display={{ base: "none", modalBreak: "block" }}
							height={{
								modalBreak: "85vh",
								lg: "80vh",
							}}
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
								boxShadow="0 3px 9px 0px hsla(0, 0%, 5%, 0.3)"
							/>
						</GridItem>

						{togglePage === "collection" ? (
							<GridItem width="100%" height="100%">
								{/* headings */}
								<Grid
									templateColumns={
										inView ? "2fr 1fr" : "4fr 1fr"
									}
									width="100%"
									alignItems={{
										base: "center",
										modalBreak: "start",
									}}
									height={{ base: "9vh", modalBreak: "8vh" }}
									gap={{ base: "2vh", modalBreak: "0.8rem" }}
									p={{
										base: "0.5rem 0",
										modalBreak: "0",
									}}
								>
									<Text
										as="h2"
										fontSize={{
											base: "1.15rem",
											miniTablet: "1.2rem",
											modalBreak: "1.3rem",
											lg: "1.4rem",
										}}
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

									{!inView && (
										<motion.div
											initial={{
												y: 20,
												opacity: 0,
											}}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												type: "spring",
												duration: 0.3,
											}}
											style={{
												width: "max-content",
												justifySelf: "flex-end",
											}}
										>
											<Box
												onClick={() =>
													setTogglePage("form")
												}
												width="max-content"
												height="100%"
												borderRadius={{
													base: "5px",
													miniTablet: "50px",
												}}
												p={{
													base: "0.35rem 0.6rem",
													miniTablet: "0.3rem 0.8rem",
												}}
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
												<Text
													display={{
														base: "none",
														miniTablet: "block",
													}}
												>
													Create new collection
												</Text>
												<Text
													display={{
														base: "block",
														miniTablet: "none",
													}}
													opacity="0.7"
													_hover={{
														opacity: "1",
													}}
													_focus={{
														opacity: "1",
													}}
													fontSize="1.3rem"
												>
													<MdOutlineCollections />
												</Text>
											</Box>
										</motion.div>
									)}
								</Grid>

								<Box
									width="100%"
									overflowY="auto"
									p={{
										base: "0 0.4rem 0.5rem 0",
										modalBreak:
											"0.4rem 0.8rem 0.4rem 0.4rem",
									}}
									height={{
										base: "82vh",
										modalBreak: "77vh",
										lg: "72vh",
									}}
									className={styles.collections}
								>
									<motion.div
										initial="hidden"
										animate="visible"
										variants={list}
									>
										<motion.div variants={item}>
											<Flex
												ref={ref}
												justify="space-between"
												align="center"
												mb="1rem"
												bg="hsl(0, 0%, 20%)"
												borderColor="hsl(0, 0%, 20%)"
												borderWidth="1px"
												borderLeftWidth="8px"
												borderRadius="8px"
												height={{
													base: "5rem",
													modalBreak: "5.5rem",
												}}
												p="0 1rem"
												position="relative"
												cursor="pointer"
												transition="all 220ms ease"
												_hover={{
													boxShadow:
														"0 3px 10px 0px hsla(0, 0%, 0%, 0.25)",
												}}
												onClick={() =>
													setTogglePage("form")
												}
												className={styles.createBtn}
											>
												<Box
													position="absolute"
													top="0"
													left="0"
													width="100%"
													height="100%"
													bg="hsl(0, 0%, 96%)"
													borderRadius="8px"
													pointerEvents="none"
												></Box>
												<Text
													fontSize={{
														base: "1.1rem",
														modalBreak: "1.15rem",
													}}
													fontWeight="600"
													color="myblack"
													zIndex={2}
												>
													Create new collection
												</Text>
												<Button
													zIndex={2}
													bg="transparent"
													_active={{
														bg: "transparent",
													}}
													_focus={{
														border: 0,
													}}
													display="flex"
													justify="center"
													align="center"
													width="30px"
													height="30px"
													fontSize="1.8rem"
													p="0"
													transform="translate(-10px)"
													className={styles.arrowIcon}
												>
													<HiOutlineArrowNarrowRight />
												</Button>
											</Flex>
										</motion.div>

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
						) : togglePage === "form" ? (
							<GridItem>
								<CollectionForm closeForm={closeForm} />
							</GridItem>
						) : (
							`loading...`
						)}
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
