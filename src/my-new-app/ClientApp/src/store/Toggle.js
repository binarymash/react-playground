import produce from 'immer';
import { requestToggleType, receiveToggleType, receiveToggleErrorType } from '../actions/index';

const INITIAL_STATE = {
     toggle: null,
     isLoading: false,
     error: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestToggleType) {
      draft.isLoading = true;
      draft.error = false;
    }

    if (action.type === receiveToggleType) {
      draft.isLoading = false;
      draft.toggle = action.json;    
    }

    if (action.type === receiveToggleErrorType) {
      draft.isLoading = false;
      draft.error = true;
    }

  },
  INITIAL_STATE
)
