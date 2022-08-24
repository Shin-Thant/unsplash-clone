import { Box, Button, Flex, Link, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUnsplash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import { CustomToast } from "./CustomToast";
import { useStorage } from "../hooks/useStorage";
import { useRecent } from "../hooks/useRecent";
import { motion } from "framer-motion";

export default function Navbar() {
	const [currentRoute, setCurrentRoute] = useState(1);

	const router = useRouter();

	const search = useRef(null);

	const toast = useToast();

	const [storage, setStorage] = useStorage("search");

	// * states for recent search list box
	const [show, setShow] = useState(false);
	const [recent, error, setRecent, recentSearch] = useRecent("recentSearch");

	const historyBox = useRef(null);
	const recentList = useRef(null);

	const effectRun = useRef(false);
	useEffect(() => {
		let isMounted = true;

		// * set recent if there is a value in the input
		if (isMounted && !effectRun.current && storage) setRecent(storage);

		return () => {
			isMounted = false;
			effectRun.current = true;
		};
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
		// !don't think this is necessary
		// if (router.pathname !== "/search/[search]") {
		// 	setStorage("");
		// 	search.current.value = "";
		// }

		return () => {
			isMounted = false;
		};
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
					<CustomToast id={id} onClose={onClose} />
				),
			});
		}
	};

	// * routing
	const changeRoute = (routeNum, routeName) => {
		setCurrentRoute(routeNum);
		router.push(routeName);
	};

	// * search input handler
	const searchController = (e) => {
		setStorage(e.target.value);
	};

	// * reset search input handler
	const closeSearch = () => {
		setStorage("");
		search.current.value = "";
	};

	// * add click event to document body to handle history box visibility
	useEffect(() => {
		const bodyClickHandler = function (e) {
			if (
				e.target !== historyBox.current &&
				e.target !== search.current &&
				e.target?.parentElement !== historyBox.current &&
				e.target?.parentElement !== recentList.current
			) {
				setShow(false);
			} else {
				setShow(true);
			}
		};

		if (typeof window !== "undefined") {
			document.body.addEventListener("click", bodyClickHandler);
		}

		return () => {
			document.body.removeEventListener("click", bodyClickHandler);
			// console.log("event removed");
		};
	}, []);

	return (
		<Flex
			position="sticky"
			top="0"
			left="0"
			right="0"
			w="100%"
			mx="auto"
			align="center"
			justify="space-between"
			gap="1.5rem"
			py="0.8rem"
			px="1.5rem"
			style={{ background: "#D5D2C3" }}
			shadow="md"
			zIndex="20"
		>
			<Link href="/" w="max-content" h="100%" fontSize="2.5rem">
				<FaUnsplash title="Unsplash" cursor="pointer" />
			</Link>

			<form
				className={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					goSearch();
				}}
			>
				<Flex
					w="100%"
					px="0.9rem"
					py="0.5rem"
					rounded="full"
					gap="1rem"
					border="2px solid"
					borderColor="hsl(0, 0%, 20%)"
					align="center"
					position="relative"
				>
					<Text
						w="max-content"
						fontSize="1.3rem"
						cursor="pointer"
						opacity="0.8"
						transition="all 200ms ease"
						_hover={{
							opacity: "1",
						}}
						onClick={goSearch}
					>
						<FiSearch />
					</Text>

					<input
						onFocus={() => {
							setShow(true);
						}}
						list="recentSearch"
						ref={search}
						onChange={searchController}
						value={storage}
						type="search"
						placeholder="Search free high-resolution photos"
						className={styles.searchInput}
					/>

					<Button
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
							search.current?.value?.length < 1 ? "none" : "flex"
						}
						onClick={closeSearch}
					>
						<IoClose />
					</Button>

					{/* recent search */}
					{recentSearch?.length && show && storage?.length < 1 ? (
						<Box
							className={styles.recentSearch}
							// * change display property according to the screend width
							ref={historyBox}
							boxShadow="xl"
							w="100%"
							bg="white"
							p="1rem 1.5rem"
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
				</Flex>
			</form>

			<div className={styles.linksContainer}>
				<Text
					as="h1"
					fontSize="0.9rem"
					height="100%"
					position="relative"
					padding="0.5rem 1.3rem"
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
					fontSize="0.9rem"
					height="100%"
					position="relative"
					padding="0.5rem 1.3rem"
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
					fontSize="0.9rem"
					height="100%"
					position="relative"
					padding="0.5rem 1.3rem"
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
					fontSize="0.9rem"
					height="100%"
					position="relative"
					padding="0.5rem 1.3rem"
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
			</div>
		</Flex>
	);
}
