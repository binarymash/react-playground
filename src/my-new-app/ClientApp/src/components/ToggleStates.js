import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';
import ToggleState from './ToggleState'

class ToggleStates extends Component {

  render() {
    if (!this.props.toggles){
      return (
        <section />
      );
    }

    return (
      <section>
        <h2>Toggle States <Badge>{this.props.toggles.length}</Badge></h2>
        <ListGroup>
          {this.props.toggles.map(toggle => <ToggleState key={toggle.key} toggle={toggle} />) }
        </ListGroup>  
      </section>
    );
   }
}

export default connect(
)(ToggleStates);
