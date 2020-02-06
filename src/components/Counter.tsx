import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

type ICounterStore = {
    number: number;
    increase: () => void;
    decrease: () => void;
};

@inject(({ counter }) => ({
    number: counter.number,
    increase: counter.increase,
    decrease: counter.decrease,
}))
@observer
class Counter extends Component<{ number: number; increase: () => void; decrease: () => void }, {}> {
    render() {
        const { number, increase, decrease } = this.props;
        return (
            <div>
                <h1>{number}</h1>
                <button type="button" onClick={increase}>
                    +1
                </button>
                <button type="button" onClick={decrease}>
                    -1
                </button>
            </div>
        );
    }
}

export default Counter;
