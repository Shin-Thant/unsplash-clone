import { configureStore } from "@reduxjs/toolkit";
import savedImgSlice from "../features/SavedImgSlice";

export const Store = configureStore({
    reducer: {
        savedImg: savedImgSlice,
    },
});
