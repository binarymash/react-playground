import produce from 'immer';
import * as actions from '../actions/actions';

const getStoreKey = (projectId, environmentKey) => {
  let storeKey = `${projectId}/${environmentKey}`;
  return storeKey;
};

// Read

export const getIsEnvironmentLoading = (state, projectId, environmentKey) => {
  let storeKey = getStoreKey(projectId, environmentKey);
  let projection = state.environment.environments[storeKey];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

export const getIsEnvironmentStateLoading = (
  state,
  projectId,
  environmentKey
) => {
  let storeKey = getStoreKey(projectId, environmentKey);
  let projection = state.environment.environmentStates[storeKey];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

export const getEnvironment = (state, projectId, environmentKey) => {
  let storeKey = getStoreKey(projectId, environmentKey);

  let environment = null;
  let environmentState = null;
  let project = null;

  let environmentProjection = state.environment.environments[storeKey];
  if (environmentProjection) {
    environment = environmentProjection.environment;
  }

  if (!environment) {
    return null;
  }

  let environmentStateProjection =
    state.environment.environmentStates[storeKey];
  if (environmentStateProjection) {
    environmentState = environmentStateProjection.environmentState;
  }

  let projectProjection = state.project.projects[projectId];
  if (projectProjection) {
    project = projectProjection.project;
  }

  return {
    key: environment.key,
    name: environment.name,
    toggles: getToggleStates(project, environmentState),
    audit: getAudit(environment, environmentState),
  };
};

const getToggleStates = (project, environmentState) => {
  if (!environmentState) {
    return [];
  }

  return environmentState.toggleStates.map((toggleState) =>
    getToggleState(project, toggleState)
  );
};

const getToggleState = (project, toggleState) => {
  let name = toggleState.key;
  if (project) {
    let toggle = project.toggles.find(
      (toggle) => toggle.key === toggleState.key
    );
    if (toggle) {
      name = toggle.name;
    }
  }

  return {
    key: toggleState.key,
    name: name,
    value: getStateValue(toggleState.value),
    updating: toggleState.updating,
    version: toggleState.version,
  };
};

const getStateValue = (value) => {
  if (value === 'True') {
    return true;
  }

  if (value === 'False') {
    return false;
  }

  return null;
};

const getAudit = (environment, environmentState) => {
  if (!environment) {
    return null;
  }

  return {
    created: environment.audit.created,
    createdBy: environment.audit.createdBy,
    lastModified: environment.audit.lastModified,
    lastModifiedBy: environment.audit.lastModifiedBy,
  };
};

// Write

const INITIAL_STATE = {
  environments: {},
  environmentStates: {},
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;
  let projection = undefined;

  switch (action.type) {
    case actions.REQUEST_ENVIRONMENT:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      projection = draft.environments[storeKey];
      if (!projection) {
        projection = {};
        draft.environments[storeKey] = projection;
      }
      projection.isLoading = true;
      break;

    case actions.RECEIVE_ENVIRONMENT:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environments[storeKey] = action.data;
      draft.environments[storeKey].isLoading = false;
      break;

    case actions.RECEIVE_ENVIRONMENT_ERROR:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environments[storeKey].isLoading = false;
      break;

    case actions.REQUEST_ENVIRONMENT_STATE:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      projection = draft.environmentStates[storeKey];
      if (!projection) {
        projection = {};
        draft.environmentStates[storeKey] = projection;
      }
      projection.isLoading = true;
      break;

    case actions.RECEIVE_ENVIRONMENT_STATE:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environmentStates[storeKey] = action.data;
      draft.environmentStates[storeKey].isLoading = false;
      break;

    case actions.RECEIVE_ENVIRONMENT_STATE_ERROR:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environmentStates[storeKey].isLoading = false;
      break;

    case actions.TOGGLE_ENVIRONMENT_STATE_UPDATE_REQUESTED:
      storeKey = getStoreKey(action.projectId, action.environmentKey);

      projection = draft.environmentStates[storeKey];
      if (projection) {
        let toggleState = projection.environmentState.toggleStates.find(
          (ts) => {
            return ts.key === action.toggleKey;
          }
        );

        toggleState.updating = true;
      }
      break;

    case actions.TOGGLE_ENVIRONMENT_STATE_UPDATE_SUCCEEDED:
      storeKey = getStoreKey(action.projectId, action.environmentKey);

      projection = draft.environmentStates[storeKey];
      if (projection) {
        projection.audit = undefined;

        let toggleState = projection.environmentState.toggleStates.find(
          (ts) => {
            return ts.key === action.toggleKey;
          }
        );

        toggleState.updating = false;
        toggleState.version = undefined;
        toggleState.value = action.value;
      }
      break;

    case actions.TOGGLE_ENVIRONMENT_STATE_UPDATE_FAILED:
      storeKey = getStoreKey(action.projectId, action.environmentKey);

      projection = draft.environmentStates[storeKey];
      if (projection) {
        let toggleState = projection.environmentState.toggleStates.find(
          (ts) => {
            return ts.key === action.toggleKey;
          }
        );

        toggleState.updating = false;
      }
      break;

    default:
      break;
  }
}, INITIAL_STATE);
