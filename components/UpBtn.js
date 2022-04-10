import { Flex } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

export const UpBtn = () => {
    const goUp = () => {
        window.scrollTo(0, 0);
    };
    return (
        <Flex
            borderRadius="50%"
            w="48px"
            h="48px"
            bg="brown.1000"
            color="white"
            cursor="pointer"
            align="center"
            justify="center"
            position="fixed"
            bottom="2.5rem"
            right={{ base: "1.3rem", lgMobile: "1.7rem" }}
            zIndex="5"
            transition="all 200ms ease"
            _hover={{
                shadow: "xl",
            }}
            onClick={goUp}
        >
            <IoIosArrowUp fontSize="2.1rem" />
        </Flex>
    );
};
