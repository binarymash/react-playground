import { requestEnvironmentType, receiveEnvironmentType, receiveEnvironmentErrorType } from '../actions/index';

const initialState = {
     environment: {
       definition: null,
       state: null
     },
     isLoading: false,
     error: false
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestEnvironmentType) {
    return {
      ...state,
      isLoading: true,
      error: false
    };
  }

  if (action.type === receiveEnvironmentType) {

    return {
      ...state,   
      isLoading: false,
      environment: {
        definition: action.defJson,
        state: action.stateJson
      }   
    };
  }

  if (action.type === receiveEnvironmentErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  return state;
};
