import { requestProjectType, receiveProjectType, receiveProjectErrorType } from '../actions/index';

const initialState = {
     requested: null,
     project: null,
     isLoading: false,
     error: false
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectType) {
    return {
      ...state,
      isLoading: true,
      error: false
    };
  }

  if (action.type === receiveProjectType) {
    return {
      ...state,   
      isLoading: false,
      project: action.json,      
    };
  }

  if (action.type === receiveProjectErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  return state;
};
