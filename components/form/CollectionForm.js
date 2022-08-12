import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import styles from "../../styles/ImageModal.module.css";
import { motion } from "framer-motion";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCollection, initAction } from "../../features/CollectionSlice";

const CustomLabel = ({ idName, text }) => {
	return (
		<Text
			fontSize={{
				base: "0.9rem",
				miniTablet: "1rem",
			}}
			width="max-content"
			color="myblack"
			fontWeight="500"
		>
			<label htmlFor={idName} style={{ display: "block" }}>
				{text}
			</label>
		</Text>
	);
};

export const CollectionForm = ({ collectionCount, closeForm }) => {
	const dispatch = useDispatch();

	// todo: add word counts in input

	// variants
	const labels = {
		from: {
			y: 0,
		},
		to: {
			y: 32,
			transition: {
				type: "tween",
				duration: 0.7,
				delay: 0.3,
			},
		},
	};

	const inputs = {
		from: {
			y: 10,
			opacity: 0,
		},
		to: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.5,
				delay: 0.35,
			},
		},
	};

	const btns = {
		from: {
			y: 15,
			opacity: 0,
		},
		to: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.6,
				delay: 0.3,
			},
		},
	};

	// form schema
	const collectionSchema = yup.object().shape({
		name: yup
			.string()
			.max(60, "Name must be at most 60 letters!")
			.required("Collection name is required!"),
		description: yup
			.string()
			.max(250, "Description must be at most 60 letters!"),
	});

	const onSubmitHandler = (values, formikBag) => {
		dispatch(initAction());

		// dispatching action
		if (values?.name?.length)
			dispatch(
				addCollection({
					name: values.name,
					description: values.description,
				})
			);

		formikBag.resetForm();
		formikBag.setSubmitting(false);
		closeForm();
	};

	return (
		<Box width="100%" height="100%" position="relative" zIndex={10000}>
			<Formik
				initialValues={{
					name: "",
					description: "",
				}}
				validationSchema={collectionSchema}
				validateOnBlur={false}
				onSubmit={onSubmitHandler}
			>
				{({ isSubmitting, getFieldProps, errors }) => (
					<Form height="100%" autoComplete="off">
						<Box
							widht="100%"
							position="absolute"
							left="0"
							right="0"
						>
							<Text
								as="h2"
								fontSize={{
									base: "1.1rem",
									miniTablet: "1.15rem",
									lg: "1.2rem",
								}}
								fontWeight="600"
								position="relative"
								overflow="hidden"
								p={{
									base: "0.5rem 0",
									modalBreak: "0",
								}}
							>
								Create new collection
								<motion.div
									className={styles["title-cover"]}
									initial={{
										y: 0,
									}}
									animate={{ y: 32 }}
									transition={{ type: "tween", duration: 1 }}
								></motion.div>
							</Text>

							<Box mt={{ base: "1.2rem", modalBreak: "1.8rem" }}>
								<Box position="relative">
									<CustomLabel idName="name" text="Name" />
									<motion.div
										className={styles["title-cover"]}
										variants={labels}
										initial="from"
										animate="to"
									></motion.div>
								</Box>

								<motion.div
									variants={inputs}
									initial="from"
									animate="to"
								>
									<Input
										id="name"
										name="name"
										{...getFieldProps("name")}
										borderWidth="1.5px"
										fontSize="0.95rem"
										borderRadius="8px"
										fontWeight="500"
										borderColor="hsl(0, 0%, 70%)"
										_hover={{
											borderColor: "hsl(0, 0%, 70%)",
										}}
										_focus={{
											borderWidth: "1.5px",
											borderColor: "hsla(0, 0%, 0%, 0.8)",
										}}
										_placeholder={{
											fontWeight: "400",
											color: "hsl(0, 0%,65%)",
										}}
										placeholder="Hello World"
										mt="0.5rem"
										size="md"
										maxLength={60}
										autoComplete="off"
									/>
								</motion.div>

								{errors.name && (
									<Text
										as="h1"
										fontSize="0.9rem"
										color="red.error"
										fontWeight="600"
										mt="0.3rem"
									>
										{errors.name}
									</Text>
								)}
							</Box>

							<Box mt="1.8rem">
								<Flex
									width="100%"
									align="center"
									gap="0.5rem"
									position="relative"
								>
									<CustomLabel
										idName="description"
										text="Description"
									/>{" "}
									<Text
										height="100%"
										fontSize="0.9rem"
										fontWeight="500"
									>
										(optional)
									</Text>
									<motion.div
										className={styles["title-cover"]}
										variants={labels}
										initial="from"
										animate="to"
									></motion.div>
								</Flex>

								<motion.div
									variants={inputs}
									initial="from"
									animate="to"
								>
									<Textarea
										id="description"
										name="description"
										{...getFieldProps("description")}
										borderWidth="1.5px"
										fontSize="0.95rem"
										borderRadius="8px"
										fontWeight="500"
										borderColor="hsl(0, 0%, 70%)"
										_hover={{
											borderColor: "hsl(0, 0%, 70%)",
										}}
										_focus={{
											borderWidth: "1.5px",
											borderColor: "hsla(0, 0%, 0%, 0.8)",
										}}
										_placeholder={{
											fontWeight: "400",
											color: "hsl(0, 0%,65%)",
										}}
										placeholder="Description for your collection..."
										mt="0.5rem"
										resize="none"
										rows="6"
									/>
								</motion.div>
							</Box>

							<Flex
								height="max-content"
								justify="flex-end"
								gap="1.8rem"
								mt="1.8rem"
							>
								{collectionCount >= 1 && (
									<motion.div
										variants={btns}
										initial="from"
										animate="to"
									>
										<Flex
											onClick={closeForm}
											cursor="pointer"
											height="40px"
											p="0.5rem 1rem"
											borderRadius="8px"
											color="myblack"
											fontSize={{
												base: "0.85rem",
												modalBreak: "0.9rem",
											}}
											fontWeight="600"
											justify="center"
											align="center"
											bg="hsl(0, 0%, 91%)"
											transition="all 220ms ease"
											_hover={{
												bg: "hsl(0, 0%, 80%)",
											}}
											_active={{
												bg: "hsl(0, 0%, 80%)",
											}}
											_focus={{
												bg: "hsl(0, 0%, 80%)",
												border: 0,
											}}
										>
											Cancel
										</Flex>
									</motion.div>
								)}

								<motion.div
									variants={btns}
									initial="from"
									animate="to"
								>
									<Button
										isLoading={isSubmitting}
										type="submit"
										color="white"
										height="40px"
										fontSize={{
											base: "0.85rem",
											modalBreak: "0.9rem",
										}}
										bg="hsl(0, 0%, 10%)"
										_hover={{
											bg: "hsl(0, 0%, 0%)",
											boxShadow:
												"0px 3px 7px 1px hsla(0, 0%, 0%, 0.3)",
										}}
										_active={{
											bg: "hsl(0, 0%, 0%)",
										}}
										_focus={{
											bg: "hsl(0, 0%, 0%)",
											border: 0,
											boxShadow:
												"0px 3px 7px 1px hsla(0, 0%, 0%, 0.3)",
										}}
									>
										Create
									</Button>
								</motion.div>
							</Flex>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export const MemoCollectionBox = React.memo(CollectionForm);
