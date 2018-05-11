import produce from 'immer';
import { requestProjectType, receiveProjectType, receiveProjectErrorType } from '../actions/index';

const INITIAL_STATE = {
  project: null,
  isLoading: false,
  error: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestProjectType) {
      draft.isLoading = true;
      draft.error = false;
    }

    if (action.type === receiveProjectType) { 
      draft.isLoading = false;
      draft.project = action.json;      
    }

    if (action.type === receiveProjectErrorType) {
        draft.isLoading = false;
        draft.error = true;
    }

  },
  INITIAL_STATE
)