import React from "react";
import {
    Box,
    Flex,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import styles from "../../styles/Search.module.css";

export const ImageFilter = ({
    filters,
    orientation,
    setOrientation,
    color,
    colors,
    setColor,
    setFilters,
    sort,
    setSort,
    resetFilter,
}) => {
    return (
        <Flex
            w="100%"
            justify="space-between"
            align="center"
            h="max-content"
            px="1rem"
            mb="5rem"
        >
            <Flex
                align="center"
                w="max-content"
                h="max-content"
                gap="1rem"
                zIndex={15}
            >
                {/* MenuList for orientation */}
                <Menu closeOnBlur={true} autoSelect={false}>
                    <MenuButton
                        border="1.5px solid black"
                        fontWeight="600"
                        fontSize="0.95rem"
                        borderRadius="50px"
                        px="1.1rem"
                        py="0.3rem"
                    >
                        <Flex align="center" gap="0.5rem">
                            <Text>{orientation}</Text>{" "}
                            <FiChevronDown fontSize="1.3rem" />
                        </Flex>
                    </MenuButton>
                    <MenuList
                        fontSize="0.9rem"
                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                    >
                        <MenuOptionGroup
                            defaultValue={filters?.orientation || "any"}
                            type="radio"
                        >
                            <MenuItemOption
                                value="any"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        orientation: "",
                                    });
                                    setOrientation("Any Orientation");
                                }}
                            >
                                Any Orientation
                            </MenuItemOption>
                            <MenuItemOption
                                value="portrait"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        orientation: "portrait",
                                    });
                                    setOrientation("Portrait");
                                }}
                            >
                                Portrait
                            </MenuItemOption>
                            <MenuItemOption
                                value="landscape"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        orientation: "landscape",
                                    });
                                    setOrientation("Landscape");
                                }}
                            >
                                Landscape
                            </MenuItemOption>
                            <MenuItemOption
                                value="squarish"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        orientation: "squarish",
                                    });
                                    setOrientation("Squarish");
                                }}
                            >
                                Square
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

                {/* MenuList for Color */}
                <Menu closeOnBlur={true} autoSelect={false}>
                    <MenuButton
                        border="1.5px solid black"
                        fontWeight="600"
                        fontSize="0.95rem"
                        borderRadius="50px"
                        px="1.1rem"
                        py="0.4rem"
                    >
                        <Flex align="center" gap="0.5rem">
                            {color !== "Any Color" &&
                            color !== "Black and White" ? (
                                <Flex align="center" gap="0.5rem">
                                    <Box
                                        bg={`${color}`}
                                        w="19px"
                                        h="19px"
                                        borderRadius="50%"
                                        cursor="pointer"
                                        borderWidth="1.8px"
                                        borderColor="gray.400"
                                        _hover={{
                                            borderWidth: "3px",
                                        }}
                                    ></Box>
                                    <Text>{color}</Text>
                                </Flex>
                            ) : (
                                <Text>{color}</Text>
                            )}{" "}
                            <FiChevronDown fontSize="1.3rem" />
                        </Flex>
                    </MenuButton>
                    <MenuList
                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                        fontSize="0.9rem"
                    >
                        <MenuOptionGroup
                            defaultValue={filters?.color ? "tone" : "any"}
                            type="radio"
                        >
                            <MenuItemOption
                                value="any"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        color: "",
                                    });
                                    setColor("Any Color");
                                }}
                            >
                                Any Color
                            </MenuItemOption>
                            <MenuItemOption
                                value="black_and_white"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        color: "black_and_white",
                                    });
                                    setColor("Black and White");
                                }}
                            >
                                Black and White
                            </MenuItemOption>

                            <Text pl="1rem" cursor="default">
                                Tone
                            </Text>

                            <MenuItemOption
                                value="tone"
                                cursor="default"
                                _hover={{
                                    bg: "transparent",
                                }}
                            >
                                <Box w="max-content">
                                    <Flex
                                        w="100%"
                                        justify="space-evenly"
                                        align="center"
                                        gap="0.5rem"
                                        mb="0.6rem"
                                    >
                                        {colors
                                            ?.slice(0, colors.length / 2)
                                            ?.map((clr) => (
                                                <Box
                                                    onClick={() => {
                                                        setFilters({
                                                            ...filters,
                                                            color: clr,
                                                        });
                                                        setColor(clr);
                                                    }}
                                                    key={clr}
                                                    bg={`${clr}`}
                                                    w="19px"
                                                    h="19px"
                                                    borderRadius="50%"
                                                    cursor="pointer"
                                                    borderWidth="1.8px"
                                                    borderColor="gray.400"
                                                    _hover={{
                                                        borderWidth: "3px",
                                                    }}
                                                ></Box>
                                            ))}
                                    </Flex>
                                    <Flex
                                        w="100%"
                                        justify="space-evenly"
                                        align="center"
                                        gap="0.5rem"
                                    >
                                        {colors
                                            ?.slice(
                                                colors.length / 2,
                                                colors.length
                                            )
                                            ?.map((clr) => (
                                                <Box
                                                    onClick={() => {
                                                        setFilters({
                                                            ...filters,
                                                            color: clr,
                                                        });
                                                        setColor(clr);
                                                    }}
                                                    key={clr}
                                                    bg={`${clr}`}
                                                    w="19px"
                                                    h="19px"
                                                    borderRadius="50%"
                                                    cursor="pointer"
                                                    borderWidth="1.8px"
                                                    borderColor="gray.400"
                                                    _hover={{
                                                        borderWidth: "3px",
                                                    }}
                                                ></Box>
                                            ))}
                                    </Flex>
                                </Box>
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

                {/* MenuList for sorting */}
                <Menu closeOnBlur={true} autoSelect={false}>
                    <MenuButton
                        border="1.5px solid black"
                        fontWeight="600"
                        fontSize="0.95rem"
                        borderRadius="50px"
                        px="1.1rem"
                        py="0.4rem"
                    >
                        <Flex align="center" gap="0.5rem">
                            <Text>{sort}</Text>{" "}
                            <FiChevronDown fontSize="1.3rem" />
                        </Flex>
                    </MenuButton>
                    <MenuList
                        boxShadow="3px 3px 15px 1px rgba(0, 0, 0, 0.15)"
                        fontSize="0.9rem"
                    >
                        <MenuOptionGroup
                            defaultValue={filters?.order_by || "relevance"}
                            type="radio"
                        >
                            <MenuItemOption
                                value="relevance"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        order_by: "",
                                    });
                                    setSort("Relevance");
                                }}
                            >
                                Relevance
                            </MenuItemOption>
                            <MenuItemOption
                                value="latest"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        order_by: "latest",
                                    });
                                    setSort("Latest");
                                }}
                            >
                                Latest
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Flex>

            {Object.values(filters).filter(Boolean).length ? (
                <Flex
                    onClick={resetFilter}
                    w="120px"
                    justify="space-between"
                    align="center"
                    gap="0.5rem"
                    py="0.4rem"
                    px="1rem"
                    border="2px solid black"
                    borderRadius="50px"
                    cursor="pointer"
                    position="relative"
                    overflow="hidden"
                    className={styles.closeBtn}
                >
                    <Text
                        data-text="Reset"
                        fontSize="0.9rem"
                        className={styles.closeText}
                    >
                        Reset
                    </Text>
                    <Flex
                        align="center"
                        justify="center"
                        className={styles.close}
                    >
                        <MdClose fontSize="1.2rem" />
                    </Flex>
                </Flex>
            ) : (
                ""
            )}
        </Flex>
    );
};
