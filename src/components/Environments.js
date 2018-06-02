import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  ButtonToolbar,
  Glyphicon,
  ListGroup,
  Panel
} from 'react-bootstrap';
import Environment from './Environment';

class Environments extends Component {
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
        <Panel>
          <Panel.Heading>
            <ButtonToolbar>
              <Button
                className="pull-right"
                bsSize="small"
                bsStyle="success"
                onClick={this.handleAddClick}
              >
                <Glyphicon glyph="plus" /> Add new environment
              </Button>
            </ButtonToolbar>
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {this.props.environments.map(environment => (
                <Environment key={environment.key} environment={environment} />
              ))}
            </ListGroup>
          </Panel.Body>
        </Panel>
      </section>
    );
  }
}

export default connect()(Environments);
