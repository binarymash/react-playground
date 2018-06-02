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
import Project from './Project';

class Projects extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_PROJECT',
      modalProps: {}
    });
  };

  render() {
    if (!this.props.projects) {
      return null;
    }

    return (
      <section>
        <h2>
          Projects <Badge>{this.props.projects.length}</Badge>
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
                <Glyphicon glyph="plus" /> Add new project
              </Button>
            </ButtonToolbar>
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {this.props.projects.map(project => (
                <Project key={project.id} project={project} />
              ))}
            </ListGroup>
          </Panel.Body>
        </Panel>
      </section>
    );
  }
}

export default connect()(Projects);
