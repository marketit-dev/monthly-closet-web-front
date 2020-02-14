// @ts-nocheck
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import SideBar from './components/SideBar';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './router';
import './styles/main.scss';

class App extends Component {
    render() {
        return (
            <div className="root-container">
                <Router>
                    <div className="side-bar root">
                        <SideBar routes={routes} />
                    </div>
                    <div className="main-content">
                        <Header />
                        <Switch>
                            {routes.map(prop => {
                                const component = Loadable({
                                    loader: () => import(prop.component),
                                    loading: Loading,
                                });
                                return <Route path={prop.layout + prop.path} component={component} key={prop.path} />;
                            })}
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
