import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://api.unsplash.com/users/";

export const fetchUserImages = createAsyncThunk(
    "follow/fetchUserImg",
    async (_, { getState }) => {
        const { users } = getState().following;

        const firstIndex = Math.floor(Math.random() * users.length);
        const secondIndex = Math.floor(Math.random() * users.length);

        try {
            if (users.length > 2) {
                // ! fetch data only if the last property is false

                // * check is there any photos left from user to fetch

                const { data: first } = await axios.get(
                    `${baseUrl}/${users[firstIndex].username}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=${users[firstIndex].page}`
                );
                const { data: second } = await axios.get(
                    `${baseUrl}/${users[secondIndex].username}/photos?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&page=${users[secondIndex].page}`
                );

                if (first.length < 1) {
                    return second;
                }
                if (second.length < 1) {
                    return first;
                }

                return [...first, ...second];
            }
        } catch (err) {
            console.error(err);
        }

        return [];
    }
);

const initialState = {
    users: [
        { username: "ilyapavlov", photos: 0, page: 1, last: false },
        { username: "cgower", photos: 0, page: 1, last: false },
        { username: "florianolv", photos: 0, page: 1, last: false },
        { username: "nateggrant", photos: 0, page: 1, last: false },
    ],
    userImgCache: [],
};

const followSlice = createSlice({
    name: "following",
    initialState,
    reducers: {
        followNewUser: (state, action) => {
            const username = action.payload;
            const foundUser = state.users.find(
                (user) => user.username === username
            );

            if (!foundUser) {
                state.users = [
                    ...state.users,
                    { username, page: 1, last: false },
                ];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserImages.fulfilled, (state, action) => {
            state.userImgCache = [...action.payload]?.sort(
                (a, b) => 0.5 - Math.random()
            );
            console.log(state.userImgCache);
        });
    },
});

export const { followNewUser } = followSlice.actions;
export default followSlice.reducer;
