import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
// import './NavMenu.css';

class NavMenu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={`/`} exact>
              <NavItem>Dashboard</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(NavMenu);
