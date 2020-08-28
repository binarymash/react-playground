import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/creators';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { BsPlus } from 'react-icons/bs';
import Project from './Project';

export class Projects extends Component {
  handleAddClick = () => {
    this.props.showModal('ADD_PROJECT', {});
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
            variant="primary"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new project
          </Button>
        </div>

        <Table striped bordered hover>
          <tbody>
            {this.props.projects.map((project) => (
              <Project key={project.id} project={project} />
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

export default connect(null, mapDispatchToProps)(Projects);
