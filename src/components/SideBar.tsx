import React from 'react';
import { observer } from 'mobx-react';
import '../styles/main.scss';

type SideBarProps = {
    isOpen: boolean;
    routes: Array<any>;
};

const SideBar = ({ routes }: SideBarProps) => (
    <div className="side-bar">
        <div className="side-bar-title">
            <div className="d-flex flex-row align-items-center">
                <i className="fab fa-adn" />
                <div className="p-2 bd-highlight to-hide">월간클로젯</div>
            </div>
        </div>
        <div className="side-bar-profile">
            <div className="d-flex flex-row align-items-center">
                <i className="fas fa-user-friends" />
                <div className="p-2 bd-highlight name to-hide">Paul</div>
            </div>
        </div>
        <ul className="side-bar-categories">
            {routes.map(route => (
                <div>
                    <li className="d-flex flex-row align-items-center" key={route.path}>
                        <i className="fas fa-users" />
                        <div className="mr-auto to-hide">{route.name}</div>
                        <i className="fas fa-chevron-left to-hide" />
                    </li>
                    {route.subPath.map((subroute: { path: string | number | undefined; name: React.ReactNode }) => (
                        <li className="sub-path d-flex flex-row align-items-center" key={subroute.path}>
                            <i className="fas fa-users" />
                            <div className="mr-auto to-hide">{subroute.name}</div>
                            <i className="fas fa-chevron-left to-hide" />
                        </li>
                    ))}
                </div>
            ))}
        </ul>
    </div>
);
export default observer(SideBar);
