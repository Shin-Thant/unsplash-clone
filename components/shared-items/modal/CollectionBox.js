import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addImage,
	initAction,
	removeImage,
	selectCollectionById,
} from "../../../features/CollectionSlice";
import styles from "../../../styles/ImageModal.module.css";
import { motion } from "framer-motion";

const CollectionBox = ({ image, collectionId }) => {
	const isLoading = useSelector((state) => state.collection?.loading);
	const { name, previewImgs, images } = useSelector((state) =>
		selectCollectionById(state, collectionId)
	);
	const dispatch = useDispatch();

	const isExisted = useMemo(() => {
		return images?.includes(image?.id);
	}, [images?.length, image?.id]);

	const imgAction = () => {
		// add and remove image to and from collection
		dispatch(initAction());
		if (!isExisted) {
			dispatch(addImage({ collectionId, image }));
		} else {
			dispatch(removeImage({ collectionId, imgId: image.id }));
		}
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

	return (
		<motion.div variants={item}>
			<Flex
				justify="space-between"
				align="center"
				gap="0.4rem"
				width="100%"
				height={{ base: "5.2rem", modalBreak: "6rem" }}
				borderRadius="8px"
				p="1rem"
				mb="1rem"
				bg={isExisted ? "#9B5D31" : "hsl(0, 0%, 20%)"}
				position="relative"
				zIndex="2"
				border="1px solid"
				borderColor={isExisted ? "#9B5D31" : "hsl(0, 0%, 20%)"}
				borderLeftWidth="8px"
				borderLeftColor={isExisted ? "#9B5D31" : "hsl(0, 0%, 20%)"}
				transition="box-shadow 200ms ease"
				color="myblack"
				_hover={{
					boxShadow: "0 3px 10px 0px hsla(0, 0%, 0%, 0.25)",
				}}
				className={styles.collectionBox}
			>
				<Box zIndex="3">
					<Text
						fontSize={{
							base: "1.1rem",
							modalBreak: "1.15rem",
						}}
						color={images?.length ? "white" : "myblack"}
						fontWeight="600"
					>
						{name
							?.replace(name[0], name[0].toUpperCase())
							.replace("-", " ")}
					</Text>

					<Text
						color={images?.length ? "white" : "myblack"}
						mt="0.5rem"
						fontWeight="600"
						fontSize={{
							base: "0.88rem",
							modalBreak: "0.95rem",
						}}
					>
						{images?.length}{" "}
						{images?.length > 1 || images?.length === 0
							? "photos"
							: "photo"}
					</Text>
				</Box>

				<Button
					isLoading={isLoading}
					spinner={
						<Spinner
							size="md"
							thickness="3.5px"
							colorScheme="white"
							color="white"
						/>
					}
					color="white"
					bg="transparent"
					_hover={{
						bg: "transparent",
					}}
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
					p="0"
					zIndex={2}
					position="relative"
					onClick={imgAction}
				>
					<Box
						bg={images?.length ? "white" : "black"}
						className={`${styles.plus} ${
							isExisted ? styles.added : ""
						}`}
					></Box>
				</Button>

				{/* bg image */}
				{images?.length >= 1 ? (
					<Flex
						justify="center"
						align="center"
						position="absolute"
						top="0"
						left="0"
						width="100%"
						height="100%"
						zIndex={1}
						overflow="hidden"
						borderRadius="7px"
						className={styles.collectionImg}
					>
						<Image
							src={previewImgs[0]?.urls?.regular}
							alt=""
							width="100%"
							objectFit="cover"
						/>
					</Flex>
				) : (
					<Box
						position="absolute"
						top="0"
						left="0"
						width="100%"
						height="100%"
						borderRadius="7px"
						bg="hsl(0, 0%, 96%)"
					></Box>
				)}
			</Flex>
		</motion.div>
	);
};
// * wrap CollectionBox with React.memeo()
export const MemoCollectionBox = React.memo(CollectionBox);
