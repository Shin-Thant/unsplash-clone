import { Flex, useToast } from "@chakra-ui/react";
import styles from "../../styles/Contact.module.css";
import React from "react";
import CustomToast from "../CustomToast";

const InfoBox = ({ name, value, children }) => {
	const toast = useToast();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(value);

		toast({
			duration: 3000,
			position: "bottom-left",
			isClosable: true,
			// * adding custom toast with close button
			render: ({ id, onClose }) => (
				<CustomToast
					id={id}
					onClose={onClose}
					message={`Copied ${name}!`}
				/>
			),
		});
	};

	return (
		<Flex
			title="Click to copy!"
			onClick={copyToClipboard}
			minHeight="120px"
			direction="column"
			justify="center"
			align="center"
			gap="1rem"
			borderRadius="8px"
			py="1rem"
			cursor="pointer"
			position="relative"
			overflow="hidden"
			_hover={{
				boxShadow: "0px 4px 10px hsl(0, 0%, 10%, 0.4)",
				transform: "translateY(-10px)",
			}}
			className={styles["company-info"]}
		>
			{children}
		</Flex>
	);
};

export default React.memo(InfoBox);
