import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
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
          Projects <Badge variant="light">{this.props.projects.length}</Badge>
        </h2>

        <div className="tableToolbar">
          <Button
            className="float-right"
            size="sm"
            variant="success"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new project
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
