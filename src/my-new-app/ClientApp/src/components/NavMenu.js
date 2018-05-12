import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import { getProjectList } from '../store/Account';

class NavMenu extends Component {
  componentWillMount() {
    this.props.requestProjects();
  }

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>Evelyn</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
        {this.props.projects.map(project =>
          <LinkContainer key={project.id} to={`/projects/${project.id}`} exact>
          <NavItem>{project.name}</NavItem>
        </LinkContainer>
        )}          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: getProjectList(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, 
  {
    pure: false
  }
)(NavMenu);
