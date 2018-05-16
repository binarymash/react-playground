import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { PageHeader } from 'react-bootstrap';
import { getToggle, getIsToggleLoading } from '../store/Toggle';
import Audit from '../components/Audit';
import Loading from '../components/Loading';



class TogglePage extends Component {
  componentWillMount() {
    this.props.selectToggle(this.props.match.params.projectId, this.props.match.params.toggleKey);
  }

  componentWillReceiveProps(nextProps) { 
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.toggleKey === this.props.match.params.toggleKey
    ){
      return;
    }

    this.props.selectToggle(nextProps.match.params.projectId, nextProps.match.params.toggleKey);
  }

  render() {
    if (!this.props.toggle){
      return null;
    }

    if (this.props.isLoading){
      return (
        <Loading/>
      )
    }


    return (
      <div>
        <PageHeader>{this.props.toggle.name}</PageHeader>
        <Audit audit={this.props.toggle.audit} />
      </div>
    ); 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    toggle: getToggle(state, ownProps.match.params.projectId, ownProps.match.params.toggleKey),
    isLoading: getIsToggleLoading(state, ownProps.match.params.projectId, ownProps.match.params.toggleKey)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TogglePage);
