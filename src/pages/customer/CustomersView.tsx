import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row } from 'react-bootstrap';
import CustomerList from '../../components/CustomerList';
import Pagination from '../../components/Pagination';
import Search from '../../components/SearchWithSelect';
import { TCustomer, TReloadCustomer, TSearchCustomer } from '../../stores/customer';

@inject(({ customerStore }) => ({
    customers: customerStore.customers,
    totalCustomerNum: customerStore.totalCustomerNum,
    reloadCustomer: customerStore.reloadCustomer,
    divider: customerStore.divider,
    searchCustomer: customerStore.searchCustomer,
}))
@observer
class OfficeCategoryView extends Component<
    {
        customers: TCustomer[];
        totalCustomerNum: number;
        reloadCustomer: TReloadCustomer;
        searchCustomer: TSearchCustomer;
        limit: number;
        page: number;
        selectors: string[];
    },
    {}
> {
    render() {
        const { customers, totalCustomerNum, reloadCustomer, limit, selectors, page } = this.props;
        return (
            <div className="CustomersView">
                <Container>
                    <Row>
                        <div>
                            <h1>유저 리스트</h1>
                        </div>
                    </Row>
                    <Row>
                        <Search title="유저 검색" onSearch={searchCustomer} selectors={selectors} />
                    </Row>
                    <Row />
                    <Row>
                        <CustomerList customers={customers} />
                    </Row>
                    <Row className="justify-content-center">
                        <Pagination totalNum={totalCustomerNum} limit={limit} page={page} onActive={reloadCustomer} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OfficeCategoryView;
