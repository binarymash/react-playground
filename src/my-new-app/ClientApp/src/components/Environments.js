import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';
import Environment from './Environment'

class Environments extends Component {

  render() {
    if (!this.props.environments){
      return (
        <section />
      );
    }

    return (
      <section>
        <h2>Environments <Badge>{this.props.environments.length}</Badge></h2>
        <ListGroup>
            {this.props.environments.map(environment => <Environment key={environment.key} environment={environment} />)}
        </ListGroup>
      </section>
    );

   }
}

export default connect(
)(Environments);
