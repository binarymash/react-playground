import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions/index';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { getProjects } from '../../store/Account';
import { getActiveProjectId } from '../../store/Project';
import '../../containers/NavMenu.css';

export class ProjectSidebar extends Component {
  render() {
    let title = 'No project selected';
    if (this.props.activeProjectId) {
      let project = this.props.projects.find(
        (p) => p.id === this.props.activeProjectId
      );
      if (project) {
        title = `${project.name}`;
      }
    }

    return (
      <div>
        {/* <Navbar.Text></Navbar.Text> */}
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
            Project: {title}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.props.projects.map((project) => (
              <LinkContainer
                key={project.id}
                to={`/projects/${project.id}`}
                exact
              >
                <Dropdown.Item>{project.name}</Dropdown.Item>
              </LinkContainer>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Text>
          <hr />
        </Navbar.Text>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: getProjects(state),
    activeProjectId: getActiveProjectId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSidebar);
