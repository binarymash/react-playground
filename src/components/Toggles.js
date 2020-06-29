import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Glyphicon, Table } from 'react-bootstrap';
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
        <Table striped bordered hover>
          <tbody>
            {this.props.toggles.map(toggle => (
              <Toggle key={toggle.key} toggle={toggle} />
            ))}
          </tbody>
        </Table>
      );
      length = this.props.toggles.length;
    }

    return (
      <section>
        <h2>
          Toggles <Badge>{length}</Badge>
        </h2>

        <div class="tableToolbar">
          <Button
            className="pull-right"
            bsSize="small"
            bsStyle="success"
            onClick={this.handleAddClick}
          >
            <Glyphicon glyph="plus" /> Add new toggle
          </Button>
        </div>
        {content}
      </section>
    );
  }
}

export default connect()(Toggles);
