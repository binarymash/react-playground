import { requestProjectsType, receiveProjectsType, receiveProjectsErrorType } from '../actions/index';

const initialState = { 
  projects: [], 
  isLoading: false,
  error: true
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveProjectsType) {
    return {
      ...state,
      projects: action.json.projects,
      version: action.json.version,
      lastModified: action.json.lastModified,
      lastModifiedBy: action.json.lastModifiedBy,
      isLoading: false,
      error: false
    };
  }

  if (action.type === receiveProjectsErrorType) {
    return {
      ...state,
      isLoading: false,
      error: true
    };
  }

  return state;
};
