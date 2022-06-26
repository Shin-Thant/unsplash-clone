import { createSelector, createSlice } from "@reduxjs/toolkit";

const savedImgsFromLocal =
    typeof window !== "undefined" && localStorage.getItem("savedImgs")
        ? JSON.parse(localStorage.getItem("savedImgs"))
        : [];

const initialState = {
    ids: [...savedImgsFromLocal]?.reduce(
        (prev, curr) => [...prev, curr?.id],
        []
    ),
    images: [...savedImgsFromLocal],
};

const savedImgSlice = createSlice({
    name: "savedImg",
    initialState,
    reducers: {
        addImage: (state, action) => {
            const newImg = action.payload;
            // console.log("new", newImg);

            const existedImg = state?.images?.find(
                (img) => img?.id === newImg?.id
            );
            // console.log("existed", existedImg);

            if (!existedImg) {
                state.ids = [...state.ids, newImg.id];
                state.images = [...state.images, newImg];

                localStorage.setItem(
                    "savedImgs",
                    JSON.stringify([...state.images])
                );
            }
        },
        removeImage: (state, action) => {
            state.ids = state.ids.filter((i) => i !== action.payload);

            state.images = state.images.filter(
                (img) => img?.id !== action.payload
            );

            localStorage.setItem(
                "savedImgs",
                JSON.stringify([...state.images])
            );
        },
        // isAdded: (state, action) => {}
    },
});

export const selectAllIds = createSelector(
    [(state) => state.savedImg],
    (state) => {
        return state?.ids;
    }
);

export const selectAllImages = createSelector(
    [(state) => state.images],
    (images) => images
);

export const { addImage, removeImage } = savedImgSlice.actions;
export default savedImgSlice.reducer;
