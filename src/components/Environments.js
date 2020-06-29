import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Glyphicon, Table } from 'react-bootstrap';
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
          Environments <Badge>{this.props.environments.length}</Badge>
        </h2>

        <div>
          <div class="tableToolbar">
            <Button
              className="pull-right"
              bsSize="small"
              bsStyle="success"
              onClick={this.handleAddClick}
            >
              <Glyphicon glyph="plus" /> Add new environment
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
