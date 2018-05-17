import produce from 'immer';
import { requestToggleType, receiveToggleType, receiveToggleErrorType } from '../actions/index';

const getStoreKey = (projectId, toggleKey) => {
  let storeKey = `${projectId}/${toggleKey}`;
  return storeKey;
}

// Read

export const getToggle = (state, projectId, toggleKey) => {
  let toggle = state.toggle.toggles[getStoreKey(projectId, toggleKey)];

  if (!toggle) {
    return null;
  }

  return {
    projectId: toggle.projectId,
    key: toggle.key,
    name: toggle.name,
    audit: getAudit(toggle)
  };
}

export const getIsToggleLoading = (state, projectId, toggleKey) => {
  return state.toggle.togglesLoading[getStoreKey(projectId, toggleKey)] === true;
}

const getAudit = (toggle) => {
  if (!toggle) {
    return null;
  }

  return {
    created: toggle.created,
    createdBy: toggle.createdBy,
    lastModified: toggle.lastModified,
    lastModifiedBy: toggle.lastModifiedBy,
    version: toggle.version
  }
}

// Write

const INITIAL_STATE = {
     toggles: {},
     togglesLoading:{}
};

export const reducer = produce((draft, action) => {
    switch(action.type){

      case requestToggleType: {
          let storeKey = getStoreKey(action.projectId, action.toggleKey);      
          draft.togglesLoading[storeKey] = true;
        }
        break;

      case receiveToggleType: {
          let storeKey = getStoreKey(action.projectId, action.toggleKey);  
          draft.toggles[storeKey] = action.json;    
          draft.togglesLoading[storeKey] = undefined;  
        }
        break;

      case receiveToggleErrorType: {
          let storeKey = getStoreKey(action.projectId, action.toggleKey);      
          draft.togglesLoading[storeKey] = undefined;
        }
        break;

      }
  },
  INITIAL_STATE
)
