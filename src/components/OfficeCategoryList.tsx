import React from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';
import OfficeCategoryButton from './OfficeCategoryButton';
import { Tcategory } from '../stores/officeCategory';
// import './OfficeCategory.css';

type OfficeCategoryProps = {
    categories: Tcategory[];
};

const OfficeCategoryList = ({ categories }: OfficeCategoryProps) => (
    <Container className="OfficeCategoryList">
        <Row className="justify-content-center">
            {categories.map((item: Tcategory) => (
                <Col md="auto" sm="auto" key={item.name}>
                    <OfficeCategoryButton item={item} key={item.name} />
                </Col>
            ))}
        </Row>
    </Container>
);
export default observer(OfficeCategoryList);
