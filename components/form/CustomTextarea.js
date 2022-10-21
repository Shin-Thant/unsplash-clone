import { Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import ErrorLine from "./ErrorLine";

const CustomTextarea = (props) => {
	const [field, meta, helpers] = useField(props);

	// todo: randomize the placeholder in textarea
	return (
		<>
			<Textarea
				{...field}
				{...props}
				borderWidth="2px"
				fontSize="0.95rem"
				borderRadius="8px"
				fontWeight="500"
				borderColor="hsl(0, 0%, 70%)"
				_hover={{
					borderColor: "hsl(0, 0%, 70%)",
				}}
				_focus={{
					borderColor: "hsl(0, 0%, 15%, 0.8)",
				}}
				_placeholder={{
					color: "black.placeholder",
				}}
				mt="0.5rem"
				resize="none"
				rows="6"
				maxLength={250}
			/>

			{meta.touched && meta.error && <ErrorLine error={meta.error} />}
		</>
	);
};

export default React.memo(CustomTextarea);
