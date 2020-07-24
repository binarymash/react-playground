import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import { connect } from 'react-redux';
import '../components/react-bootstrap-switch.css';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export class EnvironmentState extends Component {
  render() {
    return (
      <tr>
        <td className="fill">
          <Link
            to={`/projects/${this.props.projectId}/environments/${this.props.environment.key}`}
          >
            {this.props.environment.name}
          </Link>
        </td>
        <td className="nowrap">
          <span className="float-right">
            <Form id={`form-${this.props.environment.key}`}>
              <Form.Check
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

  handleChange = () => {
    this.props.setToggleEnvironmentState(
      this.props.projectId,
      this.props.environment.key,
      this.props.toggleKey,
      !this.props.environment.value
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(EnvironmentState);
