import React from 'react';
import { observer } from 'mobx-react';
import { Pagination } from 'react-bootstrap';

type PaginationProps = {
    totalNum: number;
    onActive: (arg0: number) => void;
    divider?: number;
};

const Paginations = ({ totalNum, onActive, divider = 10 }: PaginationProps) => {
    let active = 1;
    const items = [];

    function onClickPage(number: number) {
        onActive((number - 1) * divider);
        active = number;
    }

    for (let number = 1; number <= Math.ceil(totalNum / divider); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={onClickPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return <Pagination>{items}</Pagination>;
};
export default observer(Paginations);
