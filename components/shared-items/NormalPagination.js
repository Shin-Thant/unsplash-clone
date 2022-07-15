import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "../../styles/Pagination.module.css";

export const NormalPagination = ({ goNext, goPrevious, current }) => {
    return (
        <Flex justify="center" align="center" gap="1.5rem">
            <button
                onClick={() => goPrevious()}
                disabled={current > 1 ? false : true}
                className={styles["normal-paginate"]}
            >
                <IoIosArrowBack />
            </button>
            <button
                onClick={() => goNext()}
                className={styles["normal-paginate"]}
            >
                <IoIosArrowForward />
            </button>
        </Flex>
    );
};
