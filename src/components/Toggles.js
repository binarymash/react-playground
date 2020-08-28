import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
import Toggle from './Toggle';
import Loading from './Loading';
import * as modalTypes from '../containers/modals/types';

export class Toggles extends Component {
  handleAddClick = () => {
    this.props.showModal(modalTypes.ADD_TOGGLE, {
      projectId: this.props.projectId,
    });
  };

  render() {
    let content = null;
    let length = 0;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.toggles) {
      content = (
        <Table striped bordered hover>
          <tbody>
            {this.props.toggles.map((toggle) => (
              <Toggle key={toggle.key} toggle={toggle} />
            ))}
          </tbody>
        </Table>
      );
      length = this.props.toggles.length;
    }

    return (
      <section>
        <div className="tableToolbar">
          <Button
            className="float-right"
            variant="primary"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new toggle
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

export default connect(null, mapDispatchToProps)(Toggles);
