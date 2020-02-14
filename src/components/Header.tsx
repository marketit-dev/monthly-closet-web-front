import React from 'react';
import { observer } from 'mobx-react';
import '../styles/main.scss';

const SideBar = () => (
    <div className="header">
        <div className="d-flex flex-row align-items-center">
            <i className="mr-auto fas fa-bars" />
            <i className="fas fa-th-large" />
        </div>
    </div>
);
export default observer(SideBar);
