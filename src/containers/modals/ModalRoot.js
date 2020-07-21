import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => {
  return state.modal;
};

const MODAL_COMPONENTS = {
  API_ERROR: ApiErrorModal,
  ADD_PROJECT: AddProjectModal,
  DELETE_PROJECT: DeleteProjectModal,
  ADD_ENVIRONMENT: AddEnvironmentModal,
  DELETE_ENVIRONMENT: DeleteEnvironmentModal,
  ADD_TOGGLE: AddToggleModal,
  DELETE_TOGGLE: DeleteToggleModal,
  ADD_ACCESS_STRATEGY: AddAccessStrategyModal,
  DELETE_ACCESS_STRATEGY: DeleteAccessStrategyModal
};

export default connect(mapStateToProps)(ModalRoot);
