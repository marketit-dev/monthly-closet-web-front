import React from 'react';
import { goHistory } from '../utils/base_utils';
import OfficeCategoryButton from './OfficeCategoryButton';
// import './OfficeCategory.css';

type item = {
    name: string;
    url: string;
};
type OfficeCategoryProps = {
    items: Array<item>;
};

const OfficeCategoryList = ({ items }: OfficeCategoryProps) => (
    <div className="OfficeCategoryList">
        <ul>
            {items.map((item: { name: string; url: string }) => (
                <OfficeCategoryButton item={item} go={goHistory} key={item.name} />
            ))}
        </ul>
    </div>
);
export default OfficeCategoryList;
