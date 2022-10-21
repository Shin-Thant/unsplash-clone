import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";
import CustomTextarea from "./CustomTextarea";
import ErrorLine from "./ErrorLine";
import { IoSend } from "react-icons/io5";
import styles from "../../styles/ContactForm.module.css";
import CustomToast from "../CustomToast";

const ContactForm = () => {
	const toast = useToast();

	const contactFormSchema = yup.object().shape({
		name: yup.string().required("Name is required!"),
		email: yup
			.string()
			.email("Enter valid email!")
			.required("Email is required!"),
		message: yup
			.string()
			.max(250, "Message can't be more than 500 letters!")
			.required("Message is required!"),
	});

	const initialValues = {
		name: "",
		email: "",
		message: "",
	};

	const onSubmitHandler = (values, formikBag) => {
		console.log({ values });
		formikBag.resetForm();

		toast({
			duration: 3000,
			position: "bottom-left",
			isClosable: true,
			// * adding custom toast with close button
			render: ({ id, onClose }) => (
				<CustomToast
					id={id}
					onClose={onClose}
					message={"Email sent!"}
				/>
			),
		});
	};

	return (
		<Box width="100%" mx="auto">
			<Formik
				initialValues={initialValues}
				validationSchema={contactFormSchema}
				onSubmit={onSubmitHandler}
			>
				{({ isSubmitting }) => (
					<Form>
						<Grid
							templateColumns={{
								base: "repeat(1, 1fr)",
								lgMobile: "repeat(2, 1fr)",
							}}
							alignItems="flex-start"
							gap="1.5rem"
							mb={{ base: "1.5rem", lgMobile: "1.6rem" }}
						>
							<Box>
								<CustomLabel idName={"name"} text={"Name"} />
								<CustomInput
									name="name"
									id={"name"}
									type={"text"}
									placeholder="John Doe"
								/>
							</Box>

							<Box>
								<CustomLabel idName={"email"} text={"Email"} />
								<CustomInput
									name="email"
									id={"email"}
									type={"email"}
									placeholder="johndoe@example.com"
								/>
							</Box>
						</Grid>

						<Box mb={{ base: "1.5rem", lgMobile: "1.6rem" }}>
							<CustomLabel
								idName={"message"}
								text={"Tell us what you think"}
							/>
							<CustomTextarea
								name="message"
								id={"message"}
								placeholder="This is a very cool website and it's very useful."
							/>
						</Box>

						<Flex
							width="100%"
							justify={{ base: "center", lgMobile: "flex-end" }}
						>
							<Button
								width={{
									base: "100%",
									lgMobile: "max-content",
								}}
								isLoading={isSubmitting}
								bgColor="brown.1000"
								color="white"
								fontSize="1rem"
								type="submit"
								_hover={{
									bgColor: "hsl(27, 50%, 31%)",
								}}
								_focus={{
									bgColor: "hsl(27, 50%, 31%)",
									border: 0,
								}}
								_active={{ border: 0 }}
							>
								Send{" "}
								<Text
									display={{
										base: "none",
										lgMobile: "block",
									}}
									width="max-content"
									height="max-content"
								>
									<IoSend
										style={{
											marginLeft: "0.5rem",
											fontSize: "1rem",
										}}
									/>
								</Text>
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default ContactForm;
