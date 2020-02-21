import React from 'react';
import { observer } from 'mobx-react';
import Pagination from '@material-ui/lab/Pagination';
// import { PaginationItem } from '@material-ui/lab';

type PaginationProps = {
    totalPage: number;
    onActive: (arg0: number) => void;
};

const Paginations = ({ totalPage, onActive }: PaginationProps) => {
    function onClickPage(number: number) {
        onActive(number - 1);
    }

    return (
        <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={(_: any, number: number) => onClickPage(number)}
        />
    );
};
export default observer(Paginations);
