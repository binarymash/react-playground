import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
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
          <span className="float-right">
            <Form id={`form-${this.props.toggle.key}`}>
              <Form.Check
                custom
                id={`toggle-${this.props.toggle.key}`}
                label=""
                type="switch"
                checked={this.props.toggle.value}
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
      this.props.environmentKey,
      this.props.toggle.key,
      !this.props.toggle.value
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(ToggleState);
