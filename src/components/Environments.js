import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
import Environment from './Environment';

export class Environments extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_ENVIRONMENT',
      modalProps: {
        projectId: this.props.projectId
      }
    });
  };

  render() {
    if (!this.props.environments) {
      return <section />;
    }

    return (
      <section>
        <h2>
          Environments{' '}
          <Badge variant="light">{this.props.environments.length}</Badge>
        </h2>

        <div>
          <div className="tableToolbar">
            <Button
              className="float-right"
              size="sm"
              variant="success"
              onClick={this.handleAddClick}
            >
              <BsPlus /> Add new environment
            </Button>
          </div>
          <Table striped bordered hover>
            <tbody>
              {this.props.environments.map(environment => (
                <Environment key={environment.key} environment={environment} />
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    );
  }
}

export default connect()(Environments);
