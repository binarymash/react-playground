import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationCircle, BsX, BsCheck } from 'react-icons/bs';

class DeleteAccessStrategyModal extends Component {
  handleOkClick = () => {
    this.props.hideModal().then(() => {
      this.props.deleteEnvironment(
        this.props.projectId,
        this.props.environmentKey
      );
    });
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
            <BsExclamationCircle /> Confirm environment deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This will remove the environment from this project. Do you want to
            continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button active={true} onClick={() => this.props.hideModal()}>
            <BsX /> No, keep the environment
          </Button>
          <Button variant="danger" onClick={() => this.handleOkClick()}>
            <BsCheck /> Yes, delete the environment
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(DeleteAccessStrategyModal);
