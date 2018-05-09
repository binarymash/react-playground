import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import { Badge, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Moment from 'moment'

class Environment extends Component {
  componentWillMount() {
    this.props.selectEnvironment({projectId: this.props.match.params.projectId, environmentKey: this.props.match.params.environmentKey});
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.environmentKey === this.props.match.params.environmentKey
    ){
        return;
    }

    this.props.selectEnvironment({projectId: nextProps.match.params.projectId, environmentKey: nextProps.match.params.environmentKey});
  }

  render() {
    if (this.props.error) {
      return renderError();
    } else if (this.props.environment && this.props.environment.definition && this.props.environment.state) {
      return renderEnvironment(this.props.environment);
    } else {
      return renderNoEnvironment();
    }
  }
}

function renderError() {
  return (
    <div>An error occurred! <button>Try again</button></div>
  );
}

function renderEnvironment(environment) {
  return (
    <div>
      <PageHeader>{environment.definition.key}</PageHeader> 
      {renderStates(environment.state)}
      {renderAudit(environment)}       
    </div>
  ); 
}


function renderAudit(environment) {
  return (
    <section>
      <h3>Audit</h3>
      <div>Environment definition created {Moment(environment.definition.created).fromNow()} by {environment.definition.createdBy} </div>
      <div>Environment definition last modified {Moment(environment.definition.lastModified).fromNow()} by {environment.definition.lastModifiedBy} </div>
      <div>Environment definition version {environment.definition.version}</div>
      <div>Toggle states last modified {Moment(environment.state.lastModified).fromNow()} by {environment.state.lastModifiedBy} </div>
      <div>Toggle states version {environment.state.version}</div>
    </section>
  );
}

function renderStates(environmentStates){
  if (environmentStates){
    return (
      <section>
        <h2>Toggle States <Badge>{environmentStates.toggleStates.length}</Badge></h2>
        <ListGroup>
          {environmentStates.toggleStates.map(toggleState => renderState(toggleState))}
        </ListGroup>  
      </section>
    );
  } else {
    return (
      <div></div>
    );
  }
}

function renderState(toggleState){
return(
  <ListGroupItem key={toggleState.key}>
    <span>{toggleState.key}</span>     
    <span className='pull-right'>{toggleState.value}</span>     
  </ListGroupItem>
);
}

function renderNoEnvironment() {
  return (
    <div>No selected environment</div>
  );
}

export default connect(
  state => state.environment,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Environment);
