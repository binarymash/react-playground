import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ControlLabel, FormControl, FormGroup, Glyphicon, Modal, Button } from 'react-bootstrap'
import { hideModal } from '../../actions/index';
import validator from 'validator';

const KEY_WHITELIST = 'a-z0-9_.-';

class AddEnvironment extends Component {
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
        this.props.addEnvironment(this.props.projectId, this.state.key);
      });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'key') {
      value = this.sanitizeKey(value);
    }

    this.setState({
      [name]: value
    });
  }

  sanitizeKey = (value) => {
    return validator.whitelist(value.normalize('NFKD').replace(/\s+/g, '-').toLowerCase(), KEY_WHITELIST);
  }

  isValid = () => {
    return this.getKeyValidationState() === 'success';
  }

  getKeyValidationState = () => {
    if (this.state.key.length === 0 || this.state.key.length > 128){
        return 'error';
    }

    if (!validator.matches(this.state.key, `^[${KEY_WHITELIST}]*$`))
    {
      return 'error';
    }

    return 'success';    
  } 

  render() {
    return (
      <Modal show={true} animation={false} onHide={() => this.props.hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title><Glyphicon glyph='exclamation-plus'/> Add new environment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="environmentKey" validationState={this.getKeyValidationState()}>
              <ControlLabel>Environment key</ControlLabel>
              <FormControl
                autoFocus
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
)(AddEnvironment);
