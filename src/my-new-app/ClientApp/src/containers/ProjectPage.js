import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { actionCreators } from '../actions/index';
import { getProject, getIsLoading, getIsErrored } from '../store/Project';
import Environments from '../components/Environments';
import Toggles from '../components/Toggles';
import Audit from '../components/Audit';

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
    if (this.props.error) {
      return this.renderError();
    } else if (this.props.project) {
      return this.renderProject(this.props);
    } else {
      return this.renderNoProject();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }

  renderProject(props) {
    return (
      <div>
        <PageHeader>{props.project.name}</PageHeader>
        <Environments environments={props.project.environments} />
        <Toggles toggles={props.project.toggles} projectId={props.project.id}/>
        <Audit audit={props.project.audit} />   
      </div>
    ); 
  }

  renderNoProject() {
    return (
      <div>No selected project</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project : getProject(state),
    isLoading: getIsLoading(state),
    isErrored: getIsErrored(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage);
