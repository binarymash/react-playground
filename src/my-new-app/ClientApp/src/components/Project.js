import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Moment from 'moment'
import { actionCreators } from '../actions/index';

class Project extends Component {
  componentWillMount() {
    this.props.selectProject(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id === this.props.match.params.id){
      return;
    }

    this.props.selectProject(nextProps.match.params.id);
  }

  render() {
    if (this.props.error) {
      return this.renderError();
    } else if (this.props.project) {
      return this.renderProject(this.props);
    } else {
      return this.renderNoProject();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }

  renderProject(props) {
    return (
      <div>
        <PageHeader>{props.project.name}</PageHeader>
        {this.renderEnvironments(props.project)}
        {this.renderToggles(props.project)} 
        {this.renderAudit(props.project)}      
      </div>
    ); 
  }
    
  renderEnvironments(project) {
    return (
      <section>
        <h2>Environments <Badge>{project.environments.length}</Badge></h2>
        <ListGroup>
            {project.environments.map(environment => this.renderEnvironment(project.id, environment))}
        </ListGroup>
      </section>
    );
  }

  renderEnvironment(projectId, environment){
    return(
      <ListGroupItem key={environment.key}>
        <Link to={`/projects/${projectId}/environments/${environment.key}`} >{environment.key}</Link>
      </ListGroupItem>
    );
  }

  renderToggles(project) {
    return (
      <section>
        <h2>Toggles <Badge>{project.toggles.length}</Badge></h2>
        <ListGroup>
        {project.toggles.map(toggle => this.renderToggle(project.id, toggle))}
        </ListGroup>      
      </section>
    );
  }

  renderToggle(projectId, toggle){
    return(
      <ListGroupItem key={toggle.key}>
        <Link to={`/projects/${projectId}/toggles/${toggle.key}`} >{toggle.name}</Link>    
      </ListGroupItem>
    );
  }

  renderAudit(props)
  {
    return (
      <section>
        <h3>Audit</h3>
        <div>Project created {Moment(props.created).fromNow()} by {props.createdBy} </div>
        <div>Project last modified {Moment(props.lastModified).fromNow()} by {props.lastModifiedBy} </div>
        <div>Version {props.version}</div>
      </section>
    );
  }

  renderNoProject() {
    return (
      <div>No selected project</div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.project;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
