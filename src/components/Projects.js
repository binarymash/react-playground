import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Glyphicon, Table } from 'react-bootstrap';
import Project from './Project';

export class Projects extends Component {
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

        <div className="tableToolbar">
          <Button
            className="pull-right"
            bsSize="small"
            bsStyle="success"
            onClick={this.handleAddClick}
          >
            <Glyphicon glyph="plus" /> Add new project
          </Button>
        </div>

        <Table striped bordered hover>
          <tbody>
            {this.props.projects.map(project => (
              <Project key={project.id} project={project} />
            ))}
          </tbody>
        </Table>
      </section>
    );
  }
}

export default connect()(Projects);
