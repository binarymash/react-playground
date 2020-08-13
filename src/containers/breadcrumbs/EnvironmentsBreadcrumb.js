import React, { Component } from 'react';
import { connect } from 'react-redux';

class EnvironmentsBreadcrumb extends Component {
  render() {
    return <span>Environments</span>;
  }
}

export default connect()(EnvironmentsBreadcrumb);
