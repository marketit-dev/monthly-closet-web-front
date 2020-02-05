import { observable, action } from 'mobx';

export default class CounterStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    @observable number = 0;

    @action increase = (): void => {
        this.number++;
    };

    @action decrease = (): void => {
        this.number--;
    };
}
