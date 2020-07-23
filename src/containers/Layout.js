import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavMenu from './NavMenu';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

export default props => (
  <Container fluid>
    <Row>
      <Col md={3}>
        <NavMenu />
      </Col>
      <Col md={9}>
        <Breadcrumbs />
        {props.children}
      </Col>
    </Row>
  </Container>
);
