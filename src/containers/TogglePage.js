import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { PageHeader } from 'react-bootstrap';
import { getToggle, getIsToggleLoading } from '../store/Toggle';
import Key from '../components/Key';
import Audit from '../components/Audit';
import PageLoading from '../components/PageLoading';



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
    if (this.props.isLoading){
      return (
        <PageLoading/>
      )
    }
    
    if (!this.props.toggle){
      return null;
    }

    return (
      <div>
        <PageHeader>
          {this.props.toggle.name}
          <div><small><Key value={this.props.toggle.key}/></small></div>
        </PageHeader>
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
