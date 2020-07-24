import produce from 'immer';
import * as actionTypes from '../actions/types';

const getStoreKey = (projectId, toggleKey) => {
  let storeKey = `${projectId}/${toggleKey}`;
  return storeKey;
};

// Read

export const getToggle = (state, projectId, toggleKey) => {
  let storeKey = getStoreKey(projectId, toggleKey);

  let toggle = null;
  let toggleState = null;
  let project = null;

  let toggleProjection = state.toggle.toggles[storeKey];
  if (toggleProjection) {
    toggle = toggleProjection.toggle;
  }

  if (!toggle) {
    return null;
  }

  let toggleStateProjection = state.toggle.toggleStates[storeKey];
  if (toggleStateProjection) {
    toggleState = toggleStateProjection.toggleState;
  }

  let projectProjection = state.project.projects[projectId];
  if (projectProjection) {
    project = projectProjection.project;
  }

  return {
    projectId: toggle.projectId,
    key: toggle.key,
    name: toggle.name,
    environments: getEnvironmentStates(project, toggleState),
    audit: getAudit(toggle),
  };
};

const getEnvironmentStates = (project, toggleState) => {
  if (!toggleState) {
    return [];
  }

  return toggleState.environmentStates.map((environmentState) =>
    getEnvironmentState(project, environmentState)
  );
};

const getEnvironmentState = (project, environmentState) => {
  let name = environmentState.key;
  if (project) {
    let environment = project.environments.find(
      (environment) => environment.key === environmentState.key
    );
    if (environment) {
      name = environment.name;
    }
  }

  return {
    key: environmentState.key,
    name: name,
    value: getStateValue(environmentState.value),
    updating: environmentState.updating,
    version: environmentState.version,
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

export const getIsToggleLoading = (state, projectId, toggleKey) => {
  let projection = state.toggle.toggles[getStoreKey(projectId, toggleKey)];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

export const getIsToggleStateLoading = (state, projectId, toggleKey) => {
  let projection = state.toggle.toggleStates[getStoreKey(projectId, toggleKey)];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

const getAudit = (toggle) => {
  if (!toggle) {
    return null;
  }

  return {
    created: toggle.audit.created,
    createdBy: toggle.audit.createdBy,
    lastModified: toggle.audit.lastModified,
    lastModifiedBy: toggle.audit.lastModifiedBy,
    version: toggle.audit.version,
  };
};

// Write

const INITIAL_STATE = {
  toggles: {},
  toggleStates: {},
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;
  let projection = undefined;

  switch (action.type) {
    case actionTypes.requestToggle:
      {
        storeKey = getStoreKey(action.projectId, action.toggleKey);
        let projection = draft.toggles[storeKey];
        if (!projection) {
          projection = {};
          draft.toggles[storeKey] = projection;
        }
        projection.isLoading = true;
      }
      break;

    case actionTypes.receiveToggle:
      storeKey = getStoreKey(action.projectId, action.toggleKey);
      draft.toggles[storeKey] = action.json;
      draft.toggles[storeKey].isLoading = false;
      break;

    case actionTypes.receiveToggleError:
      storeKey = getStoreKey(action.projectId, action.toggleKey);
      draft.toggles[storeKey].isLoading = false;
      break;

    case actionTypes.requestToggleState:
      storeKey = getStoreKey(action.projectId, action.toggleKey);
      projection = draft.toggleStates[storeKey];
      if (!projection) {
        projection = {};
        draft.toggleStates[storeKey] = projection;
      }
      projection.isLoading = true;
      break;

    case actionTypes.receiveToggleState:
      storeKey = getStoreKey(action.projectId, action.toggleKey);
      draft.toggleStates[storeKey] = action.json;
      draft.toggleStates[storeKey].isLoading = false;
      break;

    case actionTypes.receiveToggleStateError:
      storeKey = getStoreKey(action.projectId, action.toggleKey);
      draft.toggleStates[storeKey].isLoading = false;
      break;

    case actionTypes.toggleEnvironmentStateUpdateRequested:
      storeKey = getStoreKey(action.projectId, action.toggleKey);

      projection = draft.toggleStates[storeKey];
      if (projection) {
        let environmentState = projection.toggleState.environmentStates.find(
          (es) => {
            return es.key === action.environmentKey;
          }
        );

        environmentState.updating = true;
      }
      break;

    case actionTypes.toggleEnvironmentStateUpdateSucceeded:
      storeKey = getStoreKey(action.projectId, action.toggleKey);

      projection = draft.toggleStates[storeKey];
      if (projection) {
        projection.audit = undefined;

        let environmentState = projection.toggleState.environmentStates.find(
          (es) => {
            return es.key === action.environmentKey;
          }
        );

        environmentState.updating = false;
        environmentState.version = undefined;
        environmentState.value = action.value;
      }
      break;

    case actionTypes.toggleEnvironmentStateUpdateFailed:
      storeKey = getStoreKey(action.projectId, action.toggleKey);

      projection = draft.toggleStates[storeKey];
      if (projection) {
        let environmentState = projection.toggleState.environmentStates.find(
          (es) => {
            return es.key === action.environmentKey;
          }
        );

        environmentState.updating = false;
      }
      break;

    default:
      break;
  }
}, INITIAL_STATE);
