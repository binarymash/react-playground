import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

export class Environment extends Component {
  handleDeleteClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'DELETE_ENVIRONMENT',
      modalProps: {
        projectId: this.props.environment.projectId,
        environmentKey: this.props.environment.key
      }
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

export default connect()(Environment);
