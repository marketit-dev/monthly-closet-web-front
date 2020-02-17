import React from 'react';
import { observer } from 'mobx-react';
import '../styles/main.scss';

type SideBarProps = {
    toggleOpen: () => void;
};
const SideBar = ({ toggleOpen }: SideBarProps) => (
    <div className="header">
        <div className="d-flex flex-row align-items-center">
            <div className="mr-auto" onClick={toggleOpen} onKeyDown={toggleOpen} role="button">
                <i className="fas fa-bars" />
            </div>
            <i className="fas fa-th-large" />
        </div>
    </div>
);
export default observer(SideBar);
