import React, { Component } from 'react';
import { connect } from 'react-redux';

class TogglesBreadcrumb extends Component {
  render() {
    return <span>Toggles</span>;
  }
}

export default connect()(TogglesBreadcrumb);
