import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavbarContext } from "../../context/navbarContext/navbarContext";
import styles from "../../styles/Drawer.module.css";

const NavLink = ({ route, url, routeAndClose, children }) => {
	const { currentRoute } = useNavbarContext();

	return (
		<Text
			onClick={() => {
				routeAndClose(route, url);
			}}
			width="max-content"
			as="div"
			py="0.3rem"
			cursor="pointer"
			fontSize={{
				base: "1.35rem",
				smMobile: "1.6rem",
				sm: "1.8rem",
				lgMobile: "2rem",
			}}
			fontWeight="600"
			color="white"
			letterSpacing="0.1em"
			className={`${styles["drawer__content__links"]} ${
				currentRoute === route
					? styles["drawer__content__links--active"]
					: ""
			}`}
		>
			<Flex
				align="center"
				gap="0.8rem"
				justify="flex-start"
				position="relative"
			>
				<HiOutlineArrowNarrowRight
					className={styles["drawer__content__links__icon"]}
				/>
				<Text className={styles["drawer__content__links__text"]}>
					{children}
				</Text>
			</Flex>
		</Text>
	);
};

export default React.memo(NavLink);
