import { Box, Flex, Image, Text } from "@chakra-ui/react";
import styles from "../styles/Explore.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { CardSkeleton } from "../components/skeletons/CardSkeleton";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { UpBtn } from "../components/UpBtn";
import { CardList } from "../components/containers/CardList";
import { NormalPagination } from "../components/shared-items/NormalPagination";
import axios from "../services/axios";
import FloatExploreText from "../components/FloatExploreText";

const getPhotos = async ({ queryKey }) => {
	const [_key, page] = queryKey;

	const { data } = await axios.get(
		`photos/?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=18&page=${page}`
	);

	return data;
};

export default function Explore() {
	const [avgCards, setAvgCards] = useState(0);

	const [page, setPage] = useState(1);

	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	//     if (images?.length >= 1) setLoading(false);
	// }, []);

	const {
		isLoading,
		error,
		data: images,
	} = useQuery(["getPhotos", page], getPhotos, {
		keepPreviousData: true,
		staleTime: 3600000,
	});

	// scroll up
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scrollTo(0, 0);
		}
	}, [page]);

	// set average cards
	useEffect(() => {
		let isMounted = true;
		if (images?.length) {
			setAvgCards(Math.floor(images?.length / 3));
		}

		return () => {
			isMounted = false;
		};
	}, [images, images?.length]);

	// pagination handler functions
	const goPrevious = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const goNext = () => {
		setPage(page + 1);
	};

	return (
		<>
			<Head>
				<title>Unsplash | Explore</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<Box
				w="100%"
				px={{ base: "0.8rem", sm: "1.1rem", lg: "1.2rem" }}
				my="3rem"
			>
				<UpBtn />

				<Box bg="background" mt="1.5rem" className={styles.introText}>
					<Flex
						direction={{ base: "column", mobile: "row" }}
						align={{ base: "center", mobile: "center" }}
						justify={{ base: "center", mobile: "flex-start" }}
						gap={{ base: "0", mobile: "0.9rem" }}
						fontWeight="800"
						letterSpacing="0.05em"
						textTransform="uppercase"
						className={styles.intro}
						w={{ base: "100%", mobile: "max-content" }}
					>
						<Text className={styles.firstText}>
							Start Exploring
						</Text>{" "}
						<Text className={styles.secondText}>With Us</Text>
					</Flex>

					<FloatExploreText />
				</Box>

				{isLoading ? (
					<CardSkeleton />
				) : (
					<CardList data={images} avgCards={avgCards} />
				)}

				<Flex w="100%" justify="center" align="center" mt="5rem">
					<NormalPagination
						goNext={goNext}
						goPrevious={goPrevious}
						current={page}
					/>
				</Flex>
			</Box>

			{/* </Box> */}
		</>
	);
}

export const getServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(["getPhotos", 1], getPhotos);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
