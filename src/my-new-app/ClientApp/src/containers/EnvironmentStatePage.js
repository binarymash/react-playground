import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { actionCreators } from '../actions/index';
import { getEnvironment, getIsLoading, getIsErrored } from '../store/Environment';
import ToggleStates from '../components/ToggleStates'
import Audit from '../components/Audit'

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
    if (this.props.isError) {
      return this.renderError();
    } else {
      return this.renderEnvironment();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }
  
  renderEnvironment() {
    if (!this.props.environment){
      return (
        <div></div>
      )
    }
    return (
      <div>
        <PageHeader>{this.props.environment.key}</PageHeader> 
        <ToggleStates toggles={this.props.environment.toggles} />
        <Audit audit={this.props.environment.audit} />     
      </div>
    ); 
  }
}

const mapStateToProps = (state) => {
  return {
    environment: getEnvironment(state),
    isLoading: getIsLoading(state),
    isErrored: getIsErrored(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentStatePage);
