import CounterStore from './counter';

class RootStore {
    counter: any;
    constructor() {
        this.counter = new CounterStore(this);
    }
}

export default RootStore;