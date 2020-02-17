import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomerList from '../components/CustomerList';
import Pagination from '../components/Pagination';
import Search from '../components/SearchWithSelect';
import Modal from '../components/Modal';
import { TCustomer, TReloadCustomer, TSearchCustomer, TAddCustomer } from '../stores/customer';

type CustomViewProps = {
    customers: Array<TCustomer>;
    totalCustomerNum: number;
    reloadCustomer: TReloadCustomer;
    searchCustomer: TSearchCustomer;
    limit: number;
    searchTypes: Array<string>;
    searchTypeKeys: Array<string>;
    addCustomer: TAddCustomer;
    inputTypeKeys: Array<string>;
    inputTypes: Array<string>;
};

@inject(({ customerStore }) => ({
    customers: customerStore.customers,
    totalCustomerNum: customerStore.totalCustomerNum,
    reloadCustomer: customerStore.reloadCustomer,
    divider: customerStore.divider,
    searchCustomer: customerStore.searchCustomer,
    searchTypes: customerStore.searchTypes,
    searchTypeKeys: customerStore.searchTypeKeys,
    addCustomer: customerStore.addCustomer,
    inputTypeKeys: customerStore.inputTypeKeys,
    inputTypes: customerStore.inputTypes,
}))
@observer
class CustomersView extends Component<CustomViewProps, {}> {
    componentDidMount() {
        const { reloadCustomer } = this.props;
        reloadCustomer(0);
    }

    render() {
        console.log('render');
        const {
            customers,
            totalCustomerNum,
            searchCustomer,
            reloadCustomer,
            limit,
            searchTypes,
            searchTypeKeys,
            addCustomer,
            inputTypeKeys,
            inputTypes,
        } = this.props;
        return (
            <div className="customers-view">
                <Container className="customers-container">
                    <Row>
                        <div>
                            <h1>유저 리스트</h1>
                        </div>
                    </Row>
                    <Row className="justify-content-between">
                        <Col>
                            <Search
                                title="유저 검색"
                                onSearch={searchCustomer}
                                searchTypes={searchTypes}
                                searchTypeKeys={searchTypeKeys}
                            />
                        </Col>
                        <Col>
                            <Modal
                                submit={addCustomer}
                                title="유저 추가하기"
                                inputTypeKeys={inputTypeKeys}
                                inputTypes={inputTypes}
                            />
                        </Col>
                    </Row>
                    <Row />
                    <Row>
                        <CustomerList customers={customers} />
                    </Row>
                    <Row className="justify-content-between">
                        <div className="total-customer-num">
                            총 검색 갯수:
                            {totalCustomerNum}
                        </div>
                        <Pagination totalNum={totalCustomerNum} limit={limit} onActive={reloadCustomer} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CustomersView;
