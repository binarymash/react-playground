import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/index';
import { PageHeader } from 'react-bootstrap';
import Audit from '../components/Audit';
import { getToggle } from '../store/Toggle';


class TogglePage extends Component {
  componentWillMount() {
    this.props.selectToggle({projectId: this.props.match.params.projectId, toggleKey: this.props.match.params.toggleKey});
  }

  componentWillReceiveProps(nextProps) { 
    if (
      nextProps.match.params.projectId === this.props.match.params.projectId &&
      nextProps.match.params.toggleKey === this.props.match.params.toggleKey
    ){
      return;
    }

    this.props.selectToggle({projectId: nextProps.match.params.projectId, toggleKey: nextProps.match.params.toggleKey});
  }

  render() {
    if (this.props.error) {
      return this.renderError();
    } else if (this.props.toggle) {
      return this.renderToggle(this.props);
    } else {
      return this.renderNoToggle();
    }
  }

  renderError() {
    return (
      <div>An error occurred! <button>Try again</button></div>
    );
  }

  renderToggle(props) {
    return (
      <div>
        <PageHeader>{props.toggle.name}</PageHeader>
        <Audit audit={props.toggle.audit} />
      </div>
    ); 
  }

  renderNoToggle() {
    return (
      <div>No selected toggle</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggle: getToggle(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TogglePage);
