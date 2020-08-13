﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
import Toggle from './Toggle';
import Loading from './Loading';

export class Toggles extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_TOGGLE',
      modalProps: {
        projectId: this.props.projectId,
      },
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

export default connect()(Toggles);
