import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Pagination.module.css";
import ReactPaginate from "react-paginate";

export const Pagination = ({ page, changePage, totalPages }) => {
    const [pageCount, setPageCount] = useState(0);
    const [forcePage, setForcePage] = useState(0);

    // set force page
    useEffect(() => {
        if (page && page > 0) {
            setForcePage(page - 1);
        }
    }, [page]);

    // set page count
    useEffect(() => {
        setPageCount(Math.ceil(parseInt(totalPages)));
    }, [totalPages]);

    const onChangeHandler = ({ selected }) => {
        changePage(selected + 1);
    };

    return (
        <>
            {pageCount > forcePage ? (
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
                        forcePage={forcePage}
                        pageCount={pageCount}
                    />
                </Flex>
            ) : (
                ""
            )}
        </>
    );
};

export const MemoPagination = React.memo(Pagination);
