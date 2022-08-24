import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import CustomLabel from "../shared-items/CustomLabel";
import * as yup from "yup";
import { useFormik, Form } from "formik";
import { useEditCollection } from "../../context/collectionContext/editColContext";
import {
	deleteCollection,
	updateCollection,
} from "../../features/CollectionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const CollectionEditForm = ({ onClose }) => {
	const { collection } = useEditCollection();
	const [showDel, setShowDel] = useState(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const editFormSchema = yup.object().shape({
		title: yup
			.string()
			.max(60, "Collection name must be at most 60 letters!")
			.required("Collection name is required!"),
		description: yup
			.string()
			.max(250, "Collection description must be at most 250 letters!"),
	});

	const editForm = {
		initialValues: {
			title: collection?.title ?? "",
			description: collection?.description ?? "",
		},
		validationSchema: editFormSchema,
		onSubmit: (values, formikBag) => {
			// dispatching action
			if (values?.title?.length) {
				dispatch(
					updateCollection({
						id: collection.id,
						title: values?.title,
						description: values?.description,
					})
				);
				formikBag.resetForm();
				formikBag.setSubmitting(false);
				onClose();
			}
		},
	};

	const { handleSubmit, resetForm, isSubmitting, errors, getFieldProps } =
		useFormik(editForm);

	const onDeleteHandler = () => {
		router.push("/collections");
		dispatch(deleteCollection(collection.id));
		resetForm();
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ width: "100%", maxHeight: "100%" }}
		>
			<Box mb="1.5rem">
				<CustomLabel idName={"title"} text={"Title"} />
				<Input
					id="title"
					name="Title"
					{...getFieldProps("title")}
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
					autoFocus
				/>
				{errors.title && (
					<Text
						as="h1"
						fontSize="0.9rem"
						color="red.error"
						fontWeight="600"
						mt="0.3rem"
					>
						{errors.title}
					</Text>
				)}
			</Box>

			<Box>
				<Flex align="center" gap="0.5rem">
					<CustomLabel idName={"description"} text={"Description"} />
					<Text height="100%" fontSize="0.9rem" fontWeight="500">
						(optional)
					</Text>
				</Flex>

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
					maxLength={250}
				/>
			</Box>

			<Flex
				mt="1rem"
				width="100%"
				justify="space-between"
				align="center"
				p={{ base: "1rem", lgMobile: "1.3rem" }}
			>
				<Text as="h1" fontSize="0.9rem" fontWeight="500">
					<Text
						onClick={() => setShowDel(true)}
						as="a"
						d="inline-block"
						cursor={showDel ? "default" : "pointer"}
						color="red.error"
						_hover={{
							textDecoration: "underline",
						}}
					>
						{!showDel ? "Delete Collection" : "Are you sure?"}
					</Text>
					{showDel && (
						<Text
							onClick={() => setShowDel(false)}
							as="a"
							d="inline-block"
							ml="0.8rem"
							cursor="pointer"
							_hover={{
								color: "black",
								textDecoration: "underline",
							}}
						>
							Cancel
						</Text>
					)}
				</Text>

				<Flex gap="2.5rem" justify="space-between" align="center">
					{showDel && (
						<Button
							onClick={onDeleteHandler}
							as="div"
							// bg="hsl(0, 0%, 94%)"
							bg="transparent"
							color="red.error"
							fontSize="0.85rem"
							fontWeight="600"
							cursor="pointer"
							// opacity="0.85"
							border="1px solid"
							borderColor="red.error"
							_hover={{
								// opacity: "1",
								bg: "hsl(0, 100%, 95%)",
							}}
							_focus={{
								bg: "hsl(0, 100%, 95%)",
							}}
							_active={{
								bg: "hsl(0, 100%, 95%)",
							}}
						>
							Delete
						</Button>
					)}

					<Button
						type="submit"
						px="1.3rem"
						bg="hsl(0, 0%, 12%)"
						color="white"
						fontSize="0.85rem"
						fontWeight="600"
						_hover={{
							bg: "black",
						}}
						_focus={{
							border: "0",
							bg: "black",
						}}
					>
						Save
					</Button>
				</Flex>
			</Flex>
		</form>
	);
};
