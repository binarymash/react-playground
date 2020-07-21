import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import { connect } from 'react-redux';
import Switch from 'react-bootstrap-switch';
import '../components/react-bootstrap-switch.css';
import { Link } from 'react-router-dom';

export class ToggleState extends Component {
  render() {
    return (
      <tr>
        <td className="fill">
          <Link
            to={`/projects/${this.props.projectId}/toggles/${this.props.toggle.key}`}
          >
            {this.props.toggle.name}
          </Link>
        </td>
        <td>
          <span className="pull-right">
            <Switch
              bsSize="mini"
              onColor="success"
              offColor="danger"
              animate={false}
              value={this.props.toggle.value}
              onChange={(el, newState) => this.handleSwitch(el, newState)}
            />
          </span>
        </td>
      </tr>
    );
  }

  handleSwitch = (elem, newState) => {
    this.props.setToggleEnvironmentState(
      this.props.projectId,
      this.props.environmentKey,
      this.props.toggle.key,
      this.props.toggle.version,
      newState
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(ToggleState);
