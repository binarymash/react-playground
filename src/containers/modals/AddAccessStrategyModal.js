import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  Glyphicon,
  Modal,
  Button
} from 'react-bootstrap';
import { hideModal } from '../../actions/index';

class AddAccessStrategyModal extends Component {
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
        this.props.addClientAccessStrategyX509(this.props.projectId);
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

  isValid = () => {
    return true;
  };

  render() {
    return (
      <Modal
        show={true}
        animation={false}
        onHide={() => this.props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Glyphicon glyph="exclamation-plus" /> Add new X509 certificate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <FormGroup
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
            <FormGroup
              controlId="toggleKey"
              validationState={this.getKeyValidationState()}
            >
              <ControlLabel>Toggle key</ControlLabel>
              <FormControl
                type="text"
                name="key"
                value={this.state.key}
                placeholder="Enter text"
                onChange={this.handleChange}
                onFocus={this.handleKeyFocus}
              />
              <FormControl.Feedback />
            </FormGroup> */}
            This will create a new X509 certificate which you can use to
            authorize a trusted application. Do you want to continue?
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.hideModal()}>
            <Glyphicon glyph="remove" /> Cancel
          </Button>
          <Button
            active={true}
            bsStyle="success"
            onClick={() => this.handleOkClick()}
          >
            <Glyphicon glyph="ok" /> OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(AddAccessStrategyModal);
