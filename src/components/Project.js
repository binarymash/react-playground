import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

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
        <td className="fill">
          <Link to={`/projects/${this.props.project.id}`}>
            {this.props.project.name}
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

export default connect()(Project);
