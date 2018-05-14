import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, ButtonGroup, ButtonToolbar, Glyphicon, ListGroup, Panel } from 'react-bootstrap';
import Toggle from './Toggle';

class Toggles extends Component {

  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_TOGGLE',
      modalProps: {
        projectId: this.props.projectId
      }
    });
  }

  render() {
    if (!this.props.toggles){
      return (
        <section />
      );
    }

    return (
      <section>
        <h2>Toggles <Badge>{this.props.toggles.length}</Badge></h2>
        <Panel>
          <Panel.Heading>
            <ButtonToolbar>
              <Button className='pull-right' bsSize='small' bsStyle='success' onClick={this.handleAddClick}><Glyphicon glyph='plus' /> Add new toggle</Button>
            </ButtonToolbar>
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {this.props.toggles.map(toggle => <Toggle key={toggle.key} toggle={toggle} />)}
            </ListGroup>
          </Panel.Body>
        </Panel>      
      </section>
    );    

   }
}

export default connect(
)(Toggles);
