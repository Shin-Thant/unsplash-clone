import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { forwardRef } from "react";
import styles from "../styles/Navbar.module.css";

const RecentSearchedList = forwardRef(function RecentSearchedList(
	{ recentList, resetRecentList, clickHandler },
	{ recentListContainerRef, recentListRef }
) {
	return (
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
			ref={recentListContainerRef}
			boxShadow="xl"
			w="100%"
			p={{ base: "0.85rem", lg: "1rem 1.5rem 1.2rem" }}
			borderRadius="8px"
		>
			<Flex mb="1.5rem" align="center" justify="space-between">
				<Text fontWeight="600" fontSize="1.2rem">
					Recent {recentList?.length > 1 ? "Searches" : "Search"}
				</Text>
				<Text
					cursor="pointer"
					fontWeight="500"
					fontSize="0.8rem"
					_hover={{
						textDecoration: "underline",
					}}
					onClick={resetRecentList}
				>
					Clear
				</Text>
			</Flex>

			<Flex ref={recentListRef} align="center" gap="1rem" wrap="wrap">
				{recentList?.map((item, index) => (
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
						onClick={() => clickHandler(item)}
					>
						{item}
					</Box>
				))}
			</Flex>
		</Box>
	);
});

export default RecentSearchedList;
