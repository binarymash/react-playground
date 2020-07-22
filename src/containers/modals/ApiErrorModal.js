import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationTriangle } from 'react-icons/bs';

class ApiErrorModal extends Component {
  render() {
    let contents = this.GetContents(this.props.error);

    return (
      <Modal
        show={true}
        animation={false}
        onHide={() => this.props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BsExclamationTriangle /> {contents.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{contents.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.props.hideModal()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  GetContents = error => {
    switch (error) {
      case '400':
        return {
          title: 'Change rejected',
          message:
            'Your request was rejected by the server because it failed validation.'
        };
      case '409':
        return {
          title: 'Change conflict',
          message:
            'It looks like someone has already made changes to this data, so your changes have not been applied.'
        };
      default:
        return {
          title: 'Server error',
          message: 'Something went wrong on the server. Please try again.'
        };
    }
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(ApiErrorModal);
