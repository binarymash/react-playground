import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <td>
          <Button
            className="pull-right"
            bsStyle="danger"
            bsSize="xsmall"
            onClick={this.handleDeleteClick}
          >
            <Glyphicon glyph="remove" /> Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default connect()(Environment);
