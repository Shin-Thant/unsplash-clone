import { Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import { IoClose } from "react-icons/io5";

const CustomToast = ({ id, onClose, message }) => {
	return (
		<Flex
			bg="brown.1000"
			borderRadius="10px"
			color="white"
			p="0.8rem 1.2rem"
			justify="space-between"
			align="center"
			gap="1rem"
		>
			<Text fontSize="0.95rem" fontWeight="500">
				{message}
			</Text>
			<Text
				w="max-content"
				fontSize="1.4rem"
				cursor="pointer"
				opacity="0.9"
				_hover={{
					opacity: "1",
				}}
				onClick={() => onClose(id)}
			>
				<IoClose />
			</Text>
		</Flex>
	);
};

export default CustomToast;
