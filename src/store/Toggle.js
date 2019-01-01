import produce from 'immer';
import * as actionTypes from '../actions/types';

const getStoreKey = (projectId, toggleKey) => {
  let storeKey = `${projectId}/${toggleKey}`;
  return storeKey;
};

// Read

export const getToggle = (state, projectId, toggleKey) => {
  let toggle = null;
  let toggleProjection =
    state.toggle.toggles[getStoreKey(projectId, toggleKey)];
  if (toggleProjection) {
    toggle = toggleProjection.toggle;
  }

  if (!toggle) {
    return null;
  }

  return {
    projectId: toggle.projectId,
    key: toggle.key,
    name: toggle.name,
    audit: getAudit(toggle)
  };
};

export const getIsToggleLoading = (state, projectId, toggleKey) => {
  let projection = state.toggle.toggles[getStoreKey(projectId, toggleKey)];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

const getAudit = toggle => {
  if (!toggle) {
    return null;
  }

  return {
    created: toggle.audit.created,
    createdBy: toggle.audit.createdBy,
    lastModified: toggle.audit.lastModified,
    lastModifiedBy: toggle.audit.lastModifiedBy,
    version: toggle.audit.version
  };
};

// Write

const INITIAL_STATE = {
  toggles: {}
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;

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
      {
        storeKey = getStoreKey(action.projectId, action.toggleKey);
        draft.toggles[storeKey] = action.json;
        draft.toggles[storeKey].isLoading = false;
      }
      break;

    case actionTypes.receiveToggleError:
      {
        storeKey = getStoreKey(action.projectId, action.toggleKey);
        draft.toggles[storeKey].isLoading = false;
      }
      break;
  }
}, INITIAL_STATE);
