import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	Flex,
} from "@chakra-ui/react";
import { CollectionEditForm } from "../form/CollectionEditForm";
import { MdClose } from "react-icons/md";

export const EditModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay p="0" _focus={{ border: "0" }} />
			<ModalContent
				my={{ base: "0", lgMobile: "auto" }}
				mt={{ base: "5vh", lgMobile: "auto" }}
				minWidth={{
					base: "100%",
					lgMobile: "80%",
					modalBreak: "70%",
					lg: "60%",
					xl: "55%",
				}}
				height={{ base: "94vh", lgMobile: "90vh" }}
			>
				<ModalBody
					maxHeight="100%"
					p={{ base: "1rem", lgMobile: "1.3rem" }}
				>
					<Flex justify="space-between" align="center" mb="1.5rem">
						<Text
							as="h2"
							fontSize={{
								base: "1.15rem",
								miniTablet: "1.2rem",
								modalBreak: "1.3rem",
								lg: "1.4rem",
							}}
							fontWeight="600"
						>
							Edit Collection
						</Text>

						<Button
							onClick={onClose}
							p="0"
							minWidth="40px"
							height="35px"
							fontSize="1.5rem"
							opacity="0.7"
							_hover={{
								opacity: "1",
							}}
							_active={{
								opacity: "1",
							}}
							_focus={{
								opacity: "1",
								border: "0",
							}}
						>
							<MdClose />
						</Button>
					</Flex>

					<CollectionEditForm onClose={onClose} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
