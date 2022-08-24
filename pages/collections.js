import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/CollectionPage.module.css";
import { FloatCollectionText } from "../components/FloatCollectionText";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectAllCollections } from "../features/CollectionSlice";
import { CollectionList } from "../components/containers/CollectionList";
import { CardList } from "../components/containers/CardList";
import { selectAllFavoritedImgs } from "../features/FavoriteImgSlice";

function Collections() {
	const [section, setSection] = useState("collections");
	const [avgCards, setAvgCards] = useState(0);

	const collections = useSelector((state) => selectAllCollections(state));
	const favoritedImgs = useSelector((state) => selectAllFavoritedImgs(state));

	useEffect(() => {
		let isMounted = true;

		if (isMounted && favoritedImgs?.length) {
			setAvgCards(favoritedImgs?.length);
		}

		return () => {
			isMounted = false;
		};
	}, [favoritedImgs?.length]);

	return (
		<>
			<Head>
				<title>Unsplash | Collections and Favorited Images</title>
			</Head>
			<Box width="100%" px="1.5rem" mt="13rem" pb="1.5rem" shadow="xl">
				<FloatCollectionText />

				<Box
					p="1.5rem"
					borderRadius="15px"
					minHeight="90vh"
					bg="rgba(255, 255, 255, 0.5)"
					backdropFilter="blur(5px)"
					position="relative"
					zIndex={5}
				>
					<Flex
						align="center"
						width="max-content"
						height="max-content"
						gap="1.5rem"
						mb="2rem"
					>
						<Flex
							onClick={() => setSection("collections")}
							width="100%"
							cursor="pointer"
							p="0.5rem 0.8rem"
							fontWeight="500"
							position="relative"
							justify="center"
							align="center"
							gap="0.4rem"
							color="black"
							opacity={section === "collections" ? "1" : "0.8"}
							transition="opacity 150ms ease"
							_hover={{
								opacity: 1,
							}}
						>
							Collections
							<Text
								fontSize="0.92rem"
								fontWeight="600"
								p="0.1rem 0.5rem"
								borderRadius="5px"
								color={
									section === "collections"
										? "white"
										: "black"
								}
								bg={
									section === "collections"
										? "brown.1000"
										: "transparent"
								}
								opacity="1"
								transition="all 200ms ease"
							>
								{collections?.length}
							</Text>
							{section === "collections" && (
								<motion.div
									layoutId="highlight"
									transition={{
										type: "tween",
										duration: 0.4,
									}}
									className={styles.highlight}
								></motion.div>
							)}
						</Flex>

						<Box
							width="5px"
							height="20px"
							borderRadius="50px"
							bg="hsl(0, 5%, 30%)"
						></Box>

						<Flex
							onClick={() => setSection("likes")}
							width="100%"
							cursor="pointer"
							p="0.5rem 0.8rem"
							fontWeight="500"
							position="relative"
							justify="center"
							align="center"
							gap="0.4rem"
							color="black"
							opacity={section === "likes" ? "1" : "0.8"}
							transition="opacity 150ms ease"
							_hover={{
								opacity: 1,
							}}
						>
							Likes
							<Text
								fontSize="0.92rem"
								fontWeight="600"
								p="0.1rem 0.5rem"
								borderRadius="5px"
								color={section === "likes" ? "white" : "black"}
								bg={
									section === "likes"
										? "brown.1000"
										: "transparent"
								}
								opacity="1"
								transition="all 200ms ease"
							>
								{favoritedImgs?.length}
							</Text>
							{section === "likes" && (
								<motion.div
									layoutId="highlight"
									transition={{
										type: "tween",
										duration: 0.4,
									}}
									className={styles.highlight}
								></motion.div>
							)}
						</Flex>
					</Flex>

					{section === "collections" ? (
						<CollectionList data={collections} />
					) : section === "likes" ? (
						<CardList data={favoritedImgs} avgCards={avgCards} />
					) : (
						"loading..."
					)}
				</Box>
			</Box>
		</>
	);
}

export default Collections;
