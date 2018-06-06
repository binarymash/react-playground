import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Glyphicon, Modal, Button } from 'react-bootstrap';
import { hideModal } from '../../actions/index';

class DeleteProjectModal extends Component {
  handleOkClick = () => {
    this.props.hideModal().then(() => {
      this.props.deleteProject(this.props.projectId);
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
            <Glyphicon glyph="exclamation-sign" /> Confirm project deletion
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
            <Glyphicon glyph="remove" /> No, keep the project
          </Button>
          <Button bsStyle="danger" onClick={() => this.handleOkClick()}>
            <Glyphicon glyph="ok" /> Yes, delete the project
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteProjectModal);
