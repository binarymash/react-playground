import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import * as modalTypes from '../containers/modals/types';

export class AccessStrategyX509 extends Component {
  handleDeleteClick = () => {
    this.props.showModal(modalTypes.DELETE_ACCESS_STRATEGY, {
      projectId: this.props.strategy.projectId,
      strategyId: this.props.strategy.id,
    });
  };

  render() {
    if (!this.props.strategy) {
      return <div />;
    }

    return (
      <tr>
        <td>X.509 Certificate</td>
        <td className="fill">
          <Link
            to={`/projects/${this.props.strategy.projectId}/certificates/${this.props.strategy.id}`}
          >
            {this.props.strategy.id}
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

export default connect(null, mapDispatchToProps)(AccessStrategyX509);
