import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import * as modalTypes from '../containers/modals/types';

export class Environment extends Component {
  handleDeleteClick = () => {
    this.props.showModal(modalTypes.DELETE_ENVIRONMENT, {
      projectId: this.props.environment.projectId,
      environmentKey: this.props.environment.key,
    });
  };

  render() {
    if (!this.props.environment) {
      return <div />;
    }

    return (
      <tr>
        <td className="fill">
          <Link
            to={`/projects/${this.props.environment.projectId}/environments/${this.props.environment.key}`}
          >
            {this.props.environment.name}
          </Link>
        </td>
        <td className="nowrap">
          <Button
            className="float-right"
            variant="danger"
            size="sm"
            onClick={this.handleDeleteClick}
          >
            <BsX /> Delete
          </Button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect()(Environment);
