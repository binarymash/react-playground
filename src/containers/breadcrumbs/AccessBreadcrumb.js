import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccessBreadcrumb extends Component {
  render() {
    return <span>Access</span>;
  }
}

export default connect()(AccessBreadcrumb);
