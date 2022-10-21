import { Input } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import ErrorLine from "./ErrorLine";

const CustomInput = (props) => {
	const [field, meta, helpers] = useField(props);

	return (
		<>
			<Input
				{...field}
				{...props}
				fontWeight="500"
				display="block"
				width="100%"
				autoComplete="off"
				mt="0.5rem"
				borderColor="hsl(0, 0%, 70%)"
				borderWidth={"2px"}
				_hover={{
					borderColor: "hsl(0, 0%, 70%)",
				}}
				_focus={{
					borderColor: "hsl(0, 0%, 15%, 0.8)",
				}}
				_placeholder={{
					color: "black.placeholder",
				}}
			/>
			{meta.touched && meta.error && <ErrorLine error={meta.error} />}
		</>
	);
};

export default React.memo(CustomInput);
