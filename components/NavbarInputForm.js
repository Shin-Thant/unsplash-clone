import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useRecent } from "../hooks/useRecent";
import { useStorage } from "../hooks/useStorage";
import styles from "../styles/Navbar.module.css";
import CustomToast from "./CustomToast";
import RecentSearchedList from "./RecentSearchedList";
import SearchInput from "./SearchInput";

const NavbarInputForm = () => {
	const router = useRouter();
	const toast = useToast();

	// state for form's width (mobile and tablet only)
	const [inputOpen, setInputOpen] = useState(false);

	// * input state
	const [searchInput, setSearchInput] = useState("");

	// * states for recent search list box
	const [show, setShow] = useState(false);
	const [recent, error, setRecent, recentList] = useRecent("recentSearch");

	// * ref for components inside form
	const searchRef = useRef(null);
	const recentListContainerRef = useRef(null);
	const recentListRef = useRef(null);
	const form = useRef(null);
	const containerRef = useRef(null);
	const closeBtnRef = useRef(null);
	const searchBtnRef = useRef(null);

	// * set `inputSearch` if there is no input data and user is on `search` page
	// console.log(router.query.search); // undefined
	useEffect(() => {
		if (router.pathname === "/search/[search]" && router.query.search) {
			console.log("search input changed: ", router.query.search);
			setSearchInput(router.query.search);
		}
	}, [router.pathname, router.query.search]);

	// * set recent if there is a value in the input
	// useEffect(() => {
	// 	if (searchInput) {
	// 		setRecent(searchInput);
	// 	}
	// }, [setRecent]);

	// * add click event to document body to handle history box visibility
	useEffect(() => {
		const bodyClickHandler = function (e) {
			if (
				e.target !== containerRef.current &&
				e.target !== recentListContainerRef.current &&
				e.target !== searchRef.current &&
				e.target !== closeBtnRef.current &&
				e.target !== searchBtnRef.current &&
				e.target?.parentElement !== closeBtnRef.current &&
				e.target?.parentElement !== searchBtnRef.current &&
				e.target?.parentElement !== recentListContainerRef.current &&
				e.target?.parentElement !== recentListRef.current
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

	// * searching input handler
	const goSearch = () => {
		if (searchInput) {
			if (router.pathname !== "/search/[search]") {
				router.push(`/search/${searchInput}`);
			} else {
				router.push(`/search/${searchInput}`, undefined, {
					shallow: true,
				});
			}
			// setting recent search
			setRecent(searchInput);

			// remove focus from input
			searchRef.current?.blur();

			// hide history box
			setShow(false);
		} else {
			// adding custom toast with close button
			toast({
				duration: 3000,
				position: "bottom-left",
				isClosable: true,
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

	// * search input handler
	const handleSearchInput = (e) => {
		if (e.target.value?.length < 1) {
			setShow(true);
		}
		// setPersistedSearchInput(e.target.value);
		setSearchInput(e.target.value);
	};

	// * reset search input handler
	const closeSearch = () => {
		setInputOpen(true);
		setShow(true);

		searchRef.current?.focus();
		setSearchInput("");
		// setPersistedSearchInput("");
		// searchRef.current.value = "";
	};

	const openInput = () => {
		searchRef.current?.focus();
		setInputOpen(true);
		setShow(true);
	};

	// * recent searched list item click handler
	const chooseAndSearchItem = useCallback(
		(item) => {
			console.log("changed line. 146");
			router.push(`/search/${item}`);
			setSearchInput(item);
			setRecent(item);

			// * hide history box
			setShow(false);
		},
		[setShow, setSearchInput, setRecent, router]
	);

	// * reset recent list
	const resetRecentList = useCallback(() => {
		setRecent([]);
	}, [setRecent]);

	return (
		<form
			ref={form}
			className={`${styles.form} ${
				searchRef.current?.value?.length || inputOpen
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
						styles["form__container__input-container__searchBtn"]
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
						styles["form__container__input-container__searchBtn"]
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
							searchRef.current.focus();
						}
					}}
				>
					<FiSearch style={{ pointerEvents: "none" }} />
				</Button>

				<SearchInput
					searchInput={searchInput}
					handleSearchInput={handleSearchInput}
					closeSearch={closeSearch}
					ref={{ searchRef, closeBtnRef }}
				/>
			</Flex>

			{/* recent search */}
			{recentList?.length && show && !searchRef.current.value ? (
				<RecentSearchedList
					recentList={recentList}
					resetRecentList={resetRecentList}
					clickHandler={chooseAndSearchItem}
					ref={{ recentListContainerRef, recentListRef }}
				/>
			) : (
				""
			)}
		</form>
	);
};

export default NavbarInputForm;
