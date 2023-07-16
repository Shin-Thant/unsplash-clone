import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { forwardRef } from "react";
import { IoClose } from "react-icons/io5";
import styles from "../styles/Navbar.module.css";

const SearchInput = forwardRef(function SearchInput(
	{ searchInput, handleSearchInput, closeSearch },
	{ searchRef, closeBtnRef }
) {
	return (
		<Flex
			className={styles["form__container__input-container"]}
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
				ref={searchRef}
				onChange={handleSearchInput}
				value={searchInput}
				placeholder={"Search free high-resolution photos"}
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
				display={searchInput.length ? "flex" : "none"}
				onClick={closeSearch}
			>
				<IoClose />
			</Button>
		</Flex>
	);
});

export default SearchInput;
