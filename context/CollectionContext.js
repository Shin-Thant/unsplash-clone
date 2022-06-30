import { createContext, useContext, useState } from "react";

const CollectionContext = createContext({});

export const CollectionProvider = ({ children }) => {
    const [savedCol, setSavedCol] = useState({});

    return (
        <CollectionContext.Provider value={{ savedCol, setSavedCol }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollection = () => useContext(CollectionContext);
