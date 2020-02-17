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

type Props = {};

type State = {
    isOpen: boolean;
};

class App extends Component<Props, State> {
    constructor(Props: Readonly<Props>) {
        super(Props);
        this.state = { isOpen: true };
    }

    toggleOpen = () => {
        this.setState(state => ({
            isOpen: !state.isOpen,
        }));
    };

    render() {
        const { isOpen } = this.state;
        return (
            <div className="root-container">
                <Router>
                    <div className="root-side-bar root">
                        <SideBar isOpen={isOpen} routes={routes} />
                    </div>
                    <div className="main-content">
                        <Header toggleOpen={this.toggleOpen} />
                        <Switch>
                            {routes.map(route => {
                                const elements = [];
                                route.subRoutes.map(subRoute => {
                                    const component = Loadable({
                                        loader: subRoute.component,
                                        loading: Loading,
                                    });
                                    elements.push(
                                        <Route
                                            path={subRoute.layout + subRoute.path}
                                            component={component}
                                            key={subRoute.layout + subRoute.path}
                                        />,
                                    );
                                    return null;
                                });
                                const component = Loadable({
                                    loader: route.component,
                                    loading: Loading,
                                });
                                elements.push(
                                    <Route
                                        path={route.layout + route.path}
                                        component={component}
                                        key={route.layout + route.path}
                                    />,
                                );
                                return <Switch key={route.layout + route.path}>{elements}</Switch>;
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
