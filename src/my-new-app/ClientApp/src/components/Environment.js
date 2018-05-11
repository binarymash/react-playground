import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch'
import Moment from 'moment'
import { actionCreators } from '../actions/index';
import { getEnvironment, getEnvironmentState, getIsLoading, getIsErrored } from '../store/Environment';
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
    if (this.props.isError) {
      return this.renderError();
    } else {
      return this.renderEnvironment();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }
  
  renderEnvironment() {
    if (!this.props.environment){
      return (
        <div></div>
      )
    }
    return (
      <div>
        <PageHeader>{this.props.environment.key}</PageHeader> 
        {this.renderStates()}
        {this.renderAudit()}       
      </div>
    ); 
  }
  
  
  renderAudit() {
    if (!this.props.environment.audit){
      return (
        <section/>
      )
    }

    return (
      <section>
        <h3>Audit</h3>
        <div>Created {Moment(this.props.environment.audit.created).fromNow()} by {this.props.environment.audit.createdBy} </div>
        <div>Last modified {Moment(this.props.environment.audit.lastModified).fromNow()} by {this.props.environment.audit.lastModifiedBy} </div>
        <div>Version {this.props.environment.audit.version}</div>
      </section>
    );
  }
  
  renderStates(){
    return (
      <section>
        <h2>Toggle States <Badge>{this.props.environment.toggles.length}</Badge></h2>
        <ListGroup>
          {this.props.environment.toggles.map(toggle => this.renderState(toggle))}
        </ListGroup>  
      </section>
    );
  }
  
  renderState(toggle){
    return(
      <ListGroupItem key={toggle.key}>
        <span>{toggle.key}</span>
        <span className='pull-right'>  
          <Switch bsSize='mini' onColor='success' offColor='danger' value={toggle.value} onChange={(el, state) => this.handleSwitch(el, state)}/>
        </span>
      </ListGroupItem>
    );
  }
  
  handleSwitch(elem, state) {
    console.log('handleSwitch. elem:', elem);
    console.log('name:', elem.props.name);
    console.log('new state:', state);
  }  
}

const mapStateToProps = (state) => {
  return {
    environment: getEnvironment(state),
    isLoading: getIsLoading(state),
    isErrored: getIsErrored(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Environment);
