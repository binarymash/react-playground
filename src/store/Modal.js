import produce from 'immer';
import { showModal, hideModal } from '../actions/index';

// Read

// Write

const INITIAL_STATE = {
  modalType: null,
  modalProps: {}
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case showModal:
      draft.modalType = action.modalType;
      draft.modalProps = action.modalProps;
      break;

    case hideModal:
      draft.modalType = INITIAL_STATE.modalType;
      draft.modalProps = INITIAL_STATE.modalProps;
      break;
  }
}, INITIAL_STATE);
