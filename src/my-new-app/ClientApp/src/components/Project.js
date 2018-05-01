import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Project';

class Project extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestProject({id: this.props.match.params.id, version: -1});
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    // let version = -1;
    // if (nextProps.project) {
    //   version = nextProps.project.version;
    // }    
    // this.props.requestProject({id: nextProps.match.params.id, version: version});
  }

  render() {
    if (this.props.project) {
      return renderProject(this.props);
    } else {
      return renderNoProject();
    }
  }
}

function renderProject(props) {
  return (
    <div>
      <h1><Link to={'/projects'}>Projects</Link> - {props.project.name}</h1>
      {renderEnvironments(props.project.environments)}
      {renderToggles(props.project.toggles)}     
      {renderAudit(props.project)} 
    </div>
  ); 
}
  
function renderEnvironments(environments) {
  return (
    <section>
      <h2>Environments</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {environments.map(environment => renderEnvironment(environment))}
        </tbody>
      </table>
    </section>
  );
}

function renderEnvironment(environment){
  return(
    <tr key={environment.id}>
      <td>
      </td>
    </tr>
  );
}

function renderToggles(toggles) {
  return (
    <section>
      <h2>Toggles</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {toggles.map(toggle => renderToggle(toggle))}
        </tbody>
      </table>
    </section>
  );
}

function renderToggle(toggle){
  return(
    <tr key={toggle.id}>
      <td>
      </td>
    </tr>
  );
}

function renderAudit(props)
{
  return (
    <section>
      <div>Created by {props.createdBy} at {props.created}</div>
      <div>Last modified by {props.lastModifiedBy} at {props.lastModified}</div>
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
