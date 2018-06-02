import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectName } from '../../store/Project';

class ProjectBreadcrumb extends Component {
  render() {
    return <span>{this.props.name}</span>;
  }
}

// find the user in the store with the `id` from the route
const mapStateToProps = (state, props) => ({
  name: getProjectName(state, props.match.params.id)
});

export default connect(mapStateToProps)(ProjectBreadcrumb);
