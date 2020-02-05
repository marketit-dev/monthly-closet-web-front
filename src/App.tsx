// @ts-nocheck
import React, { Component } from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import NotFound from './components/NotFound';

const Counter = Loadable({
    loader: () => import('./components/Counter'),
    loading: Loading,
});
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/counter" component={Counter} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
