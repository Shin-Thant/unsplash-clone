import Head from "next/head";
import { Box, Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { CgArrowLongRight } from "react-icons/cg";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useRouter } from "next/router";
import axios from "../services/axios";

const getRandomImg = async () => {
	const { data } = await axios.get(
		`photos/random?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&query=brown&orientation=portrait`
	);

	return data;
};

export default function Home() {
	const router = useRouter();

	const goExplore = () => {
		router.push("/explore");
	};

	const { isLoading, error, data, isPreviousData } = useQuery(
		"randomImg",
		getRandomImg,
		{
			keepPreviousData: true,
			staleTime: 900000,
		}
	);

	return (
		<>
			<Head>
				<title>Unsplash | Home</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<Box width="100%">
				{/* side icons */}
				<Flex
					direction="column"
					justify="center"
					gap="1.4rem"
					className={styles.followUs}
				>
					<Box
						width="3px"
						height="7.5rem"
						bg="white"
						display="inline-block"
						alignSelf="center"
						className={styles.lightSaber}
					></Box>
					<Text
						cursor="pointer"
						color="white"
						className={`${styles.links} ${styles.first}`}
						title="facebook"
					>
						<FaFacebookF fontSize="1.3rem" />
					</Text>
					<Text
						cursor="pointer"
						color="white"
						className={`${styles.links} ${styles.second}`}
						title="twitter"
					>
						<FaTwitter fontSize="1.3rem" />
					</Text>
					<Text
						cursor="pointer"
						color="white"
						className={`${styles.links} ${styles.third}`}
						title="instagram"
					>
						<FiInstagram fontSize="1.3rem" />
					</Text>
				</Flex>

				{/* main */}
				<Flex
					w="100%"
					minH="85vh"
					justify="center"
					align="center"
					direction="column"
				>
					<Box className={styles.container}>
						<Box className={styles.img_container}>
							{isLoading ? (
								<Skeleton
									startColor="#F0F0F0"
									endColor="#6A6A6A"
									width="310px"
									height="75vh"
									borderRadius="200px 200px 0 0"
								/>
							) : data?.urls?.regular ||
							  data?.urls?.full ||
							  data?.urls?.thumb ? (
								<Image
									bg="gray.50"
									src={data?.urls?.regular}
									alt={
										data?.description
											? data?.description
											: ""
									}
									className={styles.img}
								/>
							) : (
								<Flex
									w="100%"
									h="100%"
									bg="#9E6E44"
									justify="center"
									align="center"
									borderRadius="200px 200px 0 0"
								>
									Image not available!
								</Flex>
							)}
							<img
								src="./circle-text.svg"
								alt="circle-image"
								className={styles.circle}
							/>
						</Box>

						<Box
							gap="0.4rem"
							width="100%"
							mb="0.5rem"
							letterSpacing="0.08rem"
							zIndex="2"
						>
							<Text
								className={styles.mainName}
								display="inline-block"
								w="max-content"
								fontSize="4.5rem"
								fontWeight="700"
								letterSpacing="0.15em"
								color="brown.1000"
								mb="1rem"
								textTransform="uppercase"
								position="relative"
								overflow="hidden"
								fontFamily="condensed"
							>
								unsplash
							</Text>

							<Grid
								templateColumns="repeat(4, max-content)"
								alignItems="center"
								gap="0.4rem"
								fontSize="2rem"
								fontWeight="600"
								lineHeight="1.1em"
								w="max-content"
								color="hsl(0, 0%, 22%)"
								zIndex="5"
							>
								<Text>For Ultimate</Text>
								<Box
									d="inline-block"
									color="brown.1000"
									position="relative"
									p="0.3rem 0.5rem"
								>
									<Text>Photos</Text>
									<Box className={styles.highlight}></Box>
								</Box>
								<Text>and</Text>
								<Box
									d="inline-block"
									color="brown.1000"
									position="relative"
									p="0.3rem 0.5rem"
								>
									<Text>Wallpapers</Text>
									<Box className={styles.highlight}></Box>
								</Box>
							</Grid>
						</Box>

						<Box
							fontSize="1.2rem"
							fontWeight="600"
							mb="3rem"
							color="hsl(0, 0%, 22%)"
						>
							With thousands of worldwide creators.
						</Box>

						<Flex
							onClick={goExplore}
							className={styles.btn}
							align="center"
							gap="0.6rem"
							w="max-content"
							cursor="pointer"
							p="0.65rem 1.2rem"
							position="relative"
						>
							<Text
								fontSize="0.95rem"
								fontWeight="700"
								fontFamily="condensed"
								letterSpacing="0.3rem"
							>
								Get Started
							</Text>
							<CgArrowLongRight
								className={styles.arrow}
								fontSize="1.8rem"
							/>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</>
	);
}

// ! new ramdom image is fetched whenever you visit the page
// export const getStaticProps = async () => {
//     const queryClient = new QueryClient();

//     await queryClient.prefetchQuery("randomImg", getRandomImg);

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     };
// };
