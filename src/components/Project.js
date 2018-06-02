import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Project extends Component {
  handleDeleteClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'DELETE_PROJECT',
      modalProps: {
        projectId: this.props.project.id
      }
    });
  };

  render() {
    return (
      <ListGroupItem>
        <Link to={`/projects/${this.props.project.id}`}>
          {this.props.project.name}
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

export default connect()(Project);
