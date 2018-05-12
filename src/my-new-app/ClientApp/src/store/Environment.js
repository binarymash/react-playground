import produce from 'immer';
import { requestEnvironmentType, receiveEnvironmentType, receiveEnvironmentErrorType, toggleStateUpdateSucceeded, toggleStateUpdateFailed } from '../actions/index';

// Read

export const getIsLoading = (state) => {
  return state.environment.isLoading;
}

export const getIsErrored = (state) => {
  return state.environment.isErrored;
}

export const getEnvironment = (state) => {
  if (!state.environment.environment) {
    return null;
  }

  return {
    key: state.environment.environment.key,
    toggles: getToggleStates(state),
    audit: getAudit(state)
  }
}

const getToggleStates = (state) => {
  if (!state.environment.environmentState) {
    return [];
  }

  return state.environment.environmentState.toggleStates.map(toggleState => getToggleState(toggleState));
}

const getToggleState = (toggleState) => {
  return {
    key: toggleState.key,
    value: getToggleStateValue(toggleState.value),
    version: toggleState.version
  }
}

const getToggleStateValue = (value) => {
  if (value === "True"){
    return true;
  }

  if (value === "False"){
    return false;
  }

  return null;
}

const getAudit = (state) => {
  if (!state.environment.environmentState) {
    return null;
  }

  return {
    created: state.environment.environmentState.created,
    createdBy: state.environment.environmentState.createdBy,
    lastModified: state.environment.environmentState.lastModified,
    lastModifiedBy: state.environment.environmentState.lastModifiedBy,
    version: state.environment.environmentState.version
  }
}

// Write

const INITIAL_STATE = {
  environment: null,
  environmentState: null,
  isLoading: false,
  isErrored: false
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestEnvironmentType) {
      draft.isLoading = true;
      draft.isErrored = false;
    }

    if (action.type === receiveEnvironmentType) {
      draft.isLoading = false;
      draft.environment = action.defJson;
      draft.environmentState = action.stateJson;
    }

    if (action.type === receiveEnvironmentErrorType) {
        draft.isLoading = false;
        draft.isErrored = true;
    } 

    if (action.type === toggleStateUpdateSucceeded) {
      draft.isErrored = true;
      let toggleState = draft.environmentState.toggleStates.find(ts => { return ts.key === action.toggleKey;});
      toggleState.version = action.version;
      toggleState.value = action.value;
    }

    if (action.type === toggleStateUpdateFailed) {
      draft.isErrored = true;
    }
    
  },
  {
    environment: null,
    environmentState: null,
    isLoading: false,
    isErrored: false
  }
)
