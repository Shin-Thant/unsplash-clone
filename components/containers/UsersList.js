import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserCard } from "../shared-items/UserCard";

export const UsersList = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="1.5rem">
            {/* {data?.map((item) => (
        <Collection key={item?.id} collection={item} />
    ))} */}
            <UserCard user={data[0]} />
        </Grid>
    );
};
