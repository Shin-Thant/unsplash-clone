import { createContext, useContext, useState } from "react";

export const NavbarContext = createContext(null);

export const NavbarContextProvider = ({ children }) => {
	const [currentRoute, setCurrentRoute] = useState(1);
	return (
		<NavbarContext.Provider value={{ currentRoute, setCurrentRoute }}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbarContext = () => useContext(NavbarContext);
