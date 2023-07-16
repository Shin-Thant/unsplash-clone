import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import styles from "../../styles/SearchFilter.module.css";
import {
	BsFillCollectionFill,
	BsImageFill,
	BsPeopleFill,
} from "react-icons/bs";
import { memo, useRef } from "react";
import { motion } from "framer-motion";

const Divider = ({
	width = "100%",
	height = "1px",
	color = "myblack",
	display = "block",
	opacity = "1",
	...props
} = {}) => {
	return (
		<Box
			display={display}
			width={width}
			height={height}
			borderRadius="50px"
			bgColor={color}
			opacity={opacity}
			{...props}
		></Box>
	);
};

const SearchFilter = ({ active, total, field, changeField }) => {
	const vDivider = {
		display: { base: "block", miniTablet: "none" },
		width: "1px",
		height: "70%",
		opacity: "0.8",
	};

	const hDivider = {
		width: "100%",
		height: "1px",
		opacity: "0.8",
		mb: field === "photos" ? "1.6rem" : "5rem",
	};

	const tabs = useRef([
		{
			id: "photos_tab_1",
			active: 1,
			title: "Photos",
			field: "photos",
			component: <BsImageFill />,
			divider: false,
		},
		{
			id: "divider_1",
			divider: true,
		},
		{
			id: "collections_tab_2",
			active: 2,
			title: "Collections",
			field: "collections",
			component: <BsFillCollectionFill />,
			divider: false,
		},
		{
			id: "divider_2",
			divider: true,
		},
		{
			id: "users_tab_1",
			active: 3,
			title: "Users",
			field: "users",
			component: <BsPeopleFill />,
			divider: false,
		},
	]);

	return (
		<>
			<Grid
				templateColumns={{
					base: "1fr max-content 1.4fr max-content 1fr",
					smMobile: "1fr max-content 1fr max-content 1fr",
					miniTablet: "repeat(3, 0.3fr)",
					md: "repeat(3, 0.25fr)",
				}}
				gap={{ base: "0.4rem", smMobile: "0.5rem", sm: "1.2rem" }}
				justifyContent={"space-evenly"}
				alignItems={"center"}
				w="100%"
				p={{ base: "0.2rem", miniTablet: "0" }}
				border={{ base: "1px solid", miniTablet: "0" }}
				borderColor="myblack"
				borderRadius="7px"
				mb={"1.6rem"}
				zIndex={3}
			>
				{tabs.current?.map((tab) =>
					!tab.divider ? (
						<Grid
							onClick={() => {
								console.log(tab.field);
								changeField(tab.field, tab.active);
							}}
							key={tab.id}
							className={`${styles.tab} ${
								active === tab.active
									? styles["tab--active"]
									: ""
							}`}
							position={"relative"}
							width={"100%"}
							templateColumns={{
								base: "1fr",
								miniTablet: "max-content 1fr",
							}}
							alignItems={"center"}
							color={active === tab.active ? "white" : "myblack"}
							cursor={"pointer"}
							py={{ base: "0.5rem", miniTablet: "0" }}
							px={"0 0.7rem"}
							transition="color 300ms ease"
							_hover={{
								color: "white",
							}}
						>
							<Flex
								display={{ base: "none", miniTablet: "flex" }}
								justify="center"
								align="center"
								width={"2.7rem"}
								fontSize={{
									miniTablet: "1.2rem",
									md: "1.3rem",
								}}
								color={
									active === tab.active
										? "myblack"
										: "myblack"
								}
								style={{ aspectRatio: "1 / 1" }}
							>
								{tab.component}
							</Flex>

							<Flex
								className={styles.tabs}
								justify="center"
								align="center"
								gap="0.4rem"
								fontWeight="semibold"
								fontSize={{ base: "0.85rem", sm: "0.9rem" }}
							>
								<Text>{tab.title}</Text>
								{active === tab.active ? (
									<Text
										display={{
											base: "none",
											sm: "inline-block",
										}}
									>
										{total
											? total >= 1000
												? `${Math.floor(
														(total / 1000).toFixed(
															1
														)
												  )}K`
												: total
											: "10K"}
									</Text>
								) : (
									""
								)}
							</Flex>

							{active === tab.active && (
								<motion.div
									layoutId={"tab_highlight"}
									className={styles.highlight}
								></motion.div>
							)}
						</Grid>
					) : (
						<Divider key={tab.id} {...vDivider} />
					)
				)}
			</Grid>

			<Divider {...hDivider} />
		</>
	);
};

export default memo(SearchFilter);
