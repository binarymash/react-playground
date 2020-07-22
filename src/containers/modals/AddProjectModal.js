import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsX, BsCheck } from 'react-icons/bs';
import { hideModal } from '../../actions/index';

class AddProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }

  handleOkClick = event => {
    if (this.isValid()) {
      this.props.hideModal().then(() => {
        this.props.addProject(this.state.name);
      });
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  isValid = () => {
    return this.getNameValidationState() === 'success';
  };

  getNameValidationState = () => {
    if (this.state.name.length === 0 || this.state.name.length > 128) {
      return 'error';
    }
    return 'success';
  };

  render() {
    return (
      <Modal
        size="lg"
        centered={true}
        show={true}
        animation={false}
        onHide={() => this.props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="projectName"
              validationState={this.getNameValidationState()}
            >
              <FormLabel>Project name</FormLabel>
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
          </form>
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

export default connect(null, mapDispatchToProps)(AddProjectModal);
