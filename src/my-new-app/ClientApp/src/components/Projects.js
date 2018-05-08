import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Projects';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

class Projects extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestProjects({version: -1});
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    this.props.requestProjects({version: nextProps.version});
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
          <LinkContainer to={`/projects/${project.id}`} exact>
          <NavItem>{project.name}</NavItem>
        </LinkContainer>
        )}          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

function renderPagination(props) {
  return <p className='clearfix text-center'>
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

export default connect(
  state => state.projects,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Projects);
