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
      this.props.deleteClientAccesStrategyX509(
        this.props.projectId,
        this.props.strategyId
      );
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
            <BsExclamationCircle /> Confirm X.509 certificate deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This will remove the X.509 from this project. Any clients using this
            certificate will lose access. Do you want to continue?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => this.props.hideModal()}
          >
            <BsX /> No, keep the certificate
          </Button>
          <Button variant="danger" onClick={() => this.handleOkClick()}>
            <BsCheck /> Yes, delete the certificate
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(DeleteAccessStrategyModal);
