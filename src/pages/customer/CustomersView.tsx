import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row } from 'react-bootstrap';
import CustomerList from '../../components/CustomerList';
import Pagination from '../../components/Pagination';
import Search from '../../components/SearchWithSelect';
import { TCustomer, TReloadCustomer, TSearchCustomer } from '../../stores/customer';

type CustomViewProps = {
    customers: TCustomer[];
    totalCustomerNum: number;
    reloadCustomer: TReloadCustomer;
    searchCustomer: TSearchCustomer;
    limit: number;
    searchTypes: string[];
    searchTypeKeys: string[];
};

@inject(({ customerStore }) => ({
    customers: customerStore.customers,
    totalCustomerNum: customerStore.totalCustomerNum,
    reloadCustomer: customerStore.reloadCustomer,
    divider: customerStore.divider,
    searchCustomer: customerStore.searchCustomer,
    searchTypes: customerStore.searchTypes,
    searchTypeKeys: customerStore.searchTypes,
}))
@observer
class CustomersView extends Component<CustomViewProps, {}> {
    render() {
        const {
            customers,
            totalCustomerNum,
            searchCustomer,
            reloadCustomer,
            limit,
            searchTypes,
            searchTypeKeys,
        } = this.props;
        return (
            <div className="CustomersView">
                <Container>
                    <Row>
                        <div>
                            <h1>유저 리스트</h1>
                        </div>
                    </Row>
                    <Row>
                        <Search
                            title="유저 검색"
                            onSearch={searchCustomer}
                            searchTypes={searchTypes}
                            searchTypeKeys={searchTypeKeys}
                        />
                    </Row>
                    <Row />
                    <Row>
                        <CustomerList customers={customers} />
                    </Row>
                    <Row className="justify-content-center">
                        <Pagination totalNum={totalCustomerNum} limit={limit} onActive={reloadCustomer} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CustomersView;
