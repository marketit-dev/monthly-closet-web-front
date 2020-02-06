import { observable, action, computed } from 'mobx';

export type Tcustomer = {
    name: string;
    phoneNumber: string;
    age?: number;
    id?: string;
    sex?: boolean;
    location?: string;
};

export type TreloadCustomer = (arg0: number) => void;
export type addCustomer = (arg0: Tcustomer) => void;
export default class CustomerStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    @observable limit = 10;

    @observable divider = 10;

    customers: Tcustomer[] = observable([
        { name: '승일', phoneNumber: '01096970444' },
        { name: '태헌', phoneNumber: '01011111111' },
    ]);

    @action
    addCustomer = (customer: Tcustomer) => {
        this.customers.push(customer);
    };

    @action
    reloadCustomer = (afterId: number) => {
        return this.divider + afterId;
        // get data by /customers?limit={this.limit}&after_id={afterId}
    };

    @action
    sortByNameDesc = (isDesc: boolean) => {
        return this.customers.sort((a: Tcustomer, b: Tcustomer): number => {
            if (isDesc) return a.name < b.name ? 1 : -1;
            return a.name >= b.name ? 1 : -1;
        });
    };

    @computed get totalCustomerNum() {
        // return this.divider;
        return this.customers.length;
    }
}
