import { requestEnvironmentType, receiveEnvironmentType, receiveEnvironmentErrorType } from '../actions/index';

const initialState = {
     requested: null,
     environment: null,
     isLoading: false,
     error: false
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestEnvironmentType) {
    return {
      ...state,
      requested: action.r,
      isLoading: true
    };
  }

  if (action.type === receiveEnvironmentType) {
    return {
      ...state,   
      requested: {projectId: action.json.projectId, environmentKey: action.json.key, version: action.json.version},
      environment: action.json,
      isLoading: false
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
