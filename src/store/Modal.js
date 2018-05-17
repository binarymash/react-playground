import produce from 'immer';
import { showModal, hideModal } from '../actions/index';

// Read


// Write

const INITIAL_STATE = {
  modalType: null,
  modalProps: {}
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === showModal) {
      draft.modalType = action.modalType;
      draft.modalProps = action.modalProps;
    }

    if (action.type === hideModal) { 
      draft.modalType = INITIAL_STATE.modalType;
      draft.modalProps = INITIAL_STATE.modalProps;  
    }

  },
  INITIAL_STATE
)