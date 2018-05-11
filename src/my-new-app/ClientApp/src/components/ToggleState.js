import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch'
import Moment from 'moment'
import { actionCreators } from '../actions/index';
import './react-bootstrap-switch.css';

class ToggleState extends Component {
  render() {
    return(
      <ListGroupItem key={this.props.toggleId}>
        <span>{this.props.toggleId}</span>
        {/* <span className='pull-right'>  
          <Switch id={toggleState.key} bsSize='mini' onColor='success' offColor='danger' value={toggleState.value === "True"} onChange={(el, state) => this.handleSwitch(el, state)}/>
        </span> */}
      </ListGroupItem>
    );
  }
  
  handleSwitch(elem, state) {
    this.props.updateToggleState({
      projectId: this.props.match.params.projectId,
      environmentKey: this.props.match.params.environmentKey,
      toggleKey: elem.props.id,
      state: !state
    });
  }  
}

const mapStateToProps = (state) => {
  return state.environment;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  let test = stateProps;
  return Object.assign({}, ownProps, {
    toggleState: stateProps.environment.state.toggleStates[ownProps.toggleId],
    updateToggleState: (text) => dispatchProps.updateToggleState()
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ToggleState);
