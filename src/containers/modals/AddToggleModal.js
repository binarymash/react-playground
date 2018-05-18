import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ControlLabel, FormControl, FormGroup, Glyphicon, Modal, Button } from 'react-bootstrap'
import { hideModal } from '../../actions/index';

class AddToggleModal extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      name: '',
      key: ''
    };
  }

  handleOkClick = (event) => {
    if (this.isValid()) {
        this.props.hideModal().then(() => {
          this.props.addToggle(this.props.projectId, this.state.key, this.state.name);
        });
      }
      }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  isValid = () => {
    return this.getNameValidationState() === 'success' && this.getKeyValidationState() === 'success';
  }

  getNameValidationState = () => {
    if (this.state.name.length === 0){
        return 'error';
    }
    return 'success';    
  }

  getKeyValidationState = () => {
    if (this.state.key.length === 0){
        return 'error';
    }
    return 'success';    
  } 

  render() {
    return (
      <Modal show={true} animation={false} onHide={() => this.props.hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title><Glyphicon glyph='exclamation-plus'/> Add new toggle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="toggleName"
              validationState={this.getNameValidationState()}
            >
              <ControlLabel>Toggle name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="toggleKey" validationState={this.getKeyValidationState()}>
              <ControlLabel>Toggle key</ControlLabel>
              <FormControl
                type="text"
                name="key"
                value={this.state.key}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.hideModal()}><Glyphicon glyph='remove'/> Cancel</Button>
          <Button active={true} bsStyle='success' onClick={() => this.handleOkClick()}><Glyphicon glyph='ok'/> Save</Button>
        </Modal.Footer>
      </Modal> 
  )}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(AddToggleModal);
