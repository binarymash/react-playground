import { requestToggleType, receiveToggleType, receiveToggleErrorType } from '../actions/index';

const initialState = {
     toggle: null,
     isLoading: false,
     error: false
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestToggleType) {
    return {
      ...state,
      isLoading: true,
      error: false
    };
  }

  if (action.type === receiveToggleType) {
    return {
      ...state,   
      isLoading: false,
      toggle: action.json    
    };
  }

  if (action.type === receiveToggleErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  
  return state;
};
