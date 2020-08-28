import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalTypes from './types';
import ApiErrorModal from './ApiErrorModal';
import AddProjectModal from './AddProjectModal';
import DeleteProjectModal from './DeleteProjectModal';
import AddEnvironmentModal from './AddEnvironmentModal';
import DeleteEnvironmentModal from './DeleteEnvironmentModal';
import AddToggleModal from './AddToggleModal';
import DeleteToggleModal from './DeleteToggleModal';
import AddAccessStrategyModal from './AddAccessStrategyModal';
import DeleteAccessStrategyModal from './DeleteAccessStrategyModal';
import './modal.css';

class ModalRoot extends Component {
  render() {
    if (!this.props.modalType) {
      return null;
    }

    const SpecificModal = MODAL_COMPONENTS[this.props.modalType];
    return (
      <SpecificModal className="modal-container" {...this.props.modalProps} />
    );
  }
}

const mapStateToProps = (state) => {
  return state.modal;
};

let MODAL_COMPONENTS = {};
MODAL_COMPONENTS[modalTypes.API_ERROR] = ApiErrorModal;
MODAL_COMPONENTS[modalTypes.ADD_PROJECT] = AddProjectModal;
MODAL_COMPONENTS[modalTypes.DELETE_PROJECT] = DeleteProjectModal;
MODAL_COMPONENTS[modalTypes.ADD_ENVIRONMENT] = AddEnvironmentModal;
MODAL_COMPONENTS[modalTypes.DELETE_ENVIRONMENT] = DeleteEnvironmentModal;
MODAL_COMPONENTS[modalTypes.ADD_TOGGLE] = AddToggleModal;
MODAL_COMPONENTS[modalTypes.DELETE_TOGGLE] = DeleteToggleModal;
MODAL_COMPONENTS[modalTypes.ADD_ACCESS_STRATEGY] = AddAccessStrategyModal;
MODAL_COMPONENTS[modalTypes.DELETE_ACCESS_STRATEGY] = DeleteAccessStrategyModal;

export default connect(mapStateToProps)(ModalRoot);
