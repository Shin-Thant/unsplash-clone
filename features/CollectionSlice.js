import { createSelector, createSlice } from "@reduxjs/toolkit";

// * example data structure
/* 
    collectionList: [
        {
            id: string,
            title: string,
            description: string,
            preview_photos: []
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
			state.loading = true;

			const id = new Date().getTime().toString();
			const newCol = {
				id,
				...action.payload,
				total_photos: 0,
				cover_photo: {},
				preview_photos: [],
				images: [],
				tags: [],
				created: true,
			};

			state.collectionList.push(newCol);
			state.loading = false;
		},
		updateCollection: (state, action) => {
			state.loading = true;

			const { id, title, description } = action.payload;

			const foundCollection = state.collectionList.find(
				(col) => col.id === id
			);
			if (foundCollection) {
				foundCollection.title = title;
				foundCollection.description = description;

				state.collectionList = [
					...state.collectionList?.filter((col) => col.id !== id),
					foundCollection,
				];
			}

			state.loading = false;
		},
		deleteCollection: (state, action) => {
			const id = action.payload;

			const foundCollection = state.collectionList.find(
				(col) => col.id === id
			);

			if (foundCollection) {
				state.collectionList = [
					...state.collectionList?.filter((col) => col.id !== id),
				];
			}
		},
		addImage: (state, action) => {
			const collectionId = action.payload?.collectionId;
			const image = action.payload?.image;

			const foundCollection = state.collectionList.find(
				(col) => col.id === collectionId
			);

			if (foundCollection) {
				foundCollection.total_photos += 1;

				// add first image to cover_photo
				if (foundCollection.images?.length < 1) {
					foundCollection.cover_photo = { ...image };
				}

				foundCollection.images.push(image.id);

				// add preview_photos
				if (foundCollection.preview_photos?.length < 4) {
					foundCollection.preview_photos.push(image);
				}

				// add tags
				if (
					image?.tags?.length >= 1 &&
					foundCollection?.tags?.length < 5
				) {
					if (
						!foundCollection?.tags
							?.map((item) => item?.title)
							?.includes(image?.tags?.[0]?.title)
					) {
						foundCollection.tags.push(image?.tags?.[0]);
					}
				}

				// add total_photos
				state.total_photos += 1;

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
			const image = action.payload?.image;

			const foundCollection = state.collectionList.find(
				(col) => col.id === collectionId
			);

			if (foundCollection) {
				foundCollection.images = foundCollection.images?.filter(
					(id) => id !== image?.id
				);

				// remove cover_photo
				if (foundCollection.cover_photo?.id === image?.id) {
					foundCollection.cover_photo = foundCollection?.imageList
						?.length
						? { ...foundCollection?.imageList?.[0] }
						: {};
				}

				// remove preview_photos
				if (foundCollection.preview_photos?.length >= 1) {
					foundCollection.preview_photos =
						foundCollection.preview_photos?.filter(
							(item) => item.id !== image?.id
						);
				}

				// minus total_photos
				if (foundCollection.total_photos >= 1) {
					foundCollection.total_photos -= 1;
				}

				// remove tag
				if (foundCollection.tags?.length >= 1) {
					foundCollection.tags = foundCollection.tags?.filter(
						(t) => t?.title !== image?.tags?.[0]?.title
					);
				}

				// remove from imageList
				state.imageList = state.imageList.filter(
					(item) => item.id !== image?.id
				);

				// remove from collectionList
				state.collectionList = [
					...state.collectionList?.filter(
						(col) => col.id !== collectionId
					),
					foundCollection,
				];
			}

			state.loading = false;
		},
	},
});

export const selectAllCollections = createSelector(
	[(state) => state?.collection?.collectionList],
	(list) => {
		return [...list]?.sort((a, b) => parseInt(a?.id) - parseInt(b?.id));
	}
);

export const selectCollectionIds = createSelector(
	[(state) => state.collection.collectionList],
	(list) => {
		return list
			.map((col) => col?.id)
			?.sort((a, b) => parseInt(a) - parseInt(b));
	}
);

export const selectCollectionById = createSelector(
	[(state) => state.collection, (state, id) => id],
	(collection, id) => {
		return collection?.collectionList?.find((col) => col?.id === id);
	}
);

export const selectCollectionImages = createSelector(
	[(state) => state.collection, (state, id) => id],
	(collection, id) => {
		const foundCollection = collection?.collectionList?.find(
			(col) => col?.id === id
		);

		if (!foundCollection) return [];

		const images =
			foundCollection?.images?.length >= 1
				? collection?.imageList?.filter((img) =>
						foundCollection?.images?.includes(img?.id)
				  )
				: [];

		return images;
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
export const {
	initAction,
	addCollection,
	updateCollection,
	deleteCollection,
	addImage,
	removeImage,
} = collectionSlice.actions;
export default collectionSlice.reducer;
