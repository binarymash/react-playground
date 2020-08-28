import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
import Environment from './Environment';
import * as modalTypes from '../containers/modals/types';

export class Environments extends Component {
  handleAddClick = () => {
    this.props.showModal(modalTypes.ADD_ENVIRONMENT, {
      projectId: this.props.projectId,
    });
  };

  render() {
    if (!this.props.environments) {
      return <section />;
    }

    return (
      <section>
        <div className="tableToolbar">
          <Button
            className="float-right"
            variant="primary"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new environment
          </Button>
        </div>
        <Table striped bordered hover>
          <tbody>
            {this.props.environments.map((environment) => (
              <Environment key={environment.key} environment={environment} />
            ))}
          </tbody>
        </Table>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(Environments);
