import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row } from 'react-bootstrap';
import OfficeCategoryList from '../components/OfficeCategoryList';
import { Tcategory } from '../stores/officeCategory';

@inject(({ officeCategoryStore }) => ({
    categories: officeCategoryStore.categories,
}))
@observer
class OfficeCategoryView extends Component<{ categories: Tcategory[] }, {}> {
    render() {
        const { categories } = this.props;
        return (
            <div className="OfficeCategoryView">
                <Container>
                    <Row>
                        <OfficeCategoryList categories={categories} />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OfficeCategoryView;
