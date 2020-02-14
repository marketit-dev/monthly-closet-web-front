import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import OfficeCategoryList from '../components/OfficeCategoryList';
import { Tcategory } from '../stores/officeCategory';

@inject(({ officeCategoryStore }) => ({
    categories: officeCategoryStore.categories,
}))
@observer
class OfficeCategoryView extends Component<{ categories: Tcategory[] }, {}> {
    render() {
        const { categories } = this.props;
        return <OfficeCategoryList categories={categories} />;
    }
}

export default OfficeCategoryView;
