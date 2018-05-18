import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

export default props => (
  <Grid fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9}>
        <Breadcrumbs/>
        {props.children}
      </Col>
    </Row>
  </Grid>
);
