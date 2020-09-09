import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import * as modalTypes from '../containers/modals/types';
import Updating from './Updating';

export class Project extends Component {
  handleDeleteClick = () => {
    this.props.showModal(modalTypes.DELETE_PROJECT, {
      projectId: this.props.project.id,
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
            {this.props.project.name}{' '}
            <Updating isActive={this.props.project.isUpdating} />
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

export default connect(null, mapDispatchToProps)(Project);
