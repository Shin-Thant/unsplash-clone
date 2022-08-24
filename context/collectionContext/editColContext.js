import React, { createContext, useContext, useState } from "react";
export const EditColContext = createContext(null);

// this context is to keep the collection to edit
const EditColProvider = ({ children }) => {
	const [collection, setCollection] = useState({});

	return (
		<EditColContext.Provider value={{ collection, setCollection }}>
			{children}
		</EditColContext.Provider>
	);
};

export const useEditCollection = () => useContext(EditColContext);

export default EditColProvider;
