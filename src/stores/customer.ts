import { observable, action, computed } from 'mobx';
import request from '../utils/request';

export type TCustomer = {
    name: string;
    phoneNumber: string;
    age?: number;
    id?: string;
    cafe24_id?: string;
    sex?: boolean;
    location?: string;
};

export type TCustomerQuery = {
    searchText?: string;
    searchType?: string;
    page?: number;
};

export type TReloadCustomer = (arg0: TCustomerQuery) => void;
export type TSearchCustomer = (arg0: TCustomerQuery) => void;
export type addCustomer = (arg0: TCustomer) => void;
export default class CustomerStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    @observable query = {};

    @observable searchType = ['이름', '나이', '전화번호', '아이디'];

    @observable limit = 10;

    customers: TCustomer[] = observable([
        { name: '승일', phoneNumber: '01096970444' },
        { name: '태헌', phoneNumber: '01011111111' },
    ]);

    @action
    addCustomer = (customer: TCustomer) => {
        this.customers.push(customer);
    };

    @action
    reloadCustomer = (reloadQuery: TReloadCustomer) => {
        return this.divider + afterId;
        // get data by /customers?limit={this.limit}&after_id={afterId}
    };

    searchCustomer = (searchQuery: TSearchCustomer) => {
        return this.divider + afterId;
        // get data by /customers?limit={this.limit}&after_id={afterId}
    };

    @action
    sortByNameDesc = (isDesc: boolean) => {
        return this.customers.sort((a: TCustomer, b: TCustomer): number => {
            if (isDesc) return a.name < b.name ? 1 : -1;
            return a.name >= b.name ? 1 : -1;
        });
    };

    @computed get totalCustomerNum() {
        // return this.divider;
        return this.customers.length;
    }
}
