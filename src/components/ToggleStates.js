import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';
import ToggleState from './ToggleState';
import Loading from './Loading';

class ToggleStates extends Component {
  render() {
    let content = null;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.toggles) {
      content = (
        <ListGroup>
          {this.props.toggles.map(toggle => (
            <ToggleState
              key={toggle.key}
              toggle={toggle}
              projectId={this.props.projectId}
              environmentKey={this.props.environmentKey}
            />
          ))}
        </ListGroup>
      );
    }

    return (
      <section>
        <h2>
          Toggle States <Badge>{this.props.toggles.length}</Badge>
        </h2>
        {content}
      </section>
    );
  }
}

export default connect()(ToggleStates);
