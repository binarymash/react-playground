import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';
import EnvironmentState from './EnvironmentState';
import Loading from './Loading';

export class EnvironmentStates extends Component {
  render() {
    let content = null;
    let length = 0;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.environments) {
      length = this.props.environments.length;
      content = (
        <ListGroup>
          {this.props.environments.map(environment => (
            <EnvironmentState
              key={environment.key}
              environment={environment}
              projectId={this.props.projectId}
              toggleKey={this.props.toggleKey}
            />
          ))}
        </ListGroup>
      );
    }

    return (
      <section>
        <h2>
          Environment States <Badge>{length}</Badge>
        </h2>
        {content}
      </section>
    );
  }
}

export default connect()(EnvironmentStates);
