import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
	imageList: [],
};

const favoriteImgSlice = createSlice({
	name: "favoriteImage",
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			state.imageList.push(action.payload);
		},
		removeFavorite: (state, action) => {
			state.imageList = state.imageList.filter(
				(img) => img?.id !== action.payload
			);
		},
	},
});

export const selectAllFavoritedImgs = createSelector(
	[(state) => state.favorite?.imageList],
	(list) => {
		return [...list]?.sort((a, b) => a?.id?.localeCompare(b?.id));
	}
);

export const selectAllImgIds = createSelector(
	[(state) => state.favorite?.imageList],
	(list) => {
		return list?.length >= 1
			? list.map((img) => img?.id).sort((a, b) => a.localeCompare(b))
			: [];
	}
);

export const { addFavorite, removeFavorite } = favoriteImgSlice.actions;
export default favoriteImgSlice.reducer;
