import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions/creators';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { getProjects } from '../../store/Account';
import { getProject } from '../../store/Project';
import { getActiveProjectId } from '../../store/Ui';
import ProjectSidebar from './ProjectSidebar';
import '../../containers/NavMenu.css';

export class ProjectSelectorSidebar extends Component {
  async handleOnSelect(projectId) {
    if (this.props.activeProjectId !== projectId) {
      await this.props.selectProject(projectId);
    }
  }

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
        <Dropdown>
          <Dropdown.Toggle as={Nav.Link}>Project: {title}</Dropdown.Toggle>
          <Dropdown.Menu>
            {this.props.projects.map((project) => (
              // <LinkContainer
              //   key={project.id}
              //   to={`/projects/${project.id}`}
              //   exact
              // >
              <Dropdown.Item
                key={project.id}
                onSelect={async () => await this.handleOnSelect(project.id)}
              >
                {project.name}
              </Dropdown.Item>
              // </LinkContainer>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <hr />
        <ProjectSidebar project={this.props.activeProject} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let activeProjectId = getActiveProjectId(state);

  let response = {
    projects: getProjects(state),
    activeProject: getProject(state, activeProjectId),
    activeProjectId: activeProjectId,
  };

  debugger;
  return response;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSelectorSidebar);
