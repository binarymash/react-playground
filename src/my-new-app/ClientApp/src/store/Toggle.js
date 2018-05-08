import { requestToggleType, receiveToggleType, receiveToggleErrorType } from '../actions/index';

const initialState = {
     requested: null,
     toggle: null,
     isLoading: false,
     error: false
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestToggleType) {
    return {
      ...state,
      requested: action.r,
      isLoading: true
    };
  }

  if (action.type === receiveToggleType) {
    return {
      ...state,   
      requested: {projectId: action.json.projectId, toggleKey: action.json.key, version: action.json.version},
      toggle: action.json,
      isLoading: false
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
