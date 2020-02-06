// @ts-nocheck
import React, { Component } from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import OfficeCategoryView from './pages/OfficeCategoryView';
import CustomersView from './pages/customer/CustomersView';

import 'bootstrap/dist/css/bootstrap.min.css';

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
                        <Route path="/customers" component={CustomersView} />
                        <Route path="/categories" component={OfficeCategoryView} />
                        <Route path="/counter" component={Counter} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
