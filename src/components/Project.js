import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Project extends Component {
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
    if (!this.props.project) {
      return <div />;
    }

    return (
      <tr>
        <td class="fill">
          <Link to={`/projects/${this.props.project.id}`}>
            {this.props.project.name}
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

export default connect()(Project);
