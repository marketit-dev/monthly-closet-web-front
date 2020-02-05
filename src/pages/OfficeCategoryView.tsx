import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

type category = {
    name: string;
    url: string;
};
type categories = {
    category: Array<category>;
};

@inject('officeCategory')
@observer
class OfficeCategoryView extends Component<{ categories: categories }, {}> {
    render() {
        const { categories } = this.props;

        return (
            <div>
                <OfficeCategoryView categories={categories} />
            </div>
        );
    }
}

export default OfficeCategoryView;
