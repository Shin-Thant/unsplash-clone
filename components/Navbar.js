import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Input,
	Link,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaUnsplash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { IoClose, IoSearchCircle } from "react-icons/io5";
import CustomToast from "./CustomToast";
import { useStorage } from "../hooks/useStorage";
import { useRecent } from "../hooks/useRecent";
import { motion } from "framer-motion";
import { MdMenu } from "react-icons/md";
import NavbarDrawer from "./NavbarDrawer";
import { useNavbarContext } from "../context/navbarContext/navbarContext";

export default function Navbar() {
	const { currentRoute, setCurrentRoute } = useNavbarContext();
	const router = useRouter();
	const search = useRef(null);
	const toast = useToast();
	const [inputOpen, setInputOpen] = useState(false);

	const [storage, setStorage] = useStorage("search");

	// drawer controller
	const { isOpen, onOpen, onClose } = useDisclosure();
	const closeDrawer = useCallback(() => {
		onClose();
		document.querySelector("body").style.overflowY = "auto";
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// * states for recent search list box
	const [show, setShow] = useState(false);
	const [recent, error, setRecent, recentSearch] = useRecent("recentSearch");

	const historyBox = useRef(null);
	const recentList = useRef(null);
	const form = useRef(null);
	const containerRef = useRef(null);
	const closeBtnRef = useRef(null);
	const searchBtnRef = useRef(null);

	const effectRan = useRef(false);
	useEffect(() => {
		// * set recent if there is a value in the input
		if (!effectRan.current && storage) setRecent(storage);

		return () => {
			effectRan.current = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			// * handling currentRoute state on router change
			if (router.pathname === "/") setCurrentRoute(1);
			else if (router.pathname === "/explore") setCurrentRoute(2);
			else if (router.pathname === "/collections") setCurrentRoute(3);
			else if (router.pathname === "/contact") setCurrentRoute(4);

			// * handling search bar value with parameter from url
			if (router.query?.search) {
				if (storage !== router?.query?.search) {
					setStorage(router?.query?.search);
				}
				setRecent(router.query?.search);
			}
		}

		// * setting storage if the current page is not search page
		// ! don't think this is necessary
		// if (router.pathname !== "/search/[search]") {
		// 	setStorage("");
		// 	search.current.value = "";
		// }

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	// * searching input handler
	const goSearch = () => {
		if (storage) {
			if (router.pathname !== "/search/[search]") {
				router.push(`/search/${storage}`);
			} else {
				router.push(`/search/${storage}`, undefined, {
					shallow: true,
				});
			}
			// * setting recent search
			setRecent(storage);

			// * remove focus from input
			search.current?.blur();

			// * hide history box
			setShow(false);
		} else {
			toast({
				duration: 3000,
				position: "bottom-left",
				isClosable: true,
				// * adding custom toast with close button
				render: ({ id, onClose }) => (
					<CustomToast
						id={id}
						onClose={onClose}
						message={"Enter some inputs to search!"}
					/>
				),
			});
		}
	};

	// * routing
	const changeRoute = useCallback((routeNum, routeName) => {
		setCurrentRoute(routeNum);
		router.push(routeName);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// * search input handler
	const searchController = (e) => {
		if (e.target.value?.length < 1) {
			setShow(true);
		}
		setStorage(e.target.value);
	};

	// * reset search input handler
	const closeSearch = () => {
		setInputOpen(true);
		setShow(true);
		search.current?.focus();
		setStorage("");
		search.current.value = "";
	};

	// * add click event to document body to handle history box visibility
	useEffect(() => {
		const bodyClickHandler = function (e) {
			if (
				e.target !== containerRef.current &&
				e.target !== historyBox.current &&
				e.target !== search.current &&
				e.target !== closeBtnRef.current &&
				e.target !== searchBtnRef.current &&
				e.target?.parentElement !== closeBtnRef.current &&
				e.target?.parentElement !== searchBtnRef.current &&
				e.target?.parentElement !== historyBox.current &&
				e.target?.parentElement !== recentList.current
			) {
				setInputOpen(false);
				setShow(false);
			} else {
				setInputOpen(true);
				setShow(true);
			}
		};

		if (typeof window !== "undefined") {
			document.body.addEventListener("click", bodyClickHandler);
		}

		return () => {
			document.body.removeEventListener("click", bodyClickHandler);
		};
	}, []);

	const openInput = () => {
		search.current?.focus();
		setInputOpen(true);
		setShow(true);
	};

	return (
		<Grid
			templateColumns={{
				base: "max-content 1fr max-content",
				md: "max-content 1fr max-content",
			}}
			justifyContent={{ base: "space-between", md: "flex-start" }}
			alignItems="center"
			gap={{ base: "0.7rem", sm: "1rem", lg: "1.5rem", xl: "1.8rem" }}
			position="sticky"
			top="0"
			left="0"
			right="0"
			width="100%"
			mx="auto"
			py="0.5rem"
			px={{
				base: "0.5rem",
				smMobile: "0.9rem",
				md: "1rem",
				lg: "1.5rem",
			}}
			bgColor="background"
			// style={{ background: "#D5D2C3" }}
			shadow="lg"
			zIndex="20"
		>
			{isOpen ? (
				<NavbarDrawer changeRoute={changeRoute} onClose={closeDrawer} />
			) : (
				""
			)}

			<Link
				display="block"
				href="/"
				width="max-content"
				height="max-content"
				fontSize={{ base: "2.35rem", lg: "2.5rem" }}
			>
				<FaUnsplash title="Unsplash" cursor="pointer" />
			</Link>

			<GridItem
				width={{ base: "100%", sm: "max-content", md: "100%" }}
				position="relative"
				justifySelf={{ base: "flex-end", md: "" }}
			>
				<form
					ref={form}
					className={`${styles.form} ${
						search.current?.value?.length || inputOpen
							? styles["form--open"]
							: ""
					}`}
					onSubmit={(e) => {
						e.preventDefault();
						goSearch();
					}}
				>
					<Flex
						ref={containerRef}
						onClick={openInput}
						className={styles["form__container"]}
						overflow="hidden"
						rounded="full"
						// gap={{ base: "0", md: "0.8rem" }}
						border="2px solid"
						borderColor="hsl(0, 0%, 20%)"
						align="center"
						position="relative"
					>
						<Button
							display={{ base: "none", md: "flex" }}
							ref={searchBtnRef}
							p="0"
							className={
								styles[
									"form__container__input-container__searchBtn"
								]
							}
							bgColor="transparent"
							// bgColor="skyblue"
							width="35px"
							minWidth="35px"
							height="35px"
							fontSize="1.2rem"
							cursor="pointer"
							opacity="0.8"
							transition="all 600ms ease, opacity 200ms ease"
							_hover={{
								opacity: "1",
							}}
							_focus={{
								opacity: "1",
							}}
							_active={{
								opacity: "1",
							}}
							onClick={goSearch}
						>
							<FiSearch />
						</Button>
						<Button
							display={{ base: "flex", md: "none" }}
							ref={searchBtnRef}
							p="0"
							className={
								styles[
									"form__container__input-container__searchBtn"
								]
							}
							bgColor="transparent"
							width="35px"
							minWidth="35px"
							height="35px"
							borderRadius="full"
							fontSize="1.2rem"
							cursor="pointer"
							opacity="0.8"
							transition="all 600ms ease, opacity 200ms ease"
							_hover={{
								opacity: "1",
							}}
							_focus={{
								opacity: "1",
							}}
							_active={{
								opacity: "1",
							}}
							onClick={() => {
								if (inputOpen) {
									goSearch();
								} else {
									setShow(true);
									setInputOpen(true);
									search.current.focus();
								}
							}}
						>
							<FiSearch style={{ pointerEvents: "none" }} />
						</Button>

						<Flex
							className={
								styles["form__container__input-container"]
							}
							transition="all 300ms ease"
							align="center"
							gap={{ base: "0.1rem", mobile: "0.3rem" }}
							height="100%"
						>
							<Input
								transition="all 500ms ease"
								border="0"
								padding="0"
								outline="0"
								height="100%"
								color="myblack"
								_focus={{
									border: "0",
								}}
								width="100%"
								list="recentSearch"
								ref={search}
								onChange={searchController}
								value={storage}
								placeholder={
									"Search free high-resolution photos"
								}
								_placeholder={{
									color: "hsl(0, 0%, 40%)",
								}}
							/>

							<Button
								type="reset"
								ref={closeBtnRef}
								p="0"
								bg="transparent"
								minWidth="max-content"
								width="max-content"
								height="max-content"
								fontSize="1.5rem"
								cursor="pointer"
								opacity="0.7"
								transition="all 200ms ease"
								_hover={{
									opacity: "1",
								}}
								_focus={{
									opacity: "1",
								}}
								_active={{
									opacity: "1",
								}}
								display={
									search.current?.value?.length ||
									storage?.length
										? "flex"
										: "none"
								}
								onClick={closeSearch}
							>
								<IoClose />
							</Button>
						</Flex>
					</Flex>

					{/* recent search */}
					{recentSearch?.length && show && !search.current.value ? (
						<Box
							className={styles["form__recentSearch"]}
							position="absolute"
							display={{ base: "none", smMobile: "block" }}
							minWidth={{
								base: "100%",
								sm: "400px",
								md: "100%",
							}}
							bg="white"
							top="120%"
							zIndex="10"
							// * change display property according to the screend width
							ref={historyBox}
							boxShadow="xl"
							w="100%"
							p={{ base: "0.85rem", lg: "1rem 1.5rem 1.2rem" }}
							borderRadius="8px"
						>
							<Flex
								mb="1.5rem"
								align="center"
								justify="space-between"
							>
								<Text fontWeight="600" fontSize="1.2rem">
									Recent{" "}
									{recentSearch?.length > 1
										? "Searches"
										: "Search"}
								</Text>
								<Text
									cursor="pointer"
									fontWeight="500"
									fontSize="0.8rem"
									_hover={{
										textDecoration: "underline",
									}}
									onClick={() => setRecent([])}
								>
									Clear
								</Text>
							</Flex>

							<Flex
								ref={recentList}
								align="center"
								gap="1rem"
								wrap="wrap"
							>
								{recentSearch?.map((item, index) => (
									<Box
										key={index}
										border="1.5px solid"
										borderColor="myblack"
										borderRadius="8px"
										color="myblack"
										fontWeight="500"
										p="0.3rem 0.8rem"
										cursor="pointer"
										fontSize="0.9rem"
										bg="white"
										_hover={{
											boxShadow: "lg",
										}}
										className={styles.recentItem}
										onClick={() => {
											router.push(`/search/${item}`);
											setStorage(item);
											search.current.value = storage;

											setRecent(item);

											// * hide history box
											setShow(false);
										}}
									>
										{item}
									</Box>
								))}
							</Flex>
						</Box>
					) : (
						""
					)}
				</form>
			</GridItem>

			{/* nav links (desktop) */}
			<Flex
				display={{ base: "none", md: "flex" }}
				height="max-content"
				align="center"
				gap={{ md: "0", lg: "0.5rem" }}
			>
				<Text
					as="h1"
					fontSize={{ base: "0.85rem" }}
					height="max-content"
					position="relative"
					py="0.5rem"
					px={{ base: "0.78rem", lg: "1rem", xl: "1.2rem" }}
					fontWeight="500"
					cursor="pointer"
					color={currentRoute === 1 ? "white" : "brown.2000"}
					_hover={{
						color: "white",
					}}
					transition="color 200ms ease"
					onClick={() => changeRoute(1, "/")}
				>
					HOME
					{currentRoute === 1 && (
						<motion.div
							layoutId="slider"
							className={styles.slider}
						></motion.div>
					)}
				</Text>

				<Text
					as="h1"
					fontSize={{ base: "0.85rem" }}
					height="max-content"
					position="relative"
					py="0.5rem"
					px={{ base: "0.78rem", lg: "1rem", xl: "1.2rem" }}
					fontWeight="500"
					cursor="pointer"
					color={currentRoute === 2 ? "white" : "brown.2000"}
					_hover={{
						color: "white",
					}}
					transition="color 200ms ease"
					onClick={() => changeRoute(2, "/explore")}
				>
					EXPLORE
					{currentRoute === 2 && (
						<motion.div
							layoutId="slider"
							className={styles.slider}
						></motion.div>
					)}
				</Text>

				<Text
					as="h1"
					fontSize={{ base: "0.85rem" }}
					height="max-content"
					position="relative"
					py="0.5rem"
					px={{ base: "0.78rem", lg: "1rem", xl: "1.2rem" }}
					fontWeight="500"
					cursor="pointer"
					color={currentRoute === 3 ? "white" : "brown.2000"}
					_hover={{
						color: "white",
					}}
					transition="color 200ms ease"
					onClick={() => changeRoute(3, "/collections")}
				>
					COLLECTIONS
					{currentRoute === 3 && (
						<motion.div
							layoutId="slider"
							className={styles.slider}
						></motion.div>
					)}
				</Text>

				<Text
					as="h1"
					fontSize={{ base: "0.85rem" }}
					height="max-content"
					position="relative"
					py="0.5rem"
					px={{ base: "0.78rem", lg: "1rem", xl: "1.2rem" }}
					fontWeight="500"
					cursor="pointer"
					color={currentRoute === 4 ? "white" : "brown.2000"}
					_hover={{
						color: "white",
					}}
					transition="color 200ms ease"
					onClick={() => changeRoute(4, "/contact")}
				>
					CONTACT US
					{currentRoute === 4 && (
						<motion.div
							layoutId="slider"
							className={styles.slider}
						></motion.div>
					)}
				</Text>
			</Flex>

			{/* toggle btn */}
			<Button
				onClick={() => {
					onOpen();
					document.querySelector("body").style.overflowY = "hidden";
				}}
				fontSize="1.5rem"
				p="0"
				height="35px"
				display={{ base: "flex", md: "none" }}
				bgColor="hsl(214, 32%, 94%)"
				_hover={{
					bgColor: "hsl(214, 35%, 90%)",
				}}
				_focus={{
					border: 0,
					bgColor: "hsl(214, 30%, 90%)",
				}}
				_active={{
					border: 0,
				}}
			>
				<MdMenu />
			</Button>
		</Grid>
	);
}
