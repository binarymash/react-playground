import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import { Badge, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Moment from 'moment'

class Project extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestProject({id: this.props.match.params.id, version: -1});
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    let version = -1;
    if (nextProps.project) {
      version = nextProps.project.version;
    }    
    this.props.requestProject({id: nextProps.match.params.id, version: version});
  }

  render() {
    if (this.props.error) {
      return renderError();
    } else if (this.props.project) {
      return renderProject(this.props);
    } else {
      return renderNoProject();
    }
  }
}

function renderError() {
  return (
    <div>An error occurred! <button>Try again</button></div>
  );
}
function renderProject(props) {
  return (
    <div>
      <PageHeader>{props.project.name}</PageHeader>
      {renderAudit(props.project)} 
      {renderEnvironments(props.project)}
      {renderToggles(props.project)}     
    </div>
  ); 
}
  
function renderEnvironments(project) {
  return (
    <section>
      <h2>Environments <Badge>{project.environments.length}</Badge></h2>
      <ListGroup>
          {project.environments.map(environment => renderEnvironment(project.id, environment))}
      </ListGroup>
    </section>
  );
}

function renderEnvironment(projectId, environment){
  return(
    <ListGroupItem key={environment.key}>
      <Link to={`/projects/${projectId}/environments/${environment.key}`} >{environment.key}</Link>
    </ListGroupItem>
  );
}

function renderToggles(project) {
  return (
    <section>
      <h2>Toggles <Badge>{project.toggles.length}</Badge></h2>
      <ListGroup>
      {project.toggles.map(toggle => renderToggle(project.id, toggle))}
      </ListGroup>      
    </section>
  );
}

function renderToggle(projectId, toggle){
  return(
    <ListGroupItem key={toggle.key}>
      <Link to={`/projects/${projectId}/toggles/${toggle.key}`} >{toggle.name}</Link>    
    </ListGroupItem>
  );
}

function renderAudit(props)
{
  return (
    <section>
      <div>Created {Moment(props.created).fromNow()} by {props.createdBy} </div>
      <div>Last modified {Moment(props.lastModified).fromNow()} by {props.lastModifiedBy} </div>
      <div>Version {props.version}</div>
    </section>
  );
}

function renderNoProject() {
  return (
    <div>No selected project</div>
  );
}

export default connect(
  state => state.project,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Project);
