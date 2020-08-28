import produce from 'immer';
import * as actions from '../actions/types';

const INITIAL_STATE = {
  projection: {
    account: {
      projects: [],
    },
  },
  isLoading: false,
};

export const getProjects = (state) => {
  return state.account.projection.account.projects.map((project) => {
    return {
      id: project.id,
      name: project.name,
    };
  });
};

export const getAudit = (state) => {
  return state.account.projection.account.audit;
};

export const getIsInitialised = (state) => {
  return state.account.isInitialised === true;
};

export const getIsLoading = (state) => {
  return state.account.isLoading === true;
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case actions.INITIALISED:
      draft.isInitialised = true;
      break;

    case action.REQUEST_ACCOUNT:
      draft.isLoading = true;
      break;

    case actions.RECEIVE_ACCOUNT:
      draft.isLoading = false;
      draft.projection = action.data;
      break;

    case actions.RECEIVE_ACCOUNT_ERROR:
      draft.isLoading = false;
      break;

    case actions.PROJECT_ADD_SUCCEEDED:
      draft.projection.account.projects.push({
        id: action.id,
        name: action.name,
      });

      updateAudit(draft.projection);
      break;

    case actions.PROJECT_DELETE_SUCCEEDED:
      draft.projection.account.projects.splice(
        draft.projection.account.projects.findIndex(
          (project) => project.id === action.projectId
        ),
        1
      );

      updateAudit(draft.projection);
      break;

    default:
      break;
  }
}, INITIAL_STATE);

const updateAudit = (projection) => {
  projection.audit = undefined;
  projection.account.audit.lastModified = undefined;
  projection.account.audit.lastModifiedBy = undefined;
  projection.account.audit.version = undefined;
};
