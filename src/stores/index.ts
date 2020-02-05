import CounterStore from './counter';
import OfficeCategoryStore from './officeCategory';

class RootStore {
    counter: object;

    officeCategory: object;

    constructor() {
        this.counter = new CounterStore(this);
        this.officeCategory = new OfficeCategoryStore(this);
    }
}

export default RootStore;
