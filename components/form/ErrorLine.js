import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorLine = ({ error }) => {
	return (
		<Flex
			align="center"
			gap="0.3rem"
			mt="0.4rem"
			fontSize="0.93rem"
			color="red.error"
		>
			<MdErrorOutline style={{ fontSize: "1.3rem" }} />
			<Text as="h1" fontWeight="600">
				{error}
			</Text>
		</Flex>
	);
};

export default React.memo(ErrorLine);
