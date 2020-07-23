import produce from 'immer';
import * as actionTypes from '../actions/types';

// Read

// Write

const INITIAL_STATE = {
  modalType: null,
  modalProps: {}
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.showModal:
      draft.modalType = action.modalType;
      draft.modalProps = action.modalProps;
      break;

    case actionTypes.hideModal:
      draft.modalType = INITIAL_STATE.modalType;
      draft.modalProps = INITIAL_STATE.modalProps;
      break;

    default:
      break;
  }
}, INITIAL_STATE);
