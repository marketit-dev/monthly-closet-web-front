import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row } from 'react-bootstrap';
import CustomerList from '../../components/CustomerList';
import Pagination from '../../components/Pagination';
import { Tcustomer, TreloadCustomer } from '../../stores/customer';

@inject(({ customerStore }) => ({
    customers: customerStore.customers,
    totalCustomerNum: customerStore.totalCustomerNum,
    reloadCustomer: customerStore.reloadCustomer,
    divider: customerStore.divider,
}))
@observer
class OfficeCategoryView extends Component<
    { customers: Tcustomer[]; totalCustomerNum: number; reloadCustomer: TreloadCustomer; divider: number },
    {}
> {
    render() {
        const { customers, totalCustomerNum, reloadCustomer, divider } = this.props;
        console.log(this.props);
        return (
            <div className="CustomersView">
                <Container>
                    <Row>
                        <div>
                            <h1>유저 리스트</h1>
                        </div>
                    </Row>
                    <Row />
                    <Row>
                        <CustomerList customers={customers} />
                    </Row>
                    <Row className="justify-content-center">
                        <Pagination totalNum={totalCustomerNum} divider={divider} onActive={reloadCustomer} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OfficeCategoryView;
