import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ContactFormContext = createContext(null);

const ContactFormProvider = ({ children }) => {
	const [formValid, setFormValid] = useState(true);
	const [isSent, setIsSent] = useState(false);

	return (
		<ContactFormContext.Provider
			value={{ formValid, setFormValid, isSent, setIsSent }}
		>
			{children}
		</ContactFormContext.Provider>
	);
};

export default ContactFormProvider;

export const useFormContext = () => useContext(ContactFormContext);
