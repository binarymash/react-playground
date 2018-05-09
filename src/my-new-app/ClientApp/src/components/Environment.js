import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch'
import Moment from 'moment'
import { actionCreators } from '../actions/index';
import './react-bootstrap-switch.css';

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
      return this.renderError();
    } else if (this.props.environment && this.props.environment.definition && this.props.environment.state) {
      return this.renderEnvironment(this.props.environment);
    } else {
      return this.renderNoEnvironment();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }
  
  renderEnvironment(environment) {
    return (
      <div>
        <PageHeader>{environment.definition.key}</PageHeader> 
        {this.renderStates(environment.state)}
        {this.renderAudit(environment)}       
      </div>
    ); 
  }
  
  
  renderAudit(environment) {
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
  
  renderStates(environmentStates){
    if (environmentStates){
      return (
        <section>
          <h2>Toggle States <Badge>{environmentStates.toggleStates.length}</Badge></h2>
          <ListGroup>
            {environmentStates.toggleStates.map(toggleState => this.renderState(toggleState))}
          </ListGroup>  
        </section>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
  
  renderState(toggleState){
    return(
      <ListGroupItem key={toggleState.key}>
        <span>{toggleState.key}</span>
        <span className='pull-right'>  
          <Switch bsSize='mini' onColor='success' offColor='danger' value={toggleState.value === "True"} onChange={(el, state) => this.handleSwitch(el, state)}/>
        </span>
      </ListGroupItem>
    );
  }
  
  renderNoEnvironment() {
    return (
      <div>No selected environment</div>
    );
  }
  
  handleSwitch(elem, state) {
    console.log('handleSwitch. elem:', elem);
    console.log('name:', elem.props.name);
    console.log('new state:', state);
  }  
}

export default connect(
  state => state.environment,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Environment);
