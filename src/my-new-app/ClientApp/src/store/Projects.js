import { requestProjectsType, receiveProjectsType, receiveProjectsErrorType } from '../actions/index';

const initialState = { 
  projectList: [], 
  isLoading: false,
  error: true
};

export const getProjectList = (state) => {
  return state.projects.projectList.map(project => {
    return {
      id: project.id,
      name: project.name
    }
  });
}

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectsType) {
    return {
      ...state,
      isLoading: true,
      isError: false
    };
  }

  if (action.type === receiveProjectsType) {
    return {
      ...state,
      isLoading: false,
      projectList: action.json.projects,
      version: action.json.version,
      lastModified: action.json.lastModified,
      lastModifiedBy: action.json.lastModifiedBy,
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
