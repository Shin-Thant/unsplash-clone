import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	imageList: [],
};

const favoriteImgSlice = createSlice({
	name: "favoriteImg",
	initialState,
	reducers: {
		addFavorite: (state, action) => {},
		removeFavorite: (state, action) => {},
	},
});

export const { addFavorite, removeFavorite } = favoriteImgSlice.actions;
export default favoriteImgSlice;
