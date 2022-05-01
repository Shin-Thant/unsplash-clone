import { createSlice } from "@reduxjs/toolkit";

const savedImgsFromLocal =
    typeof window !== "undefined" && localStorage.getItem("savedImgs")
        ? JSON.parse(localStorage.getItem("savedImgs"))
        : [];

const initialState = {
    images: [...savedImgsFromLocal],
};

const savedImgSlice = createSlice({
    name: "savedImg",
    initialState,
    reducers: {
        addImage: (state, action) => {
            const newImg = action.payload;
            console.log("new", newImg);

            const existedImg = state?.images?.find(
                (img) => img?.id === newImg?.id
            );
            console.log("existed", existedImg);

            if (!existedImg) {
                state.images = [...state.images, newImg];

                localStorage.setItem(
                    "savedImgs",
                    JSON.stringify([...state.images])
                );
            }
        },
        removeImage: (state, action) => {
            state.images = state.images.filter(
                (img) => img?.id !== action.payload
            );

            localStorage.setItem(
                "savedImgs",
                JSON.stringify([...state.images])
            );
        },
    },
});

export const { addImage } = savedImgSlice.actions;
export default savedImgSlice.reducer;
