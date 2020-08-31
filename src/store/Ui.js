import produce from 'immer';
import * as actions from '../actions/actions';

const INITIAL_STATE = {};

export const getActiveProjectId = (state) => {
  return state.ui.selectedProjectId;
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
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
