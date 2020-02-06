import CounterStore from './counter';
import OfficeCategoryStore from './officeCategory';
import CustomerStore from './customer';

class RootStore {
    counter: object;

    officeCategoryStore: object;

    customerStore: object;

    constructor() {
        this.customerStore = new CustomerStore(this);
        this.counter = new CounterStore(this);
        this.officeCategoryStore = new OfficeCategoryStore(this);
    }
}

export default RootStore;
