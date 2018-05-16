import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { actionCreators } from '../actions/index';
import { getEnvironment, getIsEnvironmentLoading, getIsEnvironmentStateLoading } from '../store/Environment';
import ToggleStates from '../components/ToggleStates';
import Audit from '../components/Audit';
import Loading from '../components/Loading';

class EnvironmentStatePage extends Component {
  componentWillMount() {
    this.props.selectEnvironment({projectId: this.props.match.params.projectId, environmentKey: this.props.match.params.environmentKey});
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.environmentKey === this.props.match.params.environmentKey
    ){
        return;
    }

    this.props.selectEnvironment({projectId: nextProps.match.params.projectId, environmentKey: nextProps.match.params.environmentKey});
  }

  render() {
    if (!this.props.environment){
      return null;
    }

    if (this.props.isLoading){
      return (
        <Loading/>
      )
    }

    return (
      <div>
        <PageHeader>{this.props.environment.key}</PageHeader> 
        <ToggleStates toggles={this.props.environment.toggles} projectId={this.props.match.params.projectId} environmentKey={this.props.match.params.environmentKey} />
        <Audit audit={this.props.environment.audit} />     
      </div>
    ); 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    environment: getEnvironment(state, ownProps.match.params.projectId, ownProps.match.params.environmentKey),
    isEnvironmentLoading: getIsEnvironmentLoading(state, ownProps.match.params.projectId, ownProps.match.params.environmentKey),
    isEnvironmentStateLoading: getIsEnvironmentStateLoading(state, ownProps.match.params.projectId, ownProps.match.params.environmentKey),    
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentStatePage);
