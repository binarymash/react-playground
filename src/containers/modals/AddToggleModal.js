import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsX, BsCheck } from 'react-icons/bs';
import validator from 'validator';

const KEY_WHITELIST = 'a-z0-9_.-';

class AddToggleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      key: ''
    };
  }

  handleOkClick = event => {
    if (this.isValid()) {
      this.props.hideModal().then(() => {
        this.props.addToggle(
          this.props.projectId,
          this.state.key,
          this.state.name
        );
      });
    }
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'key') {
      value = this.sanitizeKey(value);
    }

    this.setState({
      [name]: value
    });

    if (name === 'name') {
      this.syncKey(value);
    }
  };

  handleKeyFocus = event => {
    this.setState({ ['keyFocussed']: true });
  };

  syncKey = value => {
    if (this.state.key.length === 0 && this.state.keyFocussed) {
      this.setState({ ['keyFocussed']: false });
    }

    if (!this.state.keyFocussed) {
      this.setState({ ['key']: this.sanitizeKey(value) });
    }
  };

  sanitizeKey = value => {
    return validator.whitelist(
      value
        .normalize('NFKD')
        .replace(/\s+/g, '-')
        .toLowerCase(),
      KEY_WHITELIST
    );
  };

  isValid = () => {
    return this.isNameValid() && this.isKeyValid();
  };

  isNameValid = () => {
    return this.state.name.length > 0 && this.state.name.length <= 128;
  };

  isKeyValid = () => {
    if (!validator.matches(this.state.key, `^[${KEY_WHITELIST}]*$`)) {
      return false;
    }
    return this.state.key.length > 0 && this.state.name.length <= 128;
  };

  render() {
    return (
      <Modal
        centered={true}
        show={true}
        animation={false}
        onHide={() => this.props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new toggle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="toggleName">
              <Form.Label>Toggle name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Enter text"
                onChange={this.handleChange}
                isValid={this.isNameValid()}
                isInvalid={!this.isNameValid()}
              />
              <Form.Control.Feedback />
            </Form.Group>
            <Form.Group controlId="toggleKey">
              <Form.Label>Toggle key</Form.Label>
              <Form.Control
                type="text"
                name="key"
                value={this.state.key}
                placeholder="Enter text"
                onChange={this.handleChange}
                onFocus={this.handleKeyFocus}
                isValid={this.isKeyValid()}
                isInvalid={!this.isKeyValid()}
              />
              <Form.Control.Feedback />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.hideModal()}>
            <BsX /> Cancel
          </Button>
          <Button
            active={true}
            variant="success"
            onClick={() => this.handleOkClick()}
          >
            <BsCheck /> Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(AddToggleModal);
