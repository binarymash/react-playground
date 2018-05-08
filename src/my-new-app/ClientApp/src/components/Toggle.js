import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Toggle';
import { Badge, Button, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Moment from 'moment'

class Toggle extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    this.props.requestToggle({projectId: this.props.match.params.projectId, toggleKey: this.props.match.params.toggleKey, version: -1});
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    let version = -1;
    if (nextProps.toggle) {
      version = nextProps.toggle.version;
    }    
    this.props.requestToggle({projectId: nextProps.match.params.projectId, toggleKey: nextProps.match.params.toggleKey, version: version});
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
      <div>Created {Moment(props.created).fromNow()} by {props.createdBy} </div>
      <div>Last modified {Moment(props.lastModified).fromNow()} by {props.lastModifiedBy} </div>
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
