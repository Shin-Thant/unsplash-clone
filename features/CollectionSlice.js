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
    collectionList: [],
    imageList: [],
};

const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        addCollection: (state, action) => {
            const id = new Date().getTime();
            const newCol = {
                id,
                ...action.payload,
                previewImgs: [],
                images: [],
            };

            state.collectionList.push(newCol);
        },
        addImage: (state, action) => {
            const collectionId = action.payload?.collectionId;
            const image = action.payload?.image;

            const foundCollection = state.collectionList.find(
                (col) => col.id === collectionId
            );

            if (foundCollection) {
                foundCollection.images.push(image.id);
                if (foundCollection.previewImgs?.length < 2)
                    foundCollection.previewImgs.push(image);
                state.imageList.push(image);

                state.collectionList = [
                    ...state.collectionList?.filter(
                        (col) => col.id !== collectionId
                    ),
                    foundCollection,
                ];
            }
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
                if (foundCollection.previewImgs?.length >= 1)
                    foundCollection.previewImgs =
                        foundCollection.previewImgs?.filter(
                            (id) => id !== imgId
                        );
                state.imageList = state.imageList.filter((id) => id !== imgId);

                state.collectionList = [
                    ...state.collectionList?.filter(
                        (col) => col.id !== collectionId
                    ),
                    foundCollection,
                ];
            }
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

export const selectSingleImage = createSelector(
    [(state) => state.collection?.collectionList, (state, id) => id],
    (list, id) => {
        // return list.find(collection => collection?.ids.)
    }
);

export const selectImageIds = createSelector(
    [(state) => state.collection?.imageList],
    (list) => {
        return list?.map((item) => item?.id);
    }
);
export const { addCollection, addImage, removeImage } = collectionSlice.actions;
export default collectionSlice.reducer;
