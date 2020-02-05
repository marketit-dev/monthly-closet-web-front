import React from 'react';
// import './OfficeCategory.css';

type item = {
    name: string;
    url: string;
};
type OfficeCategoryProps = {
    item: item;
    go: (arg0: string) => void;
};
const OfficeCategoryButton = ({ item, go }: OfficeCategoryProps) => (
    <div className="OfficeCategoryButton" onClick={() => go(item.url)} onKeyDown={() => go(item.url)} role="button">
        <h4>{item.name}</h4>
    </div>
);

export default OfficeCategoryButton;
