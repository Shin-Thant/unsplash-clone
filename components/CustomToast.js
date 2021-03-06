import { Flex, Text } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

export const CustomToast = ({ id, onClose }) => {
    return (
        <Flex
            bg="brown.1000"
            borderRadius="10px"
            color="white"
            p="0.8rem 1.2rem"
            justify="space-between"
            align="center"
            gap="1rem"
        >
            <Text fontSize="1.1rem" fontWeight="600">
                Enter some inputs to search!
            </Text>
            <Text
                w="max-content"
                fontSize="1.4rem"
                cursor="pointer"
                opacity="0.9"
                _hover={{
                    opacity: "1",
                }}
                onClick={() => onClose(id)}
            >
                <IoClose />
            </Text>
        </Flex>
    );
};
