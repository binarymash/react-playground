import produce from 'immer';
import {
  initialised,
  requestProjectsType,
  receiveProjectsType,
  receiveProjectsErrorType,
  projectAddSucceeded,
  projectDeleteSucceeded
} from '../actions/index';

const INITIAL_STATE = {
  projectList: [],
  isLoading: false
};

export const getProjectList = state => {
  return state.account.projectList.map(project => {
    return {
      id: project.id,
      name: project.name
    };
  });
};

export const getIsInitialised = state => {
  return state.account.isInitialised === true;
};

export const getIsLoading = state => {
  return state.account.isLoading === true;
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case initialised:
      draft.isInitialised = true;
      break;

    case requestProjectsType:
      draft.isLoading = true;
      break;

    case receiveProjectsType:
      draft.isLoading = false;
      draft.projectList = action.json.projects;
      break;

    case receiveProjectsErrorType:
      draft.isLoading = false;
      break;

    case projectAddSucceeded:
      draft.projectList.push({
        id: action.id,
        name: action.name
      });
      break;

    case projectDeleteSucceeded:
      draft.projectList.splice(
        draft.projectList.findIndex(project => project.id === action.projectId),
        1
      );
      break;
  }
}, INITIAL_STATE);
