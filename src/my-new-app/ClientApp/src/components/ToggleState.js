import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';
import '../components/react-bootstrap-switch.css';


class ToggleState extends Component {

  render() {
    return(
      <ListGroupItem>
        <span>{this.props.toggle.key}</span>
        <span className='pull-right'>  
          <Switch bsSize='mini' onColor='success' offColor='danger' value={this.props.toggle.value} onChange={(el, state) => this.handleSwitch(el, state)}/>
        </span>
      </ListGroupItem>
    );
  }
  
  handleSwitch(elem, state) {
    console.log('handleSwitch. elem:', elem);
    console.log('name:', elem.props.name);
    console.log('new state:', state);
  }  
}

export default connect(
)(ToggleState);
