import { observable, action, computed } from 'mobx';
import { ParsedUrlQueryInput } from 'querystring';
import request from '../utils/request';

export type TCustomer = {
    name: string;
    phoneNumber: string;
    age?: number;
    id?: string;
    cafe24Id?: string;
    sex?: boolean;
    location?: string;
};

type CustomerResponse = {
    customer: TCustomer;
};
export type TReloadCustomer = (arg0: number) => void;
export type TSearchCustomer = (arg0: ParsedUrlQueryInput) => void;
export type addCustomer = (arg0: TCustomer) => void;

export default class CustomerStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    limit = 10;

    @observable query: ParsedUrlQueryInput = { limit: this.limit };

    @observable searchTypes = ['이름', '나이', '전화번호', '아이디'];

    @observable searchTypeKeys = ['name', 'age', 'phoneNumber', 'cafe24Id'];

    customers: TCustomer[] = observable([
        { name: '승일', phoneNumber: '01096970444' },
        { name: '태헌', phoneNumber: '01011111111' },
    ]);

    @action
    addCustomer = (customer: TCustomer) => {
        this.customers.push(customer);
    };

    @action
    reloadCustomer = (page: number) => {
        this.query.offset = page * this.limit;
        request('customers', 'get', this.query)
            .then(res => {
                console.log(res);
                this.customers = res.data;
            })
            .catch(e => console.log(e));
    };

    searchCustomer = (searchQuery: ParsedUrlQueryInput) => {
        this.query = searchQuery;
        this.query.offset = 0;

        request('customers', 'get', this.query)
            .then(res => {
                console.log(res);
                this.customers = res.data;
            })
            .catch(e => console.log(e));
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
