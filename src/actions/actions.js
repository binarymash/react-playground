export const INITIALISED = 'INITIALISED';
export const initialised = () => {
  return {
    type: INITIALISED,
  };
};

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const requestAccount = () => {
  return {
    type: REQUEST_ACCOUNT,
  };
};

export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT';
export const receiveAccount = (account) => {
  return {
    type: RECEIVE_ACCOUNT,
    data: account,
  };
};

export const RECEIVE_ACCOUNT_ERROR = 'RECEIVE_ACCOUNT_ERROR';
export const receiveAccountError = (error) => {
  return {
    type: RECEIVE_ACCOUNT_ERROR,
    error,
  };
};

export const REQUEST_PROJECT = 'REQUEST_PROJECT';
export const requestProject = (projectId) => {
  return {
    type: REQUEST_PROJECT,
    projectId,
  };
};

export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const receiveProject = (projectId, project) => {
  return {
    type: RECEIVE_PROJECT,
    projectId,
    data: project,
  };
};

export const RECEIVE_PROJECT_ERROR = 'RECEIVE_PROJECT_ERROR';
export const receiveProjectError = (projectId, error) => {
  return {
    type: RECEIVE_PROJECT_ERROR,
    projectId,
    error,
  };
};

export const REQUEST_ENVIRONMENT = 'REQUEST_ENVIRONMENT';
export const requestEnvironment = (projectId, environmentKey) => {
  return {
    type: REQUEST_ENVIRONMENT,
    projectId,
    environmentKey,
  };
};

export const RECEIVE_ENVIRONMENT = 'RECEIVE_ENVIRONMENT';
export const receiveEnvironment = (projectId, environmentKey, environment) => {
  return {
    type: RECEIVE_ENVIRONMENT,
    projectId,
    environmentKey,
    data: environment,
  };
};

export const RECEIVE_ENVIRONMENT_ERROR = 'RECEIVE_ENVIRONMENT_ERROR';
export const receiveEnvironmentError = (projectId, environmentKey, error) => {
  return {
    type: RECEIVE_ENVIRONMENT_ERROR,
    projectId,
    environmentKey,
    error,
  };
};

export const REQUEST_ENVIRONMENT_STATE = 'REQUEST_ENVIRONMENT_STATE';
export const requestEnvironmentState = (projectId, environmentKey) => {
  return {
    type: REQUEST_ENVIRONMENT_STATE,
    projectId,
    environmentKey,
  };
};

export const RECEIVE_ENVIRONMENT_STATE = 'RECEIVE_ENVIRONMENT_STATE';
export const receiveEnvironmentState = (
  projectId,
  environmentKey,
  environmentState
) => {
  return {
    type: RECEIVE_ENVIRONMENT_STATE,
    projectId,
    environmentKey,
    data: environmentState,
  };
};

export const RECEIVE_ENVIRONMENT_STATE_ERROR =
  'RECEIVE_ENVIRONMENT_STATE_ERROR';
export const receiveEnvironmentStateError = (
  projectId,
  environmentKey,
  error
) => {
  return {
    type: RECEIVE_ENVIRONMENT_STATE_ERROR,
    projectId,
    environmentKey,
    error,
  };
};

export const REQUEST_TOGGLE = 'REQUEST_TOGGLE';
export const requestToggle = (projectId, toggleKey) => {
  return {
    type: REQUEST_TOGGLE,
    projectId,
    toggleKey,
  };
};

export const RECEIVE_TOGGLE = 'RECEIVE_TOGGLE';
export const receiveToggle = (projectId, toggleKey, toggle) => {
  return {
    type: RECEIVE_TOGGLE,
    projectId,
    toggleKey,
    data: toggle,
  };
};

export const RECEIVE_TOGGLE_ERROR = 'RECEIVE_TOGGLE_ERROR';
export const receiveToggleError = (projectId, toggleKey, error) => {
  return {
    type: RECEIVE_TOGGLE_ERROR,
    projectId,
    toggleKey,
    error,
  };
};

export const REQUEST_TOGGLE_STATE = 'REQUEST_TOGGLE_STATE';
export const requestToggleState = (projectId, toggleKey) => {
  return {
    type: REQUEST_TOGGLE_STATE,
    projectId,
    toggleKey,
  };
};

export const RECEIVE_TOGGLE_STATE = 'RECEIVE_TOGGLE_STATE';
export const receiveToggleState = (projectId, toggleKey, toggleState) => {
  return {
    type: RECEIVE_TOGGLE_STATE,
    projectId,
    toggleKey,
    data: toggleState,
  };
};

export const RECEIVE_TOGGLE_STATE_ERROR = 'RECEIVE_TOGGLE_STATE_ERROR';
export const receiveToggleStateError = (projectId, toggleKey, error) => {
  return {
    type: RECEIVE_TOGGLE_STATE_ERROR,
    projectId,
    toggleKey,
    error,
  };
};

