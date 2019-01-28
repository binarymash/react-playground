import produce from 'immer';
import * as actionTypes from '../actions/types';

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
    audit: getAudit(environment, environmentState)
  };
};

const getToggleStates = (project, environmentState) => {
  if (!environmentState) {
    return [];
  }

  return environmentState.toggleStates.map(toggleState =>
    getToggleState(project, toggleState)
  );
};

const getToggleState = (project, toggleState) => {
  let name = toggleState.key;
  if (project) {
    let toggle = project.toggles.find(toggle => toggle.key === toggleState.key);
    if (toggle) {
      name = toggle.name;
    }
  }

  return {
    key: toggleState.key,
    name: name,
    value: getStateValue(toggleState.value),
    version: toggleState.version
  };
};

const getStateValue = value => {
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
    lastModifiedBy: environment.audit.lastModifiedBy
  };
};

// Write

const INITIAL_STATE = {
  environments: {},
  environmentStates: {}
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;
  let projection = undefined;

  switch (action.type) {
    case actionTypes.requestEnvironment:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      projection = draft.environments[storeKey];
      if (!projection) {
        projection = {};
        draft.environments[storeKey] = projection;
      }
      projection.isLoading = true;
      break;

    case actionTypes.receiveEnvironment:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environments[storeKey] = action.json;
      draft.environments[storeKey].isLoading = false;
      break;

    case actionTypes.receiveEnvironmentError:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environments[storeKey].isLoading = false;
      break;

    case actionTypes.requestEnvironmentState:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      projection = draft.environmentStates[storeKey];
      if (!projection) {
        projection = {};
        draft.environmentStates[storeKey] = projection;
      }
      projection.isLoading = true;
      break;

    case actionTypes.receiveEnvironmentState:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environmentStates[storeKey] = action.json;
      draft.environmentStates[storeKey].isLoading = false;
      break;

    case actionTypes.receiveEnvironmentStateError:
      storeKey = getStoreKey(action.projectId, action.environmentKey);
      draft.environmentStates[storeKey].isLoading = false;
      break;

    case actionTypes.toggleEnvironmentStateUpdateSucceeded:
      storeKey = getStoreKey(action.projectId, action.environmentKey);

      projection = draft.environmentStates[storeKey];
      if (projection) {
        projection.audit = undefined;

        let toggleState = projection.environmentState.toggleStates.find(ts => {
          return ts.key === action.toggleKey;
        });

        toggleState.version = undefined;
        toggleState.value = action.value;
      }
      break;
  }
}, INITIAL_STATE);
