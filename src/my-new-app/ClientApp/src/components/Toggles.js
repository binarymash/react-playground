import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';
import Toggle from './Toggle';

class Toggles extends Component {

  render() {
    if (!this.props.toggles){
      return (
        <section />
      );
    }

    return (
      <section>
        <h2>Toggles <Badge>{this.props.toggles.length}</Badge></h2>
        <ListGroup>
          {this.props.toggles.map(toggle => <Toggle key={toggle.key} toggle={toggle} />)}
        </ListGroup>      
      </section>
    );    

   }
}

export default connect(
)(Toggles);
