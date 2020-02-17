import React from 'react';
import { observer } from 'mobx-react';
import { Table } from 'react-bootstrap';
import { TCustomer } from '../stores/customer';

type CustomerListProps = {
    customers: TCustomer[];
};

const CustomerList = ({ customers }: CustomerListProps) => (
    <Table striped bordered hover className="customer-list">
        <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>cafe24아이디</th>
                <th>나이</th>
            </tr>
        </thead>
        <tbody>
            {customers.map((customer: TCustomer) => (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.cafe24Id}</td>
                    <td>{customer.age}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
export default observer(CustomerList);
