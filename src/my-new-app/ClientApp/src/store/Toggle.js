import produce from 'immer';
import { requestToggleType, receiveToggleType, receiveToggleErrorType } from '../actions/index';

// Read

export const getToggle = (state) => {
  let toggle = state.toggle.toggle;

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
     toggle: null,
     isLoading: false,
     error: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestToggleType) {
      draft.isLoading = true;
      draft.error = false;
    }

    if (action.type === receiveToggleType) {
      draft.isLoading = false;
      draft.toggle = action.json;    
    }

    if (action.type === receiveToggleErrorType) {
      draft.isLoading = false;
      draft.error = true;
    }

  },
  INITIAL_STATE
)