export const REQUEST_CLIENT_ACCESS_STRATEGY = 'REQUEST_CLIENT_ACCESS_STRATEGY';
export const requestClientAccessStrategy = (projectId, strategyId) => {
  return {
    type: REQUEST_CLIENT_ACCESS_STRATEGY,
    projectId,
    strategyId,
  };
};

export const RECEIVE_CLIENT_ACCESS_STRATEGY = 'RECEIVE_CLIENT_ACCESS_STRATEGY';
export const receiveClientAccessStrategy = (
  projectId,
  strategyId,
  strategy
) => {
  return {
    type: RECEIVE_CLIENT_ACCESS_STRATEGY,
    projectId,
    strategyId,
    data: strategy,
  };
};

export const RECEIVE_CLIENT_ACCESS_STRATEGY_ERROR =
  'RECEIVE_CLIENT_ACCESS_STRATEGY_ERROR';
export const receiveClientAccessStrategyError = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: RECEIVE_CLIENT_ACCESS_STRATEGY_ERROR,
    projectId,
    strategyId,
    error,
  };
};

export const TOGGLE_ENVIRONMENT_STATE_UPDATE_REQUESTED =
  'TOGGLE_ENVIRONMENT_STATE_UPDATE_REQUESTED';
export const toggleEnvironmentStateUpdateRequested = (
  projectId,
  environmentKey,
  toggleKey
) => {
  return {
    type: TOGGLE_ENVIRONMENT_STATE_UPDATE_REQUESTED,
    projectId,
    environmentKey,
    toggleKey,
  };
};

export const TOGGLE_ENVIRONMENT_STATE_UPDATE_SUCCEEDED =
  'TOGGLE_ENVIRONMENT_STATE_UPDATE_SUCCEEDED';
export const toggleEnvironmentStateUpdateSucceeded = (
  projectId,
  environmentKey,
  toggleKey,
  newValue
) => {
  return {
    type: TOGGLE_ENVIRONMENT_STATE_UPDATE_SUCCEEDED,
    projectId,
    environmentKey,
    toggleKey,
    value: newValue,
  };
};

export const TOGGLE_ENVIRONMENT_STATE_UPDATE_FAILED =
  'TOGGLE_ENVIRONMENT_STATE_UPDATE_FAILED';
export const toggleEnvironmentStateUpdateFailed = (
  projectId,
  environmentKey,
  toggleKey,
  error
) => {
  return {
    type: TOGGLE_ENVIRONMENT_STATE_UPDATE_FAILED,
    projectId,
    environmentKey,
    toggleKey,
    error,
  };
};

export const PROJECT_ADD_REQUESTED = 'PROJECT_ADD_REQUESTED';
export const projectAddRequested = (id, name) => {
  return {
    type: PROJECT_ADD_REQUESTED,
    id,
    name,
  };
};

export const PROJECT_ADD_SUCCEEDED = 'PROJECT_ADD_SUCCEEDED';
export const projectAddSucceeded = (id) => {
  return {
    type: PROJECT_ADD_SUCCEEDED,
    id,
  };
};

export const PROJECT_ADD_FAILED = 'PROJECT_ADD_FAILED';
export const projectAddFailed = (id, error) => {
  return {
    type: PROJECT_ADD_FAILED,
    id,
    error,
  };
};

export const PROJECT_DELETE_REQUESTED = 'PROJECT_DELETE_REQUESTED';
export const projectDeleteRequested = (projectId) => {
  return {
    type: PROJECT_DELETE_REQUESTED,
    projectId,
  };
};

export const PROJECT_DELETE_SUCCEEDED = 'PROJECT_DELETE_SUCCEEDED';
export const projectDeletedSucceeded = (projectId) => {
  return {
    type: PROJECT_DELETE_SUCCEEDED,
    projectId,
  };
};

export const PROJECT_DELETE_FAILED = 'PROJECT_DELETE_FAILED';
export const projectDeleteFailed = (projectId, error) => {
  return {
    type: PROJECT_DELETE_FAILED,
    projectId,
    error,
  };
};

export const TOGGLE_ADD_REQUESTED = 'TOGGLE_ADD_REQUESTED';
export const toggleAddRequested = () => {
  return {
    type: TOGGLE_ADD_REQUESTED,
  };
};

export const TOGGLE_ADD_SUCCEEDED = 'TOGGLE_ADD_SUCCEEDED';
export const toggleAddSucceeded = (projectId, toggleKey, toggleName) => {
  return {
    type: TOGGLE_ADD_SUCCEEDED,
    projectId,
    toggleKey,
    toggleName,
  };
};

export const TOGGLE_ADD_FAILED = 'TOGGLE_ADD_FAILED';
export const toggleAddFailed = (projectId, toggleKey, error) => {
  return {
    type: TOGGLE_ADD_FAILED,
    projectId,
    toggleKey,
    error,
  };
};

export const TOGGLE_DELETE_REQUESTED = 'TOGGLE_DELETE_REQUESTED';
export const toggleDeleteRequested = () => {
  return {
    type: TOGGLE_DELETE_REQUESTED,
  };
};

