import React, { useEffect, useState } from "react";

const getStoredValue = (key, initValue) => {
	if (!key || key === " ") {
		console.error("Syntax Error: please enter valid key name!");
		return;
	}

	// key === "recentSearch" && console.log("key", key);

	const storedValue =
		typeof window !== "undefined" && localStorage.getItem(key)
			? JSON.parse(localStorage.getItem(key))
			: initValue;

	// key === "recentSearch" && console.log("stored", storedValue);

	if (storedValue) return storedValue;

	if (initValue instanceof Function) return initValue();

	// key === "recentSearch" && console.log("initial", initValue);

	return initValue;
};

export const useStorage = (key, initValue) => {
	const [value, setValue] = useState(getStoredValue(key, initValue || ""));

	useEffect(() => {
		// console.log(value);
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
