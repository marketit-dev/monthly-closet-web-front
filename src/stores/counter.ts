import { observable, action } from 'mobx';

export default class CounterStore {
  root: any;

  constructor(root: any) {
    this.root = root;
  }

  @observable number = 0;
  
  @action increase = () => {
    this.number++;
  }

  @action decrease = () => {
    this.number--;
  }
}