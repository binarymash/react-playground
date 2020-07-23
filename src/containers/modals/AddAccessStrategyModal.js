import React, { Component } from 'react';
import { actionCreators } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsX, BsCheck } from 'react-icons/bs';

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
          <Button onClick={() => this.props.hideModal()}>
            <BsX /> Cancel
          </Button>
          <Button variant="success" onClick={() => this.handleOkClick()}>
            <BsCheck /> OK
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
