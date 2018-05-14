import produce from 'immer';
import { 
  requestProjectType, receiveProjectType, receiveProjectErrorType, 
  toggleAddSucceeded, toggleDeleteSucceeded,
  environmentAddSucceeded, environmentDeleteSucceeded } from '../actions/index';

// Read

export const getIsLoading = (state) => {
  return state.project.isLoading;
}

export const getIsErrored = (state) => {
  return state.project.isErrored;
}

export const getProject = (state) => {
  if (!state.project.project) {
    return null;
  }

  return {
    id: state.project.project.id,
    name: state.project.project.name,
    environments: getEnvironments(state),
    toggles: getToggles(state),
    audit: getAudit(state)
  }
}

const getEnvironments = (state) => {
  if (!state.project.project.environments) {
    return [];
  }

  return state.project.project.environments.map(environment => getEnvironment(state.project.project.id, environment));
}

const getEnvironment = (projectId, environment) => {
  return {
    projectId: projectId,
    key: environment.key
  }
}

const getToggles = (state) => {
  if (!state.project.project.toggles) {
    return [];
  }

  return state.project.project.toggles.map(toggle => getToggle(state.project.project.id, toggle));
}

const getToggle = (projectId, toggle) => {
  return {
    projectId: projectId,
    key: toggle.key,
    name: toggle.name
  }
}

const getAudit = (state) => {
  if (!state.project.project) {
    return null;
  }

  return {
    created: state.project.project.created,
    createdBy: state.project.project.createdBy,
    lastModified: state.project.project.lastModified,
    lastModifiedBy: state.project.project.lastModifiedBy,
    version: state.project.project.version
  }
}

// Write

const INITIAL_STATE = {
  project: null,
  isLoading: false,
  error: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestProjectType) {
      draft.isLoading = true;
      draft.error = false;
    }

    if (action.type === receiveProjectType) { 
      draft.isLoading = false;
      draft.project = action.json;      
    }

    if (action.type === receiveProjectErrorType) {
        draft.isLoading = false;
        draft.error = true;
    }

    if (action.type === toggleAddSucceeded) {
      draft.project.toggles.push({
        'key': action.toggleKey,
        'name': action.toggleName,
      });
      draft.project.version = action.version;
    }

    if (action.type === toggleDeleteSucceeded) {
      draft.project.toggles.splice(draft.project.toggles.findIndex(toggle => toggle.key === action.toggleKey), 1);
      draft.project.version = action.version;
    }

    if (action.type === environmentAddSucceeded) {
      draft.project.environments.push({
        'key': action.environmentKey,
      });
      draft.project.version = action.version;
    }

    if (action.type === environmentDeleteSucceeded) {
      draft.project.environments.splice(draft.project.environments.findIndex(environment => environment.key === action.environmentKey), 1);
      draft.project.version = action.version;
    }    

  },
  INITIAL_STATE
)