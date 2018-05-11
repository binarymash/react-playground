import produce from 'immer'
import { requestEnvironmentType, receiveEnvironmentType, receiveEnvironmentErrorType } from '../actions/index';

const INITIAL_STATE = {
     environment: {
       definition: null,
       state: null
     },
     isLoading: false,
     error: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestEnvironmentType) {
      draft.isLoading = true;
      draft.error = false;
    }

    if (action.type === receiveEnvironmentType) {
      draft.isLoading = false;
      draft.environment.definition = action.defJson;
      draft.environment.state = action.stateJson;
    }

    if (action.type === receiveEnvironmentErrorType) {
        draft.isLoading = false;
        draft.error = true;
    } 

  },
  INITIAL_STATE
)
