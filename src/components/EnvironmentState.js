import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import { connect } from 'react-redux';
import '../components/react-bootstrap-switch.css';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Updating from './Updating';

export class EnvironmentState extends Component {
  render() {
    return (
      <tr
        className={`${this.props.environment.updating ? 'state-updating' : ''}`}
      >
        <td className="fill">
          <Link
            to={`/projects/${this.props.projectId}/environments/${this.props.environment.key}`}
          >
            {this.props.environment.name}{' '}
            <Updating isActive={this.props.environment.updating} />
          </Link>
        </td>
        <td className="nowrap">
          <span className="float-right">
            <Form id={`form-${this.props.environment.key}`}>
              <Form.Check
                disabled={this.props.environment.updating}
                custom
                id={`toggle-${this.props.environment.key}`}
                label=""
                type="switch"
                checked={this.props.environment.value}
                onChange={this.handleChange}
              />
            </Form>
          </span>
        </td>
      </tr>
    );
  }

  handleChange = async () => {
    await this.props.setToggleEnvironmentState(
      this.props.projectId,
      this.props.environment.key,
      this.props.toggleKey,
      !this.props.environment.value
    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(EnvironmentState);
