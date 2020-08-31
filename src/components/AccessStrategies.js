import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AccessStrategyX509 from './AccessStrategyX509';
import Loading from './Loading';
import { BsPlus } from 'react-icons/bs';
import * as modalTypes from '../containers/modals/types';

export class AccessStrategies extends Component {
  handleAddClick = () => {
    this.props.showModal(modalTypes.ADD_ACCESS_STRATEGY, {
      projectId: this.props.projectId,
    });
  };

  render() {
    let content = null;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.strategies) {
      content = (
        <Table striped bordered hover>
          <tbody>
            {this.props.strategies.map((strategy) => (
              <AccessStrategyX509 key={strategy.id} strategy={strategy} />
            ))}
          </tbody>
        </Table>
      );
    }

    return (
      <section>
        <div className="tableToolbar">
          <Button
            className="float-right"
            variant="primary"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new X.509 certificate
          </Button>
        </div>
        {content}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(AccessStrategies);
