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
      requested: action.p,
      isLoading: true
    };
  }

  if (action.type === receiveProjectType) {
    return {
      ...state,   
      requested: {id: action.json.id, version: action.json.version},
      project: action.json,
      isLoading: false
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
