// @ts-nocheck
import React, { Component } from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './router';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
    render() {
        return (
            <Router>
                <SideBar routes={routes} />
                <Switch>
                    {routes.map(prop => {
                        const component = Loadable({
                            loader: () => prop.component,
                            loading: Loading,
                        });
                        return <Route path={prop.layout + prop.path} component={component} key={prop.path} />;
                    })}
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
