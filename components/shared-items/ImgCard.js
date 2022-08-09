import React, { useEffect, useRef, useState, Skeleton, useMemo } from "react";
import styles from "../../styles/ImgCard.module.css";
import { Box, Flex, Image, Link, Text, useDisclosure } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedImageIds } from "../../features/CollectionSlice";
import { useRouter } from "next/router";
import { AiFillHeart } from "react-icons/ai";
import { ImageModal } from "../modal/ImageModal";
import {
	addFavorite,
	removeFavorite,
	selectAllImgIds,
} from "../../features/FavoriteImgSlice";

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
	const router = useRouter();
	const dispatch = useDispatch();
	const ids = useSelector((state) => selectSavedImageIds(state));
	const imgIds = useSelector((state) => selectAllImgIds(state));

	const isSaved = useMemo(() => {
		return ids?.includes(id);
	}, [ids]);

	const isFavorited = useMemo(() => {
		return imgIds?.includes(id);
	}, [imgIds]);

	// modal controller
	const { isOpen, onOpen, onClose } = useDisclosure();

	const goUserDetails = () => {
		user?.username && router.push(`/user/${user?.username}`);
	};

	const saveImg = () => {
		onOpen();
	};

	const favoriteImg = () => {
		if (!isFavorited) {
			dispatch(addFavorite(item));
		} else {
			dispatch(removeFavorite(id));
		}
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
			{/* model to handle saving img */}
			{isOpen && (
				<ImageModal image={item} isOpen={isOpen} onClose={onClose} />
			)}

			{/* giving min height to image container make the cards more good looking, while the images are loading users can see the card with 250px. */}
			{imgs?.regular || imgs?.full || imgs?.thumb || imgs?.raw ? (
				<Box
					className={styles.imgContainer}
					w="100%"
					borderRadius={{ base: "8px 8px 0 0", lgMobile: "15px" }}
					bg="rgb(168, 168, 168)"
					cursor="pointer"
				>
					<Link href={`/photos/${id}`}>
						<LazyLoadImage
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
					</Link>

					{/* todo: set up liked image list in redux toolkit and change icon title */}
					<Flex
						position="absolute"
						top="1rem"
						right="1rem"
						align="center"
						gap="0.7rem"
						className={styles.iconsContainer}
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
							<AiFillHeart className={styles.likeBtnIcon} />
						</Box>

						<Box
							bg="grey.third"
							cursor="pointer"
							borderRadius="5px"
							className={`${styles.addBtn} ${
								isSaved ? styles.added : ""
							}`}
							onClick={saveImg}
							title={isSaved ? "Remove from list" : "Add to list"}
						>
							<Box
								className={`${styles.addIcon} `}
								bg="black"
								borderRadius="50px"
							></Box>
						</Box>
					</Flex>
				</Box>
			) : (
				<Flex
					weight="100%"
					height="450px"
					bg="rgb(168, 168, 168)"
					justify="center"
					align="center"
					borderRadius="15px"
					zIndex={3}
				>
					Image not available!
				</Flex>
			)}

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
					<a
						href={links?.download}
						rel="noreferrer"
						target="_blank"
						download
					>
						<FiDownload className={styles.downloadIcon} />
					</a>
				</Box>
			</Flex>
		</Box>
	);
};
