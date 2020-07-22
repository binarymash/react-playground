import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

export class Toggle extends Component {
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
    if (!this.props.toggle) {
      return <div />;
    }

    return (
      <tr>
        <td className="fill">
          <Link
            to={`/projects/${this.props.toggle.projectId}/toggles/${this.props.toggle.key}`}
          >
            {this.props.toggle.name}
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

export default connect()(Toggle);
