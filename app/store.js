import { configureStore, combineReducers } from "@reduxjs/toolkit";
import FollowSlice from "../features/FollowSlice";
import collectionSlice from "../features/CollectionSlice";
import favoriteImgSlice from "../features/FavoriteImgSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
	collection: collectionSlice,
	favorite: favoriteImgSlice,
});

const persistConfig = {
	key: "unsplash",
	storage,
};

const persistedRecuer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
	reducer: persistedRecuer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(Store);
