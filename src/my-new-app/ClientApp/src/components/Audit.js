import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment'

class Audit extends Component {

  render() {
    if (!this.props.audit){
      return (
        <section />
      );
    }
    return (
      <section>
        <h3>Audit</h3>
        <div><small>Created {Moment(this.props.audit.created).fromNow()} by {this.props.audit.createdBy}</small></div>
        <div><small>Last modified {Moment(this.props.audit.lastModified).fromNow()} by {this.props.audit.lastModifiedBy}</small></div>
      </section>
    );
  }
}

export default connect(
)(Audit);