export const TOGGLE_DELETE_SUCCEEDED = 'TOGGLE_DELETE_SUCCEEDED';
export const toggleDeleteSucceeded = (projectId, toggleKey) => {
  return {
    type: TOGGLE_DELETE_SUCCEEDED,
    projectId,
    toggleKey,
  };
};

export const TOGGLE_DELETE_FAILED = 'TOGGLE_DELETE_FAILED';
export const toggleDeleteFailed = (projectId, toggleKey, error) => {
  return {
    type: TOGGLE_DELETE_FAILED,
    projectId,
    toggleKey,
    error,
  };
};

export const ENVIRONMENT_ADD_REQUESTED = 'ENVIRONMENT_ADD_REQUESTED';
export const environmentAddRequested = () => {
  return {
    type: ENVIRONMENT_ADD_REQUESTED,
  };
};

export const ENVIRONMENT_ADD_SUCCEEDED = 'ENVIRONMENT_ADD_SUCCEEDED';
export const environmentAddSucceeded = (
  projectId,
  environmentKey,
  environmentName
) => {
  return {
    type: ENVIRONMENT_ADD_SUCCEEDED,
    projectId,
    environmentKey,
    environmentName,
  };
};

export const ENVIRONMENT_ADD_FAILED = 'ENVIRONMENT_ADD_FAILED';
export const environmentAddFailed = (projectId, environmentKey, error) => {
  return {
    type: ENVIRONMENT_ADD_FAILED,
    projectId,
    environmentKey,
    error,
  };
};

export const ENVIRONMENT_DELETE_REQUESTED = 'ENVIRONMENT_DELETE_REQUESTED';
export const environmentDeleteRequested = () => {
  return {
    type: ENVIRONMENT_DELETE_REQUESTED,
  };
};

export const ENVIRONMENT_DELETE_SUCCEEDED = 'ENVIRONMENT_DELETE_SUCCEEDED';
export const environmentDeleteSucceeded = (projectId, environmentKey) => {
  return {
    type: ENVIRONMENT_DELETE_SUCCEEDED,
    projectId: projectId,
    environmentKey: environmentKey,
  };
};

export const ENVIRONMENT_DELETE_FAILED = 'ENVIRONMENT_DELETE_FAILED';
export const environmentDeleteFailed = (projectId, environmentKey, error) => {
  return {
    type: ENVIRONMENT_DELETE_FAILED,
    projectId,
    environmentKey,
    error,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_ADD_REQUESTED =
  'CLIENT_ACCESS_STRATEGY_X509_ADD_REQUESTED';
export const clientAccessStrategyX509AddRequested = (projectId, strategyId) => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_ADD_REQUESTED,
    projectId,
    strategyId,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_ADD_SUCCEEDED =
  'CLIENT_ACCESS_STRATEGY_X509_ADD_SUCCEEDED';
export const clientAccessStrategyX509AddSucceeded = (projectId, strategyId) => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_ADD_SUCCEEDED,
    projectId,
    strategyId,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_ADD_FAILED =
  'CLIENT_ACCESS_STRATEGY_X509_ADD_FAILED';
export const clientAccessStrategyX509AddFailed = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_ADD_FAILED,
    projectId,
    strategyId,
    error,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_DELETE_REQUESTED =
  'CLIENT_ACCESS_STRATEGY_X509_DELETE_REQUESTED';
export const clientAccessStrategyX509DeleteRequested = () => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_DELETE_REQUESTED,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_DELETE_SUCCEEDED =
  'CLIENT_ACCESS_STRATEGY_X509_DELETE_SUCCEEDED';
export const clientAccessStrategyX509DeleteSucceeded = (
  projectId,
  strategyId
) => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_DELETE_SUCCEEDED,
    projectId: projectId,
    strategyId: strategyId,
  };
};

export const CLIENT_ACCESS_STRATEGY_X509_DELETE_FAILED =
  'CLIENT_ACCESS_STRATEGY_X509_DELETE_FAILED';
export const clientAccessStrategyX509DeleteFailed = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: CLIENT_ACCESS_STRATEGY_X509_DELETE_FAILED,
    projectId,
    strategyId,
    error,
  };
};

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (modalType, modalProps) => {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps,
  };
};

export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const RESET = 'RESET';
export const reset = () => {
  return {
    type: RESET,
  };
};

export const SELECT_PROJECT_REQUESTED = 'SELECT_PROJECT_REQUESTED';
export const selectProjectRequested = (projectId) => {
  return {
    type: SELECT_PROJECT_REQUESTED,
    projectId,
  };
};

export const SELECT_PROJECT_SUCCEEDED = 'SELECT_PROJECT_SUCCEEDED';
export const selectProjectSucceeded = (projectId) => {
  return {
    type: SELECT_PROJECT_SUCCEEDED,
    projectId,
  };
};

export const SELECT_PROJECT_FAILED = 'SELECT_PROJECT_FAILED';
export const selectProjectFailed = (projectId) => {
  return {
    type: SELECT_PROJECT_FAILED,
    projectId,
  };
};
