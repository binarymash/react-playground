import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { actionCreators } from '../actions/index';
import { getEnvironment, getIsEnvironmentLoading, getIsEnvironmentStateLoading } from '../store/Environment';
import Key from '../components/Key';
import ToggleStates from '../components/ToggleStates';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';

class EnvironmentStatePage extends Component {
  componentWillMount() {
    this.props.selectEnvironment(this.props.match.params.projectId, this.props.match.params.environmentKey);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.environmentKey === this.props.match.params.environmentKey
    ){
        return;
    }

    this.props.selectEnvironment(nextProps.match.params.projectId, nextProps.match.params.environmentKey);
  }

  render() {
    if (this.props.isEnvironmentLoading){
      return (
        <PageLoading/>
      )
    }

    if (!this.props.environment){
      return null;
    }

    return (
      <div>
        <PageHeader>{this.props.environment.name}
          <small><Key value={this.props.environment.key}/></small>
        </PageHeader>
        
        <ToggleStates toggles={this.props.environment.toggles} projectId={this.props.match.params.projectId} environmentKey={this.props.match.params.environmentKey} isLoading={this.props.isEnvironmentStateLoading}/>
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
