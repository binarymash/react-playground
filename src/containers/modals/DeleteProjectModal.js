import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationCircle, BsX, BsCheck } from 'react-icons/bs';

class DeleteProjectModal extends Component {
  handleOkClick = () => {
    this.props.hideModal().then(() => {
      this.props.deleteProject(this.props.projectId);
    });
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
          <Modal.Title>
            <BsExclamationCircle /> Confirm project deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This will remove the project and all associated toggles and
            environments. Do you want to continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button active={true} onClick={() => this.props.hideModal()}>
            <BsX /> No, keep the project
          </Button>
          <Button variant="danger" onClick={() => this.handleOkClick()}>
            <BsCheck /> Yes, delete the project
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(DeleteProjectModal);
