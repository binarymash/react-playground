import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Glyphicon,
  ListGroup,
  Panel
} from 'react-bootstrap';
import Toggle from './Toggle';
import Loading from './Loading';

export class Toggles extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_TOGGLE',
      modalProps: {
        projectId: this.props.projectId
      }
    });
  };

  render() {
    let content = null;
    let length = 0;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.toggles) {
      content = (
        <ListGroup>
          {this.props.toggles.map(toggle => (
            <Toggle key={toggle.key} toggle={toggle} />
          ))}
        </ListGroup>
      );
      length = this.props.toggles.length;
    }

    return (
      <section>
        <h2>
          Toggles <Badge>{length}</Badge>
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
                <Glyphicon glyph="plus" /> Add new toggle
              </Button>
            </ButtonToolbar>
          </Panel.Heading>
          <Panel.Body>{content}</Panel.Body>
        </Panel>
      </section>
    );
  }
}

export default connect()(Toggles);
