import { Button, Flex } from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import styles from "../styles/Drawer.module.css";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import NavLink from "./navbar/NavLink";

const NavbarDrawer = ({ changeRoute, onClose }) => {
	const overlayRef = useRef(null);

	const routeAndClose = useCallback((route, url) => {
		changeRoute(route, url);
		onClose();
	}, []);

	const container = {
		hidden: {
			opacity: 0,
			x: 10,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "tween",
				duratioin: 0.3,
				delayChildren: 0.3,
				when: "beforeChildren",
			},
		},
		exit: {
			opaciy: 0,
			x: 10,
		},
	};

	const content = {
		hidden: {
			x: "100%",
		},
		visible: {
			x: 0,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
		exit: {
			x: "100%",
		},
	};

	return (
		<Flex
			// className={`${styles.drawer} ${isOpen ? styles['drawer--open'] : ''}`}
			display={{ base: "flex", md: "none" }}
			justify="flex-end"
			position="fixed"
			top="0"
			left="0"
			width="100%"
			height="100vh"
			zIndex="100"
		>
			<motion.div
				onClick={onClose}
				ref={overlayRef}
				variants={container}
				key="overlay"
				initial="hidden"
				animate="visible"
				className={styles["drawer__overlay"]}
			></motion.div>

			<motion.div
				variants={content}
				key="mainContent"
				initial="hidden"
				animate="visible"
				className={styles["drawer__container"]}
			>
				<Button
					justifySelf="flex-end"
					fontSize="1.7rem"
					p="0.2rem 0.3rem"
					color="white"
					bgColor="transparent"
					minWidth="max-content"
					height="max-content"
					_hover={{ border: 0, bgColor: "hsla(0, 0%, 0%, 0.15)" }}
					_focus={{ border: 0, bgColor: "hsla(0, 0%, 0%, 0.15)" }}
					_active={{
						border: 0,
						bgColor: "hsla(0, 0%, 0%, 0.15)",
					}}
					onClick={onClose}
				>
					<MdClose />
				</Button>

				<Flex
					mt={{ base: "4.2rem", mobile: "3.5rem", sm: "2.2rem" }}
					direction="column"
					align="flex-start"
					justify="flex-start"
					gap={{
						base: "2.3rem",
						mobile: "2.5rem",
						sm: "2.8rem",
						lgMobile: "3rem",
					}}
				>
					<NavLink route={1} url="/" routeAndClose={routeAndClose}>
						HOME
					</NavLink>

					<NavLink
						route={2}
						url="/explore"
						routeAndClose={routeAndClose}
					>
						EXPLORE
					</NavLink>

					<NavLink
						route={3}
						url="/collections"
						routeAndClose={routeAndClose}
					>
						COLLECTIONS
					</NavLink>

					<NavLink
						route={4}
						url="/contact"
						routeAndClose={routeAndClose}
					>
						CONTACT
					</NavLink>
				</Flex>
			</motion.div>
		</Flex>
	);
};

export default NavbarDrawer;
