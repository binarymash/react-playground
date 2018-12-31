import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';
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
      <ListGroupItem>
        <Link
          to={`/projects/${this.props.environment.projectId}/environments/${
            this.props.environment.key
          }`}
        >
          {this.props.environment.name}
        </Link>
        <Button
          className="pull-right"
          bsStyle="danger"
          bsSize="xsmall"
          onClick={this.handleDeleteClick}
        >
          <Glyphicon glyph="remove" /> Delete
        </Button>
      </ListGroupItem>
    );
  }
}

export default connect()(Environment);
