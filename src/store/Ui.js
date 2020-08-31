import produce from 'immer';
import * as actions from '../actions/actions';

const INITIAL_STATE = {
  modalType: null,
  modalProps: {},
  selectingProjectId: null,
  selectedProjectId: null,
};

export const getActiveProjectId = (state) => {
  return state.ui.selectedProjectId;
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

    case actions.SELECT_PROJECT_REQUESTED:
      draft.selectingProjectId = action.projectId;
      break;

    case actions.SELECT_PROJECT_SUCCEEDED:
      draft.selectingProjectId = undefined;
      draft.selectedProjectId = action.projectId;
      break;

    case actions.SELECT_PROJECT_FAILED:
      draft.selectingProjectId = undefined;
      break;

    default:
      break;
  }
}, INITIAL_STATE);
