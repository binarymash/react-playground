import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import ToggleState from './ToggleState';
import Loading from './Loading';

export class ToggleStates extends Component {
  render() {
    let content = null;
    let length = 0;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.toggles) {
      length = this.props.toggles.length;
      content = (
        <Table striped bordered hover>
          <tbody>
            {this.props.toggles.map(toggle => (
              <ToggleState
                key={toggle.key}
                toggle={toggle}
                projectId={this.props.projectId}
                environmentKey={this.props.environmentKey}
              />
            ))}
          </tbody>
        </Table>
      );
    }

    return (
      <section>
        <h2>
          Toggle States <Badge variant="light">{length}</Badge>
        </h2>
        {content}
      </section>
    );
  }
}

export default connect()(ToggleStates);
