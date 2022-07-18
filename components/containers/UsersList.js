import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserCard } from "../shared-items/UserCard";

export const UsersList = ({ data }) => {
    return (
        <Grid
            w="100%"
            templateColumns="repeat(3, 32%)"
            justifyContent="center"
            gap="1.3rem"
            rowGap="1.3rem"
        >
            {data?.map((item) => (
                <GridItem key={item?.id} w="100%">
                    <UserCard user={item} />
                </GridItem>
            ))}
        </Grid>
    );
};
