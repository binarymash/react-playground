import { requestEnvironmentType, receiveEnvironmentType, receiveEnvironmentErrorType } from '../actions/index';

const initialState = {
     environment: null,
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
      environment: action.json,      
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
