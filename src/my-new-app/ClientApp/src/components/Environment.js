import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
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
    } else if (this.props.environment) {
      return renderEnvironment(this.props);
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

function renderEnvironment(props) {
  return (
    <div>
      <PageHeader>{props.environment.key}</PageHeader>
      {renderAudit(props.environment)}  
    </div>
  ); 
}


function renderAudit(props) {
  return (
    <section>
      <div>Created {Moment(props.created).fromNow()} by {props.createdBy} </div>
      <div>Last modified {Moment(props.lastModified).fromNow()} by {props.lastModifiedBy} </div>
      <div>Version {props.version}</div>
    </section>
  );
}

function renderToggleStates(props){
  return (
    <h2>Toggle States</h2>
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
