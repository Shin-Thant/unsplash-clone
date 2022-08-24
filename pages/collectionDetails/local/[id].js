import {
	Box,
	Flex,
	Image,
	Link,
	Text,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CardList } from "../../../components/containers/CardList";
import styles from "../../../styles/CollectionDetails.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
	selectCollectionById,
	selectCollectionImages,
} from "../../../features/CollectionSlice";
import { EditModal } from "../../../components/modal/EditModal";
import { useEditCollection } from "../../../context/collectionContext/editColContext";

export default function LocalCollectionDetails() {
	const router = useRouter();
	const [page, setPage] = useState(1);

	const { collection: editCollection, setCollection: setEditCollection } =
		useEditCollection();

	// modal controllers
	const { isOpen, onOpen, onClose } = useDisclosure();

	const photos = useSelector((state) =>
		selectCollectionImages(state, router?.query?.id || "1")
	);

	const collection = useSelector((state) =>
		selectCollectionById(state, router?.query?.id || "1")
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scrollTo(0, 0);
		}
	}, [page]);

	const [avgCards, setAvgCards] = useState(0);
	useEffect(() => {
		if (photos?.length) setAvgCards(photos?.length / 3);
	}, [photos]);

	const goUserDetails = () => {
		if (collection?.user?.username) {
			router.push(`/user/${collection?.user?.username}`);
		}
	};

	const openModal = () => {
		if (collection?.title) {
			setEditCollection({ ...collection });

			onOpen();
		}
	};

	return (
		<>
			<Head>
				<title>
					Collection |{" "}
					{collection?.title?.length ? collection?.title : "Details"}
				</title>
			</Head>
			<Box
				w="100%"
				mb={{ base: "0.9rem", lgMobile: "1rem", lg: "1.5rem" }}
				className={styles.colDetailsContainer}
			>
				{isOpen && <EditModal isOpen={isOpen} onClose={onClose} />}

				<Box
					w="100%"
					position="relative"
					pt="54vh"
					className={styles["content-container"]}
				>
					{photos?.length ? (
						<Flex
							align={
								collection?.cover_photo?.width >
								collection?.cover_photo?.height
									? "flex-start"
									: "center"
							}
							width="100%"
							height="55vh"
							zIndex={-5}
							className={styles.heading}
						>
							<Image
								zIndex={-10}
								w="100%"
								h="100%"
								bg="white"
								objectFit="cover"
								src={collection?.cover_photo?.urls?.regular}
								alt=""
							/>
						</Flex>
					) : (
						""
					)}

					{collection?.title?.length > 0 ? (
						<Flex
							justify="space-between"
							align="center"
							px={{ base: "1.1rem", sm: "2rem" }}
							className={styles["heading-content"]}
						>
							<Box>
								<Text
									as="h1"
									fontSize={{
										base: "1.6rem",
										miniTablet: "1.8rem",
										md: "2rem",
										xl: "2.5rem",
									}}
									fontWeight="700"
									mb="0.9rem"
								>
									<motion.p
										initial={{ opacity: 0, y: 15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											type: "tween",
											delay: 0.6,
											duration: 0.8,
										}}
									>
										{collection?.title}
									</motion.p>
								</Text>

								<motion.div
									style={{
										width: "max-content",
									}}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "tween",
										duration: 0.7,
										delay: 1,
									}}
								>
									<Flex
										w="max-content"
										align="center"
										gap="0.5rem"
									>
										{collection?.user?.profile_image
											?.large &&
											collection?.user?.username && (
												<>
													<Image
														onClick={goUserDetails}
														cursor="pointer"
														w="40px"
														h="40px"
														borderRadius="50%"
														bg="gray.100"
														src={
															collection?.user
																?.profile_image
																?.large
														}
														alt=""
													/>
													<Link
														_focus={{
															border: "0px",
														}}
														href={`/user/${collection?.user?.username}`}
													>
														<Text
															onClick={
																goUserDetails
															}
															cursor="pointer"
															_hover={{
																textDecoration:
																	"underline",
															}}
														>
															@
															{
																collection?.user
																	?.username
															}
														</Text>
													</Link>
												</>
											)}
										<Text
											ml={
												collection?.user?.username
													? "1rem"
													: "0"
											}
											border="2px solid white"
											borderRadius="5px"
											p="0.2rem 0.5rem"
											fontSize={{
												base: "0.9rem",
												miniTablet: "0.95rem",
											}}
										>
											{collection?.total_photos} Photo
											{collection?.total_photos > 1
												? "s"
												: ""}
										</Text>
									</Flex>
								</motion.div>
							</Box>

							<motion.div
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "tween",
									duration: 0.7,
									delay: 0.6,
								}}
							>
								<Button
									onClick={openModal}
									fontSize="0.9rem"
									p="0 0.8rem"
									height="35px"
									color="myblack"
									_active={{
										border: "0",
									}}
									_focus={{ border: "0" }}
								>
									Edit
								</Button>
							</motion.div>
						</Flex>
					) : (
						""
					)}

					{/* main content */}
					<Box
						w="100%"
						minHeight="89vh"
						px={{
							base: "0",
							lgMobile: "1rem",
							lg: "1.5rem",
						}}
						pt="2rem"
						borderTopRadius={{ base: "10px", sm: "15px" }}
						bg="background"
						className={styles.mainContent}
					>
						{page === 1 ? (
							<Text
								as="h1"
								px={{ base: "0.5rem", lgMobile: "0" }}
								fontSize={{
									base: "1.3rem",
									sm: "1.4rem",
									miniTablet: "1.6rem",
									md: "1.8rem",
									xl: "2rem",
								}}
								fontWeight={{ base: "600", md: "700" }}
								mb={{
									base: "1rem",
									mobile: "1.2rem",
									sm: "1.4rem",
									miniTablet: "1.6rem",
									md: "2rem",
									xl: "2.8rem",
								}}
								minHeight="40px"
								w="100%"
							>
								{collection?.title?.length ? (
									<motion.p
										initial={{
											opacity: 0,
											x: -25,
										}}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.5,
											delay: 0.9,
										}}
									>
										{`Photos for ${collection?.title}`}
									</motion.p>
								) : (
									""
								)}
							</Text>
						) : (
							""
						)}

						<CardList data={photos} avgCards={avgCards} />
					</Box>
				</Box>
			</Box>
		</>
	);
}
