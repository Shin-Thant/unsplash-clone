import React from "react";
import { Grid } from "@chakra-ui/react";
import { Collection } from "../Collection";

export const CollectionList = ({ data }) => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="1.5rem">
            {data?.map((item) => (
                <Collection key={item?.id} collection={item} />
            ))}
        </Grid>
    );
};
