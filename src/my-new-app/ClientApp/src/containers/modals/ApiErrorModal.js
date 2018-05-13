import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Glyphicon, Modal, Button } from 'react-bootstrap'
import { hideModal } from '../../actions/index';

class ApiErrorModal extends Component {

  render() {
    return (
      <Modal show={true} onHide={() => this.props.hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title><Glyphicon glyph='exclamation-sign'/> Server error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Something went wrong on the server. Please try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={() => this.props.hideModal()}>Acknowledge</Button>
        </Modal.Footer>
      </Modal> 
  )}
}

const mapStateToProps = (state) => {
  return { modal: state.modal };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(ApiErrorModal);
