import { configureStore } from "@reduxjs/toolkit";
import FollowSlice from "../features/FollowSlice";
import savedImgSlice from "../features/SavedImgSlice";

export const Store = configureStore({
    reducer: {
        savedImg: savedImgSlice,
        // following: FollowSlice,
    },
});
