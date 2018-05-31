import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { actionCreators } from '../actions/index';
import { getProject, getIsLoading } from '../store/Project';
import Key from '../components/Key';
import Environments from '../components/Environments';
import Toggles from '../components/Toggles';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';

class ProjectPage extends Component {
  componentWillMount() {
    this.props.selectProject(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id === this.props.match.params.id){
      return;
    }

    this.props.selectProject(nextProps.match.params.id);
  }

  render() {
    if (this.props.isLoading){
      return (
        <PageLoading/>
      );
    }

    if (!this.props.project){
      return null;
    }

    return (
      <div>
        <PageHeader>
          {this.props.project.name}
          <div><small><Key value={this.props.project.id}/></small></div>
        </PageHeader>
        <Environments environments={this.props.project.environments} projectId={this.props.project.id}/>
        <Toggles toggles={this.props.project.toggles} projectId={this.props.project.id}/>
        <Audit audit={this.props.project.audit} />   
      </div>
    ); 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    project : getProject(state, ownProps.match.params.id),
    isLoading: getIsLoading(state, ownProps.match.params.id),
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage);
