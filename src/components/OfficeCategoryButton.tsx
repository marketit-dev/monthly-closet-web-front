import React from 'react';
import '../styles/OfficeCategory.scss';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Tcategory } from '../stores/officeCategory';

type OfficeCategoryProps = {
    item: Tcategory;
};

const OfficeCategoryButton = ({ item }: OfficeCategoryProps) => {
    const history = useHistory();
    function goHistory(path: string) {
        history.push(path);
    }
    return (
        <button
            className="OfficeCategoryButton"
            onClick={() => goHistory(item.path)}
            onKeyDown={() => goHistory(item.path)}
            type="button"
        >
            <h4>{item.name}</h4>
        </button>
    );
};

export default observer(OfficeCategoryButton);
