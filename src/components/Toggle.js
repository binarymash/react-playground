import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Toggle extends Component {
  handleDeleteClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'DELETE_TOGGLE',
      modalProps: {
        projectId: this.props.toggle.projectId,
        toggleKey: this.props.toggle.key
      }
    });
  };

  render() {
    return (
      <ListGroupItem>
        <Link
          to={`/projects/${this.props.toggle.projectId}/toggles/${
            this.props.toggle.key
          }`}
        >
          {this.props.toggle.name}
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

export default connect()(Toggle);
