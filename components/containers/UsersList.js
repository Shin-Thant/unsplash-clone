import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserCard } from "../shared-items/UserCard";

export const UsersList = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Grid
            w="full"
            templateColumns="repeat(3, 1fr)"
            gap="1.1rem"
            rowGap="1.3rem"
        >
            {data?.map((item) => (
                <UserCard key={item?.id} user={item} />
            ))}
        </Grid>
    );
};
