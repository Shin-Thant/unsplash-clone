import { createSelector, createSlice } from "@reduxjs/toolkit";

const savedImgsFromLocal =
	typeof window !== "undefined" && localStorage.getItem("savedImgs")
		? JSON.parse(localStorage.getItem("savedImgs"))
		: [];

// * example data structure
/* 
    collectionList: [
        {
            id: string,
            name: string,
            desc: string,
            previewImgs: []
            images: [id(string)]
        },
        ...
    ],
    imageList: [
        ...
    ]
*/

const initialState = {
	loading: false,
	collectionList: [],
	imageList: [],
};

const collectionSlice = createSlice({
	name: "collection",
	initialState,
	reducers: {
		initAction: (state) => {
			state.loading = true;
		},
		addCollection: (state, action) => {
			const id = new Date().getTime();
			const newCol = {
				id,
				...action.payload,
				previewImgs: [],
				images: [],
			};

			state.collectionList.push(newCol);
			state.loading = false;
		},
		addImage: (state, action) => {
			const collectionId = action.payload?.collectionId;
			const image = action.payload?.image;

			const foundCollection = state.collectionList.find(
				(col) => col.id === collectionId
			);

			if (foundCollection) {
				foundCollection.images.push(image.id);

				if (foundCollection.previewImgs?.length < 4)
					foundCollection.previewImgs.push(image);
				state.imageList.push(image);

				state.collectionList = [
					...state.collectionList?.filter(
						(col) => col.id !== collectionId
					),
					foundCollection,
				];
			}
			state.loading = false;
		},
		removeImage: (state, action) => {
			const collectionId = action.payload?.collectionId;
			const imgId = action.payload?.imgId;

			const foundCollection = state.collectionList.find(
				(col) => col.id === collectionId
			);

			if (foundCollection) {
				foundCollection.images = foundCollection.images?.filter(
					(id) => id !== imgId
				);

				if (foundCollection.previewImgs?.length >= 1) {
					foundCollection.previewImgs =
						foundCollection.previewImgs?.filter(
							(item) => item.id !== imgId
						);
				}

				console.log(foundCollection.previewImgs);

				state.collectionList = [
					...state.collectionList?.filter(
						(col) => col.id !== collectionId
					),
					foundCollection,
				];
			}

			state.imageList = state.imageList.filter(
				(item) => item.id !== imgId
			);

			state.loading = false;
		},
	},
});

export const selectAllCollections = createSelector(
	[(state) => state.collection],
	(collection) => {
		return collection.collectionList
			.map((col) => col?.id)
			?.sort((a, b) => a - b);
	}
);

export const selectCollectionById = createSelector(
	[(state) => state.collection, (state, id) => id],
	(collection, id) => {
		return collection?.collectionList?.find((col) => col?.id === id);
	}
);

export const selectSavedImgById = createSelector(
	[(state) => state.collection?.imageList, (state, id) => id],
	(list, id) => {
		return list.find((img) => img?.id === id);
	}
);

export const selectSavedImageIds = createSelector(
	[(state) => state.collection?.imageList],
	(list) => {
		return list?.map((item) => item?.id);
	}
);
export const { initAction, addCollection, addImage, removeImage } =
	collectionSlice.actions;
export default collectionSlice.reducer;
