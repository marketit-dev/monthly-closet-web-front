import CounterStore from './counter';

class RootStore {
    counter: object;

    constructor() {
        this.counter = new CounterStore(this);
    }
}

export default RootStore;
