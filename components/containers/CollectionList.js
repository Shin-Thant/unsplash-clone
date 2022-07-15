import React from "react";
import { Grid } from "@chakra-ui/react";
import { CollectionCard } from "../shared-items/CollectionCard";

export const CollectionList = ({ data }) => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="1.5rem">
            {data?.map((item) => (
                <CollectionCard key={item?.id} collection={item} />
            ))}
        </Grid>
    );
};
