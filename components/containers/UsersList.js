import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserCard } from "../shared-items/UserCard";

export const UsersList = ({ data }) => {
    // todo: add placeholder image if there is no users
    return (
        <Grid
            w="100%"
            templateColumns={{
                base: "1fr",
                miniTablet: "repeat(2, 1fr)",
                userBreak: "repeat(3, 1fr)",
            }}
            justifyContent="center"
            gap={{
                base: "1.5rem",
                miniTablet: "1rem",
                md: "1rem",
                lg: "0.9rem",
            }}
        >
            {data?.map((item) => (
                <GridItem
                    key={item?.id}
                    justifySelf="center"
                    width={{ base: "100%", sm: "90%", miniTablet: "100%" }}
                >
                    <UserCard user={item} />
                </GridItem>
            ))}
        </Grid>
    );
};
