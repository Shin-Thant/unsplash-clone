import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import ContactForm from "../components/form/ContactForm";
import styles from "../styles/Contact.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import InfoBox from "../components/shared-items/InfoBox";

const Contact = () => {
	let number = useRef(
		new Intl.NumberFormat()
			.format(Math.floor(100000000 + Math.random() * 900000000))
			.replaceAll(",", "-")
	);
	const mail = "unsplash@example.com";
	const location = "Yangon";

	return (
		<>
			<Head>
				<title>Unsplash | Contact Page</title>
			</Head>
			<Box
				p={{ base: "2rem 1rem 1rem", mobile: "2rem" }}
				position="relative"
			>
				<Text
					// display={{ base: "none", mobile: "block" }}
					className={styles.contactText}
					fontSize={{
						base: "2.8rem",
						smMobile: "3.5rem",
						md: "5rem",
					}}
					position="absolute"
					left={{ base: "1rem", mobile: "2.5rem" }}
					top={{ base: "2.5rem", smMobile: "1.8rem", md: "0.3rem" }}
				>
					Contact Us
				</Text>

				<Box
					position={"relative"}
					width="100%"
					p={{ base: "1rem", mobile: "1rem", lgMobile: "1.5em" }}
					mt="4.5rem"
					borderRadius="10px"
					bg="rgba(255, 255, 255, 0.8)"
					backdropFilter="blur(4px)"
				>
					<Box
						width={{ base: "100%", md: "70vw", xl: "60vw" }}
						mx="auto"
					>
						<Grid
							width={{ mobile: "70%", miniTablet: "100%" }}
							mx="auto"
							templateColumns={{
								mobile: "repeat(1, 1fr)",
								miniTablet: "repeat(3, 1fr)",
							}}
							templateRows={{
								mobile: "repeat(3, 1fr)",
								miniTablet: "repeat(1, 1fr)",
							}}
							gap="1.5rem"
						>
							<InfoBox
								name={"phone number"}
								value={number.current}
							>
								<FaPhoneAlt
									fontSize="1.4rem"
									style={{ zIndex: 2 }}
								/>
								<Text
									fontSize="0.98rem"
									fontWeight="500"
									zIndex={2}
								>
									{number.current}
								</Text>
							</InfoBox>

							<InfoBox name={"city"} value={location}>
								<MdLocationPin
									fontSize="1.7rem"
									style={{ zIndex: 2 }}
								/>
								<Text
									fontSize="0.98rem"
									fontWeight="500"
									zIndex={2}
								>
									{location}
								</Text>
							</InfoBox>

							<InfoBox name={"email"} value={mail}>
								<IoMail
									fontSize="1.7rem"
									style={{ zIndex: 2 }}
								/>

								<Flex
									width="90%"
									fontSize="0.98rem"
									fontWeight="500"
									zIndex={2}
									justify="center"
									align="center"
									wrap="wrap"
								>
									<Text>unsplash</Text>
									<Text>@example</Text>
									<Text>.com</Text>
								</Flex>
							</InfoBox>
						</Grid>

						<Image
							src="/decorate-line.svg"
							alt="line"
							width="150px"
							mx="auto"
							mt="4rem"
							mb="2.3rem"
						/>

						<Text
							width="max-content"
							fontSize="1.5rem"
							fontWeight={600}
							color="myblack"
							mb="1.1rem"
							position="relative"
							zIndex={2}
							_before={{
								content: "''",
								width: "100%",
								height: "35%",
								bgColor: "brown.1000",
								borderRadius: "5px",
								position: "absolute",
								bottom: "2px",
								left: "0",
								zIndex: -1,
							}}
						>
							Contact Form
						</Text>

						<ContactForm />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Contact;
