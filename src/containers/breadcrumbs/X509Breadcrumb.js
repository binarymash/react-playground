import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClientAccessStrategyName } from '../../store/Project';

class X509Breadcrumb extends Component {
  render() {
    return <span>{this.props.name}</span>;
  }
}

// find the user in the store with the `id` from the route
const mapStateToProps = (state, props) => ({
  name: getClientAccessStrategyName(
    state,
    props.match.params.projectId,
    props.match.params.strategyId
  ),
});

export default connect(mapStateToProps)(X509Breadcrumb);
