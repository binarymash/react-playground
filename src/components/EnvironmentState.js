import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';
import '../components/react-bootstrap-switch.css';
import { Link } from 'react-router-dom';

export class EnvironmentState extends Component {
  render() {
    return (
      <ListGroupItem>
        <Link
          to={`/projects/${this.props.projectId}/environments/${
            this.props.environment.key
          }`}
        >
          {this.props.environment.name}
        </Link>
        <span className="pull-right">
          <Switch
            bsSize="mini"
            onColor="success"
            offColor="danger"
            animate={false}
            value={this.props.environment.value}
            onChange={(el, newState) => this.handleSwitch(el, newState)}
          />
        </span>
      </ListGroupItem>
    );
  }

  handleSwitch = (elem, newState) => {
    this.props.setToggleEnvironmentState(
      this.props.projectId,
      this.props.environment.key,
      this.props.toggleKey,
      this.props.environment.version,
      newState
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(EnvironmentState);
