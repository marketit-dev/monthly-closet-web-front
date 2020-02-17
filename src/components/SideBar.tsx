import React from 'react';
import { observer } from 'mobx-react';
import '../styles/main.scss';
import { useHistory } from 'react-router-dom';

type SideBarProps = {
    isOpen: boolean;
    routes: Array<any>;
};

const SideBar = ({ isOpen, routes }: SideBarProps) => {
    const history = useHistory();
    function goHistory(path: string) {
        history.push(path);
    }
    return (
        <div className={`side-bar ${isOpen ? '' : 'to-hide-top'}`}>
            <div className="side-bar-title">
                <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-user-friends" />
                    <div className={`text p-2 bd-highlight ${isOpen ? '' : 'to-hide'}`}>월간클로젯</div>
                </div>
            </div>
            <div className="side-bar-profile">
                <div className="d-flex flex-row align-items-center">
                    <i className="fas fa-user-friends" />
                    <div className={`text p-2 bd-highlight name ${isOpen ? '' : 'to-hide'}`}>Paul</div>
                </div>
            </div>
            <ul className="side-bar-categories">
                {routes.map(route => (
                    <div key={route.path}>
                        <li>
                            <div
                                className="d-flex flex-row align-items-center"
                                onClick={() => goHistory(route.layout + route.path)}
                                onKeyDown={() => goHistory(route.layout + route.path)}
                                role="link"
                            >
                                <i className="fas fa-users" />
                                <div className={`text mr-auto ${isOpen ? '' : 'to-hide'}`}>{route.name}</div>
                                <i className={`fas fa-chevron-left ${isOpen ? '' : 'to-hide'}`} />
                            </div>
                        </li>
                        {route.subRoutes.map(
                            (subRoute: { path: string | number | undefined; layout: string; name: string }) => (
                                <li key={subRoute.path}>
                                    {' '}
                                    <div
                                        className="d-flex flex-row align-items-center"
                                        onClick={() => goHistory(subRoute.layout + subRoute.path)}
                                        onKeyDown={() => goHistory(subRoute.layout + subRoute.path)}
                                        role="link"
                                    >
                                        <i className="fas fa-users" />
                                        <div className={`text mr-auto ${isOpen ? '' : 'to-hide'}`}>{subRoute.name}</div>
                                        <i className={`fas fa-chevron-left ${isOpen ? '' : 'to-hide'}`} />
                                    </div>
                                </li>
                            ),
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};
export default observer(SideBar);
