import { Box, Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../features/CollectionSlice";

function collections() {
    const dispatch = useDispatch();

    const collectionList = useSelector(
        (state) => state.collection?.collectionList
    );

    const addNewCol = () => {
        const newCol = {
            name: "gaming",
            description: "collection for gaming",
        };
        dispatch(addCollection(newCol));
    };

    return (
        <>
            <Head>
                <title>Collection</title>
            </Head>
            <Box>
                <Text>Collection</Text>
                <Text as="h3">{JSON.stringify(collectionList)}</Text>

                <Button onClick={addNewCol}>add</Button>
            </Box>
        </>
    );
}

export default collections;
