import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavMenu from './NavMenu';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

export default props => (
  <Container fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9}>
        <Breadcrumbs />
        {props.children}
      </Col>
    </Row>
  </Container>
);
