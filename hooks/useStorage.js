import React, { useEffect, useState } from "react";

const getStoredValue = (key, initValue) => {
    if (!key || key === " ") {
        console.error("Syntax Error: please enter valid key name!");
        return;
    }

    const storedValue =
        typeof window !== "undefined" && localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key))
            : "";

    if (storedValue) return storedValue;

    if (initValue instanceof Function) return initValue();

    return initValue;
};

export const useStorage = (key, initValue = "") => {
    const [value, setValue] = useState(getStoredValue(key, initValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};
