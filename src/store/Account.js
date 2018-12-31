import produce from 'immer';
import {
  initialised,
  requestAccountType,
  receiveAccountType,
  receiveAccountErrorType,
  projectAddSucceeded,
  projectDeleteSucceeded
} from '../actions/index';

const INITIAL_STATE = {
  projection: {
    account: {
      projects: []
    }
  },
  isLoading: false
};

export const getProjects = state => {
  return state.account.projection.account.projects.map(project => {
    return {
      id: project.id,
      name: project.name
    };
  });
};

export const getAudit = state => {
  return state.account.projection.account.audit;
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

    case requestAccountType:
      draft.isLoading = true;
      break;

    case receiveAccountType:
      draft.isLoading = false;
      draft.projection = action.json;
      break;

    case receiveAccountErrorType:
      draft.isLoading = false;
      break;

    case projectAddSucceeded:
      draft.projection.account.projects.push({
        id: action.id,
        name: action.name
      });
      break;

    case projectDeleteSucceeded:
      draft.projection.account.projects.splice(
        draft.projection.account.projects.findIndex(
          project => project.id === action.projectId
        ),
        1
      );
      break;
  }
}, INITIAL_STATE);
