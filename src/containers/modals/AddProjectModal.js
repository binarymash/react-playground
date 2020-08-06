import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsX, BsCheck } from 'react-icons/bs';

class AddProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleOkClick = (event) => {
    if (this.isValid()) {
      this.props.hideModal().then(() => {
        this.props.addProject(this.state.name);
      });
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  isValid = () => {
    return this.isNameValid();
  };

  isNameValid = () => {
    return this.state.name.length > 0 && this.state.name.length <= 128;
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
          <Modal.Title>Add new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Project name</Form.Label>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => this.props.hideModal()}
          >
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(AddProjectModal);
