import React, { Component } from 'react';
import { actionCreators } from '../../actions/creators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsX, BsCheck } from 'react-icons/bs';
import { v1 as uuidv1 } from 'uuid';

class AddAccessStrategyModal extends Component {
  handleOkClick = async (event) => {
    this.props.hideModal();
    await this.props.createClientAccessStrategyX509(
      this.props.projectId,
      uuidv1()
    );
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
          <Modal.Title>Add new X.509 certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will create a new X.509 certificate which you can use to
          authorize a trusted application. Do you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => this.props.hideModal()}
          >
            <BsX /> Cancel
          </Button>
          <Button variant="primary" onClick={() => this.handleOkClick()}>
            <BsCheck /> OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(AddAccessStrategyModal);
