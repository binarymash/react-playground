import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

export class AccessStrategyX509 extends Component {
  handleDeleteClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'DELETE_ACCESS_STRATEGY_X509',
      modalProps: {
        projectId: this.props.projectId,
        strategyId: this.props.strategy.id
      }
    });
  };

  render() {
    if (!this.props.strategy) {
      return <div />;
    }

    return (
      <tr>
        <td>X509 Certificate</td>
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

export default connect()(AccessStrategyX509);
