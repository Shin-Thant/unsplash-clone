import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Pagination.module.css";
import ReactPaginate from "react-paginate";

export const Pagination = ({ page, changePage, totalPages }) => {
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setPageCount(Math.ceil(parseInt(totalPages)));
        // console.log(totalPages);
    }, [totalPages]);

    // console.log(pageCount);

    const onChangeHandler = ({ selected }) => {
        changePage(selected + 1);
    };

    return (
        <Flex w="100%" justify="center">
            <ReactPaginate
                containerClassName={styles.pagination}
                previousLinkClassName={styles.previous}
                nextLinkClassName={styles.next}
                pageLinkClassName={styles.btn}
                activeLinkClassName={styles.activeBtn}
                breakLinkClassName={styles.break}
                disabledLinkClassName={styles.disabledBtn}
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={onChangeHandler}
                forcePage={page - 1}
                pageCount={pageCount}
            />
        </Flex>
    );
};

export const MemoPagination = React.memo(Pagination);