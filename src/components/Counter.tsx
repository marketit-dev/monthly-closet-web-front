import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

type ICounterStore = {
    number: number;
    increase: () => void;
    decrease: () => void;
};

@inject('counter')
@observer
class Counter extends Component<{ counter: ICounterStore }, {}> {
    render() {
        const { counter } = this.props;

        return (
            <div>
                <h1>{counter.number}</h1>
                <button type="button" onClick={counter.increase}>
                    +1
                </button>
                <button type="button" onClick={counter.decrease}>
                    -1
                </button>
            </div>
        );
    }
}

export default Counter;
