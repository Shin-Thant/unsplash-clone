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
import React, { useCallback, useEffect } from "react";
import { FaUnsplash } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { useStorage } from "../hooks/useStorage";
import { motion } from "framer-motion";
import { MdMenu } from "react-icons/md";
import NavbarDrawer from "./NavbarDrawer";
import { useNavbarContext } from "../context/navbarContext/navbarContext";
import NavbarInputForm from "./NavbarInputForm";

export default function Navbar() {
	const { currentRoute, setCurrentRoute } = useNavbarContext();
	const router = useRouter();

	const [persistedSearchInput, setPersistedSearchInput] =
		useStorage("search");

	// * drawer controller
	const { isOpen, onOpen, onClose } = useDisclosure();
	const closeDrawer = useCallback(() => {
		onClose();
		document.querySelector("body").style.overflowY = "auto";
	}, [onClose]);

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			// * handling currentRoute state on router change
			if (router.pathname === "/") setCurrentRoute(1);
			else if (router.pathname === "/explore") setCurrentRoute(2);
			else if (router.pathname === "/collections") setCurrentRoute(3);
			else if (router.pathname === "/contact") setCurrentRoute(4);

			// * handling search bar value with parameter from url
			// ! move to other component
			// if (router.query?.search) {
			// 	if (persistedSearchInput !== router?.query?.search) {
			// 		setPersistedSearchInput(router?.query?.search);
			// 	}
			// 	setRecent(router.query?.search);
			// }
		}

		return () => {
			console.log("cleanup 91");
			isMounted = false;
		};
	}, [
		router.pathname,
		router.query?.search,
		setCurrentRoute,
		persistedSearchInput,
		setPersistedSearchInput,
	]);

	// * routing
	const changeRoute = (routeNum, routeName) => {
		setCurrentRoute(routeNum);
		router.push(routeName);
	};

	// * search input handler
	const searchController = (e) => {
		if (e.target.value?.length < 1) {
			setShow(true);
		}
		setPersistedSearchInput(e.target.value);
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
				<NavbarInputForm />
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
