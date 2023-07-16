import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styles from "../../styles/UserDetails.module.css";
import { Box, Flex, Grid, GridItem, Image, Link, Text } from "@chakra-ui/react";
import { CardSkeleton } from "../../components/skeletons/CardSkeleton";
import { CardList } from "../../components/containers/CardList";
import { motion } from "framer-motion";
import { GoGlobe } from "react-icons/go";
import { Pagination } from "../../components/shared-items/Pagination";
import { CollectionSkeleton } from "../../components/skeletons/CollectionSkeleton";
import { CollectionList } from "../../components/containers/CollectionList";
import {
	getUserPhotosAndCollection,
	getUserProfile,
} from "../../services/api/userDetails";
import IconBox from "../../components/IconBox";
import UserImageInfo from "../../components/UserImageInfo";
import { IoLocationOutline } from "react-icons/io5";


const Divider = ({ duration, delay }) => {
	return (
		<motion.div
			initial={{
				height: 0,
			}}
			animate={{
				height: 25,
			}}
			transition={{
				type: "tween",
				duration,
				delay,
			}}
		>
			<Box
				bg="black"
				opacity="0.4"
				w="1px"
				height="100%"
				borderRadius="50px"
			></Box>
		</motion.div>
	);
};

const UserDetails = () => {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [field, setField] = useState("photos");
	const [avgCards, setAvgCards] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	// track previous field
	const [prevField, setPrevField] = useState("");

	const {
		isLoading: dataLoading,
		data,
		isFetching,
	} = useQuery(
		["userPhotos", router.query?.username, field, page],
		getUserPhotosAndCollection,
		{ keepPreviousData: true, staleTime: 10800000 }
	);

	const {
		isLoading: profileLoading,
		data: profile,
		isFetched,
	} = useQuery(["userProfile", router.query?.username], getUserProfile, {
		staleTime: 10800000,
	});

	useEffect(() => {
		if (field === "photos") {
			setTotalPages(Math.ceil(profile?.total_photos / 10));
		} else if (field === "collections") {
			setTotalPages(Math.ceil(profile?.total_collections / 10));
		} else if (field === "likes") {
			setTotalPages(Math.ceil(profile?.total_likes / 10));
		}
	}, [profile, field]);

	// scrolling top
	useEffect(() => {
		let isMounted = true;
		if (isMounted && typeof window !== undefined) {
			window.scrollTo(0, 0);
			return null;
		}

		return () => {
			isMounted = false;
		};
	}, []);

	// reset field and page number when url changed
	useEffect(() => {
		let isMounted = true;
		
		if (isMounted && router.pathname === "/user/[username]" && field !== "photos") {
			changeField("photos");
		}

		return () => {
			isMounted = false;
		}
	}, [field, router?.pathname, changeField]);

	// setting average card
	useEffect(() => {
		if (data?.length) {
			setAvgCards(Math.floor(data?.length / 3));
			return null;
		}
	}, [data]);

	// methods
	const changePage = useCallback(
		(num) => {
			setPrevField(field);
			setPage(num);
			window.scrollTo(0, 0);
		},
		[field]
	);

	const changeField = useCallback((newField) => {
		setPrevField(field);

		setField(newField);
		setPage(1);
	}, [field]);


	const list = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				type: "tween",
				delay: 0.3,
				duration: 0.4,
				when: "beforeChildren",
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariant = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	const infoList = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				type: "tween",
				delay: 1.3,
				duration: 0.8,
				when: "beforeChildren",
				staggerChildren: 0.3,
			},
		},
	};

	const infoItem = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
	};

	const portfolio = {
		hidden: {
			y: 20,
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				delay: 2,
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<Head>
				{/* change this with username or user's name */}
				<title>
					User Details |{" "}
					{router?.query?.username
						? `@${router?.query?.username}`
						: "Unsplash"}
				</title>
			</Head>
			<Box
				w="100%"
				px={{
					base: "0",
					miniTablet: "0.8rem",
					md: "1.4rem",
					lg: "1.8rem",
					xl: "2.2rem",
				}}
				mt={{ base: "6rem", lg: "2rem" }}
				mb={{
					base: "0",
					miniTablet: "0.8rem",
					md: "1.5rem",
					lg: "1.8rem",
					xl: "2.2rem",
				}}
			>
				<Box
					width="100%"
					minHeight="50vh"
					mx="auto"
					borderRadius={{
						base: "10px 10px 0 0",
						miniTablet: "15px",
						lg: "20px",
					}}
					bg="hsl(0, 0%, 96%)"
					px={{ base: "0.5rem", miniTablet: "1rem" }}
					py="2rem"
					shadow="lg"
					mt="10%"
					position="relative"
				>
					<Flex
						className={styles.profileImg}
						justify="center"
						align="center"
						width="180px"
						height="180px"
						borderRadius="50%"
						bg="background"
					>
						<Image
							src={profile?.profile_image?.large}
							alt=""
							width="145px"
							height="145px"
							borderRadius="50%"
							objectFit="cover"
							bg="white"
							boxShadow="0 5px 10px rgba(0, 0, 0, 0.3)"
						/>
					</Flex>

					<Flex w="100%" align="center" flexDir="column" mt="5.5rem">
						{profileLoading ? (
							<Flex
								justify="center"
								align="center"
								height="200px"
							>
								<Text fontSize="1.2rem">Loading...</Text>
							</Flex>
						) : (
							<>
								{/* name */}
								<h1 className={styles["profile-name"]}>
									{profile?.name}
								</h1>

								{/* bio */}
								{profile?.bio?.length > 0 ? (
									<Flex
										width={{
											base: "100%",
											lgMobile: "500px",
										}}
										px={{ base: "0.3rem", sm: "0" }}
										mt="0.8rem"
										color="myblack"
										fontWeight="500"
										opacity="0.9"
										flexDir="column"
										align="center"
										fontSize={{
											base: "0.9rem",
											lgMobile: "0.95rem",
											lg: "1.05rem",
										}}
									>
										{profile?.bio?.split("\r\n")?.length >
										1 ? (
											<motion.div
												variants={list}
												initial="hidden"
												animate="visible"
												style={{ width: "100%" }}
											>
												{profile?.bio
													?.split("\r\n")
													?.map((item, i) => (
														<motion.h1
															key={`${item}${i}`}
															variants={
																itemVariant
															}
														>
															<Text
																width="100%"
																height="max-content"
																textAlign="center"
																color="myblack"
																fontWeight="500"
																wordBreak="break-word"
																opacity="0.9"
															>
																{item}
															</Text>
														</motion.h1>
													))}
											</motion.div>
										) : (
											<Text
												as="h1"
												textAlign="center"
												wordBreak="break-word"
											>
												<motion.p
													initial={{
														opacity: 0,
														y: 20,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														type: "tween",
														delay: 0.5,
														duration: 0.6,
													}}
												>
													{profile?.bio}
												</motion.p>
											</Text>
										)}
									</Flex>
								) : (
									""
								)}

								{profile?.location?.length > 0 ||
								profile?.social?.twitter_username ||
								profile?.social?.instagram_username ||
								profile?.followers_count ||
								profile?.following_count ||
								profile?.porfolio_url ||
								profile?.total_likes ? (
									<Image
										src="/decorate-line.svg"
										alt="decoration line"
										w="100px"
										my="2rem"
										objectFit="cover"
									/>
								) : (
									""
								)}

								<motion.div
									variants={infoList}
									initial="hidden"
									animate="visible"
								>
									{/* location and link */}
									{profile?.location?.length > 0 ? (
										<Flex
											width="100%"
											height="max-content"
											justify="center"
											align="center"
											gap="1rem"
											mb={{ base: "1.2rem", md: "1rem" }}
										>
											<motion.div
												style={{ width: "max-content" }}
												initial={{
													y: 20,
													opacity: 0,
												}}
												animate={{
													y: 0,
													opacity: 1,
												}}
												transition={{
													type: "tween",
													delay: 1.2,
													duration: 0.6,
												}}
											>
												<Flex
													width="max-content"
													height="100%"
													align="center"
													gap="0.2rem"
													fontSize={{
														base: "1rem",
														lg: "1.1rem",
													}}
												>
													<IoLocationOutline
														className={styles.icons}
													/>

													<a
														href={`https://www.google.com/maps/search/${profile?.location?.replaceAll(
															",",
															""
														)}/`}
														rel="noreferrer"
														target="_blank"
														className={
															styles.location
														}
													>
														{profile?.location}
													</a>
												</Flex>
											</motion.div>

											{!profile?.social
												?.instagram_username &&
											profile?.social
												?.twitter_username ? (
												<>
													<Divider
														duration={0.6}
														delay={0}
													/>

													<IconBox
														link={
															profile?.social
																?.twitter_username
														}
														alone={
															profile?.social
																?.instagram_username
																? false
																: true
														}
														to={"twitter.com"}
														delay={1.2}
													>
														<Image
															src="/custom-twitter.svg"
															alt="Twitter-icon"
															width="36px"
															height="36px"
															objectFit="cover"
														/>
													</IconBox>
												</>
											) : (
												""
											)}

											{!profile?.social
												?.twitter_username &&
											profile?.social
												?.instagram_username ? (
												<>
													<Divider
														duration={0.6}
														delay={0}
													/>

													<IconBox
														link={
															profile?.social
																?.instagram_username
														}
														alone={
															profile?.social
																?.twitter_username
																? false
																: true
														}
														to={"instagram.com"}
														delay={1.2}
													>
														<Image
															src="/custom-instagram.svg"
															alt="Instagram-icon"
															width="36px"
															height="36px"
															objectFit="cover"
														/>
													</IconBox>
												</>
											) : (
												""
											)}
										</Flex>
									) : (
										""
									)}

									{/* social links */}
									{(!profile?.location &&
										!profile?.social?.instagram_username) ||
									(!profile?.location &&
										!profile?.social?.twitter_username) ||
									(profile?.social?.twitter_username &&
										profile?.social?.instagram_username) ||
									(!profile?.location &&
										profile?.social?.instagram_username &&
										profile?.social?.twitter_username) ? (
										<Grid
											minWidth="200px"
											templateColumns="45% 3% 45%"
											justifyContent="center"
											alignItems="center"
											gap="1rem"
											mb={{ base: "1.2rem", md: "1rem" }}
										>
											{profile?.social
												?.twitter_username ? (
												<GridItem
													colSpan={
														profile?.social
															?.instagram_username
															? ""
															: 3
													}
												>
													<Flex
														flexDir="column"
														justify="center"
														align="center"
														gap="0.5rem"
													>
														<IconBox
															link={
																profile?.social
																	?.twitter_username
															}
															alone={
																profile?.social
																	?.instagram_username
																	? false
																	: true
															}
															to={"twitter.com"}
															delay={1.5}
														>
															<Image
																src="/custom-twitter.svg"
																alt="Twitter-icon"
																width="28px"
																height="28px"
																objectFit="cover"
															/>
														</IconBox>

														<motion.h1
															initial={{
																y: 15,
																opacity: 0,
															}}
															animate={{
																y: 0,
																opacity: 1,
															}}
															transition={{
																type: "tween",
																duration: 1.5,
																delay: 0.9,
															}}
														>
															<Text
																fontSize="0.9rem"
																fontWeight="500"
																opacity="0.9"
																cursor="pointer"
															>
																Twitter
															</Text>
														</motion.h1>
													</Flex>
												</GridItem>
											) : (
												""
											)}

											{profile?.social
												?.twitter_username &&
											profile?.social
												?.instagram_username ? (
												<Divider
													duration={0.6}
													delay={0.7}
												/>
											) : (
												""
											)}

											{profile?.social
												?.instagram_username ? (
												<GridItem
													colSpan={
														profile?.social
															?.twitter_username
															? ""
															: 3
													}
												>
													<Flex
														flexDir="column"
														justify="center"
														align="center"
														gap="0.5rem"
													>
														<IconBox
															link={
																profile?.social
																	?.instagram_username
															}
															alone={
																profile?.social
																	?.twitter_username
																	? false
																	: true
															}
															to={"instagram.com"}
															delay={1.5}
														>
															<Image
																src="/custom-instagram.svg"
																alt="Instagram-icon"
																width="28px"
																height="28px"
																objectFit="cover"
															/>
														</IconBox>
														<motion.h1
															initial={{
																y: 15,
																opacity: 0,
															}}
															animate={{
																y: 0,
																opacity: 1,
															}}
															transition={{
																type: "tween",
																duration: 1.5,
																delay: 0.9,
															}}
														>
															<Text
																fontSize="0.9rem"
																fontWeight="500"
																opacity="0.9"
																cursor="pointer"
															>
																Instagram
															</Text>
														</motion.h1>
													</Flex>
												</GridItem>
											) : (
												""
											)}
										</Grid>
									) : (
										""
									)}

									{/* follower, following and likes */}
									{isFetched ? (
										<Flex
											w="100%"
											justify="center"
											align="center"
											gap="2rem"
										>
											<UserImageInfo
												count={profile?.following_count}
												name={"Following"}
											/>

											<Divider duration={0.6} delay={1} />

											<UserImageInfo
												count={profile?.followers_count}
												name={"Followers"}
											/>

											<Divider duration={0.6} delay={1} />

											<UserImageInfo
												count={profile?.total_likes}
												name={"Likes"}
											/>
										</Flex>
									) : (
										""
									)}

									{/* portfolio url */}
									{profile?.portfolio_url?.length > 0 ? (
										<motion.h1
											style={{
												width: "100%",
											}}
											variants={portfolio}
											initial="hidden"
											animate="visible"
										>
											<Link
												_focus={{
													border: "0",
												}}
												target="_blank"
												href={`${profile?.portfolio_url}`}
											>
												<Flex
													w="max-content"
													mx="auto"
													justify="center"
													align="center"
													mt="1.7rem"
													gap="0.5rem"
													opacity="0.9"
													transition="all 190ms ease"
													_hover={{
														opacity: 1,
													}}
													title="Portfolio"
												>
													<GoGlobe
														className={styles.icons}
													/>

													<Text fontWeight="500">
														{profile?.portfolio_url}
													</Text>
												</Flex>
											</Link>
										</motion.h1>
									) : (
										""
									)}
								</motion.div>
							</>
						)}
					</Flex>

					<Image
						src="/decorate-line.svg"
						alt="decoration line"
						w="100px"
						mt={profileLoading ? "0" : "3.5rem"}
						mb="3rem"
						mx="auto"
						objectFit="cover"
					/>

					{/* field handler */}
					<Flex
						justify={{
							base: "center",
							miniTablet: "flex-start",
						}}
						align="center"
						gap={{
							base: "1.2rem",
							mobile: "1.3rem",
							sm: "1.5rem",
						}}
						width={{ base: "95%", miniTablet: "100%" }}
						mx="auto"
						borderBottom="1.5px solid"
						borderColor="myblack"
						mt="0.8rem"
						mb="2.5rem"
						py="0.6rem"
						px={{ base: "0", lgMobile: "0.4rem" }}
						position="relative"
						overflow="hidden"
						zIndex="2"
					>
						<Flex
							onClick={() => changeField("photos")}
							justify="center"
							align="center"
							w="max-content"
							fontWeight={field === "photos" ? "600" : "500"}
							cursor="pointer"
							px="1.1rem"
							py="0.5rem"
							gap="0.3rem"
							position="relative"
							color="myblack"
							opacity={field === "photos" ? "1" : "0.85"}
							transition="opacity 400ms ease, font-weight 250ms ease"
						>
							{field === "photos" && (
								<motion.div
									layoutId="toggler"
									className={styles.toggler}
								></motion.div>
							)}
							<Text
								fontSize={{
									base: "0.9rem",
									md: "1rem",
								}}
							>
								Photos
							</Text>
							<Text
								display={{
									base: "none",
									miniTablet: "inline-block",
								}}
							>
								{profile?.total_photos ?? ""}
							</Text>
						</Flex>
						<Flex
							onClick={() => changeField("collections")}
							justify="center"
							align="center"
							w="max-content"
							fontWeight={field === "collections" ? "600" : "500"}
							cursor="pointer"
							px="1.1rem"
							py="0.5rem"
							gap="0.3rem"
							position="relative"
							color="myblack"
							opacity={field === "collections" ? "1" : "0.85"}
							transition="opacity 400ms ease, font-weight 250ms ease"
						>
							{field === "collections" && (
								<motion.div
									layoutId="toggler"
									className={styles.toggler}
								></motion.div>
							)}
							<Text
								fontSize={{
									base: "0.9rem",
									md: "1rem",
								}}
							>
								Collections
							</Text>
							<Text
								display={{
									base: "none",
									miniTablet: "inline-block",
								}}
							>
								{profile?.total_collections ?? ""}
							</Text>
						</Flex>
						<Flex
							onClick={() => changeField("likes")}
							justify="center"
							align="center"
							w="max-content"
							fontWeight={field === "likes" ? "600" : "500"}
							cursor="pointer"
							px="1.1rem"
							py="0.5rem"
							gap="0.3rem"
							position="relative"
							color="myblack"
							opacity={field === "likes" ? "1" : "0.85"}
							transition="opacity 400ms ease, font-weight 250ms ease"
						>
							{field === "likes" && (
								<motion.div
									layoutId="toggler"
									className={styles.toggler}
								></motion.div>
							)}
							<Text
								fontSize={{
									base: "0.9rem",
									md: "1rem",
								}}
							>
								Likes
							</Text>
							<Text
								display={{
									base: "none",
									miniTablet: "inline-block",
								}}
							>
								{profile?.total_likes ?? ""}
							</Text>
						</Flex>
					</Flex>

					<Box w="100%" mb="3rem">
						{field === "photos" ? (
							dataLoading ? (
								<CardSkeleton />
							) : prevField !== "photos" && isFetching ? (
								<CardSkeleton />
							) : (
								<CardList data={data} avgCards={avgCards} />
							)
						) : field === "collections" ? (
							dataLoading ? (
								<CollectionSkeleton />
							) : prevField !== "collections" && isFetching ? (
								<CollectionSkeleton />
							) : (
								<CollectionList data={data} />
							)
						) : field === "likes" ? (
							dataLoading ? (
								<CardSkeleton />
							) : prevField !== "likes" && isFetching ? (
								<CardSkeleton />
							) : (
								<CardList data={data} avgCards={avgCards} />
							)
						) : (
							""
						)}
					</Box>

					{totalPages > 1 ? (
						<Flex w="100%" justify="center">
							<Pagination
								changePage={changePage}
								page={page}
								totalPages={totalPages}
							/>
						</Flex>
					) : (
						""
					)}
				</Box>
			</Box>
		</>
	);
}

export default UserDetails;

export const getServerSideProps = async (context) => {
	const username = context.params?.username;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		["userPhotos", username, "photos", 1],
		getUserPhotosAndCollection
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
