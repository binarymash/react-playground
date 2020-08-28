import produce from 'immer';
import * as actions from '../actions/actions';

// Read

// Write

const INITIAL_STATE = {
  modalType: null,
  modalProps: {},
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL:
      draft.modalType = action.modalType;
      draft.modalProps = action.modalProps;
      break;

    case actions.HIDE_MODAL:
      draft.modalType = INITIAL_STATE.modalType;
      draft.modalProps = INITIAL_STATE.modalProps;
      break;

    default:
      break;
  }
}, INITIAL_STATE);
