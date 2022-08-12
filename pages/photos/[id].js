import {
	Box,
	Flex,
	Grid,
	GridItem,
	Image,
	Link,
	Skeleton,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import styles from "../../styles/ImageDetails.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { pageNum } from "../explore";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedImageIds } from "../../features/CollectionSlice";
import { FaRegEye } from "react-icons/fa";
import { BsEye, BsFillCalendarFill, BsFillCameraFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { CollectionList } from "../../components/containers/CollectionList";
import { motion } from "framer-motion";
import axios from "../../services/axios";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";
import { CardList } from "../../components/containers/CardList";
import { AiFillHeart } from "react-icons/ai";
import { ImageModal } from "../../components/modal/ImageModal";
import {
	addFavorite,
	removeFavorite,
	selectAllImgIds,
} from "../../features/FavoriteImgSlice";

const getPhotoDetails = async ({ queryKey }) => {
	const [_key, id] = queryKey;

	const { data } = await axios.get(
		`photos/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
	);

	return data;
};

const getUserPhotos = async ({ queryKey }) => {
	const [_key, username] = queryKey;

	const { data } = await axios.get(
		`users/${username}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
	);

	return data;
};

function IconBox({ children }) {
	return (
		<Flex justify="center" minWidth="22px">
			{children}
		</Flex>
	);
}

function ImageDetail() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [avgCards, setAvgCards] = useState(0);

	const ids = useSelector((state) => selectSavedImageIds(state));
	const imgIds = useSelector((state) => selectAllImgIds(state));

	const { isLoading, data: image } = useQuery(
		["imgDetails", router?.query?.id],
		getPhotoDetails,
		{
			staleTime: 10800000,
		}
	);

	const { isLoading: photoLoading, data: userPhotos } = useQuery(
		["relatedPhotos", image?.user?.username],
		getUserPhotos,
		{
			enabled: image?.user?.username?.length > 0,
			staleTime: 10800000,
		}
	);

	// modal controller
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isSaved = useMemo(() => {
		return ids?.includes(image?.id);
	}, [ids, image?.id]);

	const isFavorited = useMemo(() => {
		return imgIds?.includes(image?.id);
	}, [imgIds, image?.id]);

	// set average cards
	useEffect(() => {
		if (userPhotos?.length) {
			setAvgCards(Math.floor(userPhotos?.length / 3));
		}
	}, [userPhotos, userPhotos?.length]);

	// save and remove image
	const saveImg = () => {
		onOpen();
	};

	// favorite handling
	const favoriteImg = () => {
		if (!isFavorited) {
			dispatch(addFavorite(image));
		} else {
			dispatch(removeFavorite(image?.id));
		}
	};

	return (
		<>
			<Head>
				<title>Unsplash | Image Detail</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<Box
				w="100%"
				px={{ base: "0.6rem", sm: "1.1rem", xl: "1.2rem" }}
				my={{ base: "1rem", sm: "1.1rem", lgMobile: "1.5rem" }}
			>
				<Box
					w="100%"
					minHeight="80vh"
					borderRadius="10px"
					p={{ base: "0.8rem", sm: "1rem" }}
					bg="hsl(0, 0%, 96%)"
				>
					<Grid
						templateColumns={{
							base: "1fr 3fr",
							miniTablet: "3fr 1fr",
						}}
						templateRows={{
							base: "repeat(2, 2fr)",
							miniTablet: "1fr",
						}}
						alignItems="center"
						gap="0.8rem"
						px={{ base: "0", lg: "1rem" }}
						mb="2rem"
					>
						<GridItem
							gridColumn={{
								base: "span 3",
								miniTablet: "1 / 2",
							}}
						>
							<Flex height="100%" align="center" gap="0.5rem">
								<Link
									href={`/user/${image?.user?.image?.name}`}
									border="0"
									_focus={{
										border: 0,
									}}
								>
									<Image
										width={{ base: "42px", sm: "45px" }}
										height={{ base: "42px", sm: "45px" }}
										objectFit="cover"
										borderRadius="50%"
										src={image?.user?.profile_image?.large}
										alt={image?.user?.username}
									/>
								</Link>

								<Link
									height="max-content"
									href={`/user/${image?.user?.username}`}
									border="0"
									_hover={{
										textDecoration: "none",
									}}
									_focus={{
										border: 0,
									}}
								>
									<Text
										fontSize={{
											base: "0.9rem",
											mobile: "0.95rem",
											lg: "1rem",
										}}
										fontWeight="600"
										opacity="0.7"
										cursor="pointer"
										_hover={{
											opacity: "1",
										}}
										transition="all 230ms ease"
									>
										{image?.user?.name ??
											image?.user?.username}
									</Text>
								</Link>
							</Flex>
						</GridItem>

						<GridItem
							gridRow={{ base: "2 / 3", miniTablet: "1 / 2" }}
							gridColumn={{ base: "span 3", miniTablet: "2 / 3" }}
						>
							<Grid
								width="100%"
								templateColumns={{
									base: "max-content max-content 2fr",
									miniTablet: "repeat(3, max-content)",
								}}
								justifyContent={{
									base: "flex-start",
									miniTablet: "flex-end",
								}}
								gap="0.8rem"
							>
								<Box
									onClick={favoriteImg}
									fontSize="1.2rem"
									bg="grey.third"
									cursor="pointer"
									borderRadius="5px"
									className={`${styles.likeBtn} ${
										isFavorited ? styles.favorited : ""
									}`}
									title={isFavorited ? "Unlike" : "Like"}
								>
									<AiFillHeart
										className={styles.likeBtnIcon}
									/>
								</Box>

								<Box
									fontSize="1.1rem"
									bg="grey.third"
									cursor="pointer"
									borderRadius="5px"
									onClick={saveImg}
									className={`${styles.addBtn} ${
										isSaved ? styles.added : ""
									}`}
									title={
										ids?.includes(image?.id)
											? "Remove from list"
											: "Add to list"
									}
								>
									<Box
										className={styles.addIcon}
										bg="black"
										borderRadius="50px"
									></Box>
								</Box>

								<Box
									justifySelf="flex-end"
									width="max-content"
									height="100%"
									bg="grey.third"
									p="0.5rem 0.8rem"
									cursor="pointer"
									borderRadius="8px"
									fontSize="0.9rem"
									fontWeight="600"
									color="myblack"
									className={styles.downloadBtn}
									title="Download"
									transition="all 300ms ease"
								>
									<a
										href={image?.links?.download}
										target="_blank"
										rel="noreferrer"
										download
									>
										Download
									</a>
								</Box>
							</Grid>
						</GridItem>
					</Grid>

					{/* model to handle saving img */}
					{isOpen && (
						<ImageModal
							image={image}
							isOpen={isOpen}
							onClose={onClose}
						/>
					)}

					{/* image display */}
					<Flex
						w="100%"
						className={styles["image-side"]}
						justify="center"
						align="center"
						mb="2.5rem"
					>
						{isLoading ? (
							<div
								style={{
									height: "30vh",
									backgroundColor: "tomato",
								}}
							>
								hello world
							</div>
						) : image &&
						  image?.urls?.regular &&
						  image?.urls?.thumb &&
						  image?.urls?.full &&
						  image?.urls?.raw ? (
							<div
								// layout={true}
								// initial={{
								//     width: "300px",
								//     height: "300px",
								// }}
								// animate={{
								//     width: "max-content",
								//     height: "83vh",
								// }}
								// transition={{
								//     duration: 0.5,
								//     delay: 1,
								// }}
								className={styles.imgContainer}
								bg="rgb(168, 168, 168)"
							>
								<Image
									// className={styles.image}
									width="100%"
									height="100%"
									objectFit="cover"
									borderRadius="10px"
									src={
										image?.urls?.regular ||
										image?.urls?.full ||
										image?.urls?.thumb ||
										image?.urls?.raw
									}
									alt={
										image?.description ||
										image?.alt_description ||
										""
									}
								/>
							</div>
						) : (
							<Flex
								w="100%"
								h="420px"
								bg="grey.first"
								justify="center"
								align="center"
								borderRadius="15px"
							>
								Image not available!
							</Flex>
						)}
					</Flex>

					{/* show when we have image links */}
					{image?.urls?.regular &&
					image?.urls?.thumb &&
					image?.urls?.full &&
					image?.urls?.raw ? (
						<>
							{/* image information */}
							<Box
								className={styles["content-side"]}
								px={{ base: "0", lg: "1rem" }}
								mb="3rem"
							>
								<Flex
									direction={{
										base: "column",
										miniTablet: "row",
									}}
									gap={{ base: "0.5rem", miniTablet: "1rem" }}
									mb="2rem"
								>
									<Flex
										width="max-content"
										align="center"
										border="1.5px solid"
										borderColor="myblack"
										borderRadius="8px"
										p="0.3rem 0.8rem"
										gap="1.5rem"
									>
										{/* <Text fontSize="0.9rem">Views</Text> */}
										<BsEye fontSize="1.2rem" />
										<Text fontWeight="600">
											{isLoading
												? "--"
												: image?.views || "--"}
										</Text>
									</Flex>

									<Flex
										width="max-content"
										align="center"
										border="1.5px solid"
										borderColor="myblack"
										borderRadius="8px"
										p="0.3rem 0.8rem"
										gap="1.5rem"
									>
										{/* <Text fontSize="0.9rem">Views</Text> */}
										<FiDownload fontSize="1.2rem" />
										<Text fontWeight="600">
											{isLoading
												? "--"
												: image?.downloads || "--"}
										</Text>
									</Flex>
								</Flex>

								<Box>
									<Flex
										align="center"
										gap="0.8rem"
										mb={{ base: "0.6rem", sm: "0.8rem" }}
									>
										<IconBox>
											<IoLocationSharp fontSize="1.4rem" />
										</IconBox>

										{image?.location?.title ? (
											<a
												href={`https://www.google.com/maps/search/${image?.location?.name?.replaceAll(
													",",
													""
												)}/`}
												rel="noreferrer"
												target="_blank"
											>
												<Box
													fontWeight="500"
													position="relative"
													overflow="hidden"
													_hover={{
														textDecoration:
															"underline",
													}}
												>
													<motion.p
														whileInView={{
															x: "100%",
														}}
														viewport={{
															once: true,
															margin: "0px 0px -40px 0px",
														}}
														transition={{
															type: "tween",
															duration: 1.4,
														}}
														className={
															styles["text-cover"]
														}
													></motion.p>
													{image?.location?.title}
												</Box>
											</a>
										) : (
											<Text>--</Text>
										)}
									</Flex>

									<Flex
										align="center"
										gap="0.8rem"
										mb={{ base: "0.6rem", sm: "0.8rem" }}
									>
										<IconBox>
											<BsFillCalendarFill fontSize="1.2rem" />
										</IconBox>

										{image?.created_at ? (
											<Box
												fontWeight="500"
												position="relative"
												overflow="hidden"
											>
												<motion.p
													whileInView={{
														x: "100%",
													}}
													viewport={{
														once: true,
														margin: "0px 0px -35px 0px",
													}}
													transition={{
														type: "tween",
														duration: 1.4,
													}}
													className={
														styles["text-cover"]
													}
												></motion.p>
												Published on{" "}
												{image?.created_at
													?.split("")
													?.slice(
														0,
														image?.created_at?.indexOf(
															image?.created_at
																?.split("")
																.find(
																	(item) =>
																		item ===
																		"T"
																)
														)
													)
													.join("")}
											</Box>
										) : (
											<Text>--</Text>
										)}
									</Flex>

									<Flex align="center" gap="0.8rem">
										<IconBox>
											<BsFillCameraFill fontSize="1.2rem" />
										</IconBox>

										{image?.exif?.name ? (
											<Box
												fontWeight="500"
												position="relative"
												overflow="hidden"
											>
												<motion.p
													whileInView={{
														x: "100%",
													}}
													viewport={{
														once: true,
														margin: "0px 0px -30px 0px",
													}}
													transition={{
														type: "tween",
														duration: 1.4,
													}}
													className={
														styles["text-cover"]
													}
												></motion.p>
												{image?.exif?.name}
											</Box>
										) : (
											<Text>--</Text>
										)}
									</Flex>
								</Box>
							</Box>
						</>
					) : (
						""
					)}

					{/* related photos */}
					{userPhotos?.length > 0 ? (
						<motion.h2
							initial={{
								x: -30,
								opacity: 0,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
							}}
							viewport={{
								once: true,
								margin: "0px 0px -25px 0px",
							}}
							transition={{
								type: "tween",
								duration: 0.6,
							}}
						>
							<Text
								fontWeight="600"
								fontSize={{
									base: "1.15rem",
									miniTablet: "1.3rem",
								}}
								mb={{ base: "1.3rem", miniTablet: "1.5rem" }}
							>
								Related Photos
							</Text>
						</motion.h2>
					) : (
						""
					)}
					<Box width="100%" mb="4rem">
						{photoLoading ? (
							<CardSkeleton />
						) : (
							<CardList data={userPhotos} avgCards={avgCards} />
						)}
					</Box>

					{/* related collection */}
					{image?.related_collections?.total ? (
						<Box w="100%" mb="0.5rem">
							<motion.h2
								initial={{
									x: -30,
									opacity: 0,
								}}
								whileInView={{
									x: 0,
									opacity: 1,
								}}
								viewport={{
									once: true,
									margin: "0px 0px -25px 0px",
								}}
								transition={{
									type: "tween",
									duration: 0.6,
								}}
							>
								<Text
									fontWeight="600"
									fontSize={{
										base: "1.15rem",
										miniTablet: "1.3rem",
									}}
									mb={{
										base: "1.3rem",
										miniTablet: "1.5rem",
									}}
								>
									Related Collections
								</Text>
							</motion.h2>

							<CollectionList
								data={image?.related_collections?.results}
							/>
						</Box>
					) : (
						""
					)}
				</Box>
			</Box>
		</>
	);
}

export default ImageDetail;

export const getServerSideProps = async (context) => {
	const queryClient = new QueryClient();

	const id = context.params?.id;

	await queryClient.prefetchQuery(["imgDetails", id], getPhotoDetails);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
