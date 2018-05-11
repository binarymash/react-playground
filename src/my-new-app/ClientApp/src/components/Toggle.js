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
      return this.renderError();
    } else if (this.props.toggle) {
      return this.renderToggle(this.props);
    } else {
      return this.renderNoToggle();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }

  renderToggle(props) {
    return (
      <div>
        <PageHeader>{props.toggle.name}</PageHeader>
        {this.renderAudit(props.toggle)}    
      </div>
    ); 
  }
  
  renderAudit(props)
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

  renderNoToggle() {
    return (
      <div>No selected toggle</div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.toggle;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle);
