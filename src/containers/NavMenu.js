import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import ProjectSelectorSidebar from '../components/sidebars/ProjectSelectorSidebar';
import './NavMenu.css';

import { AmplifySignOut } from '@aws-amplify/ui-react';

class NavMenu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top" expand="md" collapseOnSelect>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="flex-column">
            <Navbar.Text>
              <AmplifySignOut
                button-text="Sign out"
                handleAuthStateChange={this.authStateChanged}
              ></AmplifySignOut>
            </Navbar.Text>
            <Nav.Item>
              <LinkContainer to={`/account`} exact>
                <Nav.Link active={false}>My Account</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to={`/`} exact>
                <Nav.Link active={false}>Projects</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Navbar.Text>
              <hr />
            </Navbar.Text>
            <ProjectSelectorSidebar />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(NavMenu);
