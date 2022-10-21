import { Text } from "@chakra-ui/react";
import React from "react";

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

export default React.memo(CustomLabel);
