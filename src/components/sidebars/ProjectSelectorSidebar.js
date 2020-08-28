import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions/creators';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { getProjects } from '../../store/Account';
import { getActiveProjectId } from '../../store/Project';
import ProjectSidebar from './ProjectSidebar';
import '../../containers/NavMenu.css';

export class ProjectSelectorSidebar extends Component {
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
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>Project: {title}</Dropdown.Toggle>
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
        <hr />
        <ProjectSidebar projectId={this.props.activeProjectId} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSelectorSidebar);
