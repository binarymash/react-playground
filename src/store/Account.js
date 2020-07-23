import produce from 'immer';
import * as actionTypes from '../actions/types';

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
    case actionTypes.initialised:
      draft.isInitialised = true;
      break;

    case actionTypes.requestAccount:
      draft.isLoading = true;
      break;

    case actionTypes.receiveAccount:
      draft.isLoading = false;
      draft.projection = action.json;
      break;

    case actionTypes.receiveAccountError:
      draft.isLoading = false;
      break;

    case actionTypes.projectAddSucceeded:
      draft.projection.account.projects.push({
        id: action.id,
        name: action.name
      });

      updateAudit(draft.projection);
      break;

    case actionTypes.projectDeleteSucceeded:
      draft.projection.account.projects.splice(
        draft.projection.account.projects.findIndex(
          project => project.id === action.projectId
        ),
        1
      );

      updateAudit(draft.projection);
      break;

    default:
      break;
  }
}, INITIAL_STATE);

const updateAudit = projection => {
  projection.audit = undefined;
  projection.account.audit.lastModified = undefined;
  projection.account.audit.lastModifiedBy = undefined;
  projection.account.audit.version = undefined;
};
