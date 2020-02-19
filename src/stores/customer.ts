import { observable, action } from 'mobx';
import { ParsedUrlQueryInput } from 'querystring';
import request from '../utils/request';

export type TCustomer = {
    id: string;
    name: string;
    phoneNumber: string;
    age?: number;
    cafe24Id?: string;
    sex?: number;
    location?: string;
};

type CustomerResponse = {
    customer: TCustomer;
};
export type TReloadCustomer = (arg0: number) => void;
export type TSearchCustomer = (arg0: ParsedUrlQueryInput) => void;
export type TAddCustomer = (arg0: TCustomer) => void;

export default class CustomerStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    limit = 10;

    @observable query: ParsedUrlQueryInput = { limit: this.limit };

    @observable searchTypes = ['이름', '전화번호', '아이디', '프로필'];

    @observable searchTypeKeys = ['name', 'phone', 'cafe24_id', 'files'];

    @observable inputTypes = ['이름', '전화번호', '아이디', '프로필'];

    @observable inputTypeKeys = ['name', 'phone', 'cafe24_id', 'files'];

    @observable customers: TCustomer[] = observable([
        { id: '1', name: '승일', phoneNumber: '01096970444' },
        { id: '2', name: '태헌', phoneNumber: '01011111111' },
    ]);

    @observable customer: TCustomer = {
        id: '',
        name: '',
        phoneNumber: '',
        age: 0,
        cafe24Id: '',
        sex: 0,
        location: '',
    };

    @observable totalCustomerNum = 0;

    getObjectByKey = (object: { [x: string]: any }, key: string | number) => object[key];

    @action
    addCustomer = (customer: TCustomer) => {
        const formData = new FormData();
        const keys = Object.keys(customer);
        keys.forEach(key => {
            formData.append(key, this.getObjectByKey(customer, key));
        });
        return request('customers', 'post', {}, formData, {
            header: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                this.customer = res.data.customer;
                this.reloadCustomer(0);
            })
            .catch(e => console.log(e));
    };

    @action
    getCustomer = (id: number) => {
        return request(`customers/${id}`, 'get')
            .then(res => {
                this.customer = res.data.customer;
            })
            .catch(e => console.log(e));
    };

    @action
    reloadCustomer = (page: number) => {
        this.query.offset = page * this.limit;
        return request('customers', 'get', this.query)
            .then(res => {
                this.customers = res.data.customers;
                this.totalCustomerNum = res.data.totalCustomerNum;
            })
            .catch(e => console.log(e));
    };

    searchCustomer = (searchQuery: ParsedUrlQueryInput) => {
        this.query = searchQuery;
        this.query.offset = 0;
        this.query.limit = this.limit;
        request('customers', 'get', this.query)
            .then(res => {
                this.customers = res.data.customers;
                this.totalCustomerNum = res.data.totalCustomerNum;
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

    // @computed get totalCustomerNum() {
    //     // return this.divider;
    //     return this.customers.length;
    // }
}
