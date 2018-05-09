import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import { Badge, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Moment from 'moment'

class Toggle extends Component {
  componentWillMount() {
    this.props.selectToggle({projectId: this.props.match.params.projectId, toggleKey: this.props.match.params.toggleKey});
  }

  componentWillReceiveProps(nextProps) { 
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.toggleKey === this.props.match.params.toggleKey
    ){
      return;
    }

    this.props.selectToggle({projectId: nextProps.match.params.projectId, toggleKey: nextProps.match.params.toggleKey});
  }

  render() {
    if (this.props.error) {
      return renderError();
    } else if (this.props.toggle) {
      return renderToggle(this.props);
    } else {
      return renderNoToggle();
    }
  }
}

function renderError() {
  return (
    <div>An error occurred! <button>Try again</button></div>
  );
}
function renderToggle(props) {
  return (
    <div>
      <PageHeader>{props.toggle.name}</PageHeader>
      {renderAudit(props.toggle)}    
    </div>
  ); 
}
  
function renderAudit(props)
{
  return (
    <section>
      <h3>Audit</h3>
      <div>Toggle created {Moment(props.created).fromNow()} by {props.createdBy} </div>
      <div>Toggle last modified {Moment(props.lastModified).fromNow()} by {props.lastModifiedBy} </div>
      <div>Version {props.version}</div>
    </section>
  );
}

function renderNoToggle() {
  return (
    <div>No selected toggle</div>
  );
}

export default connect(
  state => state.toggle,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Toggle);
