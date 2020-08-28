import { Api, SessionError } from '../services/api/api.js';
import { v1 as uuidv1 } from 'uuid';
import * as actionTypes from './types';
import { push } from 'connected-react-router';

// actions

const initialisedAction = () => {
  return {
    type: actionTypes.initialised,
  };
};
const requestAccountAction = () => {
  return {
    type: actionTypes.requestAccount,
  };
};

const receiveAccountAction = (account) => {
  return {
    type: actionTypes.receiveAccount,
    data: account,
  };
};

const receiveAccountErrorAction = (error) => {
  return {
    type: actionTypes.receiveAccountError,
    error,
  };
};

const requestProjectAction = (projectId) => {
  return {
    type: actionTypes.requestProject,
    projectId,
  };
};

const receiveProjectAction = (projectId, project) => {
  return {
    type: actionTypes.receiveProject,
    projectId,
    data: project,
  };
};

const receiveProjectErrorAction = (projectId, error) => {
  return {
    type: actionTypes.receiveProjectError,
    projectId,
    error,
  };
};

const requestEnvironmentAction = (projectId, environmentKey) => {
  return {
    type: actionTypes.requestEnvironment,
    projectId,
    environmentKey,
  };
};

const receiveEnvironmentAction = (projectId, environmentKey, environment) => {
  return {
    type: actionTypes.receiveEnvironment,
    projectId,
    environmentKey,
    data: environment,
  };
};

const receiveEnvironmentActionError = (projectId, environmentKey, error) => {
  return {
    type: actionTypes.receiveEnvironmentError,
    projectId,
    environmentKey,
    error,
  };
};

const requestEnvironmentStateAction = (projectId, environmentKey) => {
  return {
    type: actionTypes.requestEnvironmentState,
    projectId,
    environmentKey,
  };
};

const receiveEnvironmentStateAction = (
  projectId,
  environmentKey,
  environmentState
) => {
  return {
    type: actionTypes.receiveEnvironmentState,
    projectId,
    environmentKey,
    data: environmentState,
  };
};

const receiveEnvironmentStateErrorAction = (
  projectId,
  environmentKey,
  error
) => {
  return {
    type: actionTypes.receiveEnvironmentStateError,
    projectId,
    environmentKey,
    error,
  };
};

const requestToggleAction = (projectId, toggleKey) => {
  return {
    type: actionTypes.requestToggle,
    projectId,
    toggleKey,
  };
};

const receiveToggleAction = (projectId, toggleKey, toggle) => {
  return {
    type: actionTypes.receiveToggle,
    projectId,
    toggleKey,
    data: toggle,
  };
};

const receiveToggleErrorAction = (projectId, toggleKey, error) => {
  return {
    type: actionTypes.receiveToggleError,
    projectId,
    toggleKey,
    error,
  };
};

const requestToggleStateAction = (projectId, toggleKey) => {
  return {
    type: actionTypes.requestToggleState,
    projectId,
    toggleKey,
  };
};

const receiveToggleStateAction = (projectId, toggleKey, toggleState) => {
  return {
    type: actionTypes.receiveToggleState,
    projectId,
    toggleKey,
    data: toggleState,
  };
};

const receiveToggleStateErrorAction = (projectId, toggleKey, error) => {
  return {
    type: actionTypes.receiveToggleStateError,
    projectId,
    toggleKey,
    error,
  };
};

const requestClientAccessStrategyAction = (projectId, strategyId) => {
  return {
    type: actionTypes.requestClientAccessStrategy,
    projectId,
    strategyId,
  };
};

const receiveClientAccessStrategyAction = (projectId, strategyId, strategy) => {
  return {
    type: actionTypes.receiveClientAccessStrategy,
    projectId,
    strategyId,
    data: strategy,
  };
};

const receiveClientAccessStrategyErrorAction = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: actionTypes.receiveClientAccessStrategyError,
    projectId,
    strategyId,
    error,
  };
};

const toggleEnvironmentStateUpdateRequestedAction = (
  projectId,
  environmentKey,
  toggleKey
) => {
  return {
    type: actionTypes.toggleEnvironmentStateUpdateRequested,
    projectId,
    environmentKey,
    toggleKey,
  };
};

const toggleEnvironmentStateUpdateSucceededAction = (
  projectId,
  environmentKey,
  toggleKey,
  newValue
) => {
  return {
    type: actionTypes.toggleEnvironmentStateUpdateSucceeded,
    projectId,
    environmentKey,
    toggleKey,
    value: newValue,
  };
};

const toggleEnvironmentStateUpdateFailedAction = (
  projectId,
  environmentKey,
  toggleKey,
  error
) => {
  return {
    type: actionTypes.toggleEnvironmentStateUpdateFailed,
    projectId,
    environmentKey,
    toggleKey,
    error,
  };
};

const hideModalAction = () => {
  return {
    type: actionTypes.hideModal,
  };
};

const projectAddRequestedAction = () => {
  return {
    type: actionTypes.projectAddRequested,
  };
};

const projectAddSucceededAction = (id, name) => {
  return {
    type: actionTypes.projectAddSucceeded,
    id: id,
    name: name,
  };
};

const projectAddFailedAction = (error) => {
  return {
    type: actionTypes.projectAddFailed,
    error,
  };
};

const projectDeleteRequestedAction = () => {
  return {
    type: actionTypes.projectDeleteRequested,
  };
};

const projectDeletedSucceededAction = (projectId) => {
  return {
    type: actionTypes.projectDeleteSucceeded,
    projectId: projectId,
  };
};

const projectDeleteFailedAction = (projectId, error) => {
  return {
    type: actionTypes.projectDeleteFailed,
    projectId,
    error,
  };
};

const toggleAddRequestedAction = () => {
  return {
    type: actionTypes.toggleAddRequested,
  };
};

const toggleAddSucceededAction = (projectId, toggleKey, toggleName) => {
  return {
    type: actionTypes.toggleAddSucceeded,
    projectId,
    toggleKey,
    toggleName,
  };
};

const toggleAddFailedAction = (projectId, toggleKey, error) => {
  return {
    type: actionTypes.toggleAddFailed,
    projectId,
    toggleKey,
    error,
  };
};

const toggleDeleteRequestedAction = () => {
  return {
    type: actionTypes.toggleDeleteRequested,
  };
};

const toggleDeleteSucceededAction = (projectId, toggleKey) => {
  return {
    type: actionTypes.toggleDeleteSucceeded,
    projectId,
    toggleKey,
  };
};

const toggleDeleteFailedAction = (projectId, toggleKey, error) => {
  return {
    type: actionTypes.toggleDeleteFailed,
    projectId,
    toggleKey,
    error,
  };
};

const environmentAddRequestedAction = () => {
  return {
    type: actionTypes.environmentAddRequested,
  };
};

const environmentAddSucceededAction = (
  projectId,
  environmentKey,
  environmentName
) => {
  return {
    type: actionTypes.environmentAddSucceeded,
    projectId,
    environmentKey,
    environmentName,
  };
};

const environmentAddFailedAction = (projectId, environmentKey, error) => {
  return {
    type: actionTypes.environmentAddFailed,
    projectId,
    environmentKey,
    error,
  };
};

const environmentDeleteRequestedAction = () => {
  return {
    type: actionTypes.environmentDeleteRequested,
  };
};

const environmentDeleteSucceededAction = (projectId, environmentKey) => {
  return {
    type: actionTypes.environmentDeleteSucceeded,
    projectId: projectId,
    environmentKey: environmentKey,
  };
};

const environmentDeleteFailedAction = (projectId, environmentKey, error) => {
  return {
    type: actionTypes.environmentDeleteFailed,
    projectId,
    environmentKey,
    error,
  };
};

const clientAccessStrategyX509AddRequestedAction = (projectId, strategyId) => {
  return {
    type: actionTypes.clientAccessStrategyX509AddRequested,
    projectId,
    strategyId,
  };
};

const clientAccessStrategyX509AddSucceededAction = (projectId, strategyId) => {
  return {
    type: actionTypes.clientAccessStrategyX509AddSucceeded,
    projectId,
    strategyId,
  };
};

const clientAccessStrategyX509AddFailedAction = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: actionTypes.clientAccessStrategyX509AddFailed,
    projectId,
    strategyId,
    error,
  };
};

const clientAccessStrategyX509DeleteRequestedAction = () => {
  return {
    type: actionTypes.clientAccessStrategyX509DeleteRequested,
  };
};

const clientAccessStrategyX509DeleteSucceededAction = (
  projectId,
  strategyId
) => {
  return {
    type: actionTypes.clientAccessStrategyX509DeleteSucceeded,
    projectId: projectId,
    strategyId: strategyId,
  };
};

const clientAccessStrategyX509DeleteFailedAction = (
  projectId,
  strategyId,
  error
) => {
  return {
    type: actionTypes.clientAccessStrategyX509DeleteFailed,
    projectId,
    strategyId,
    error,
  };
};

const resetAction = () => {
  return {
    type: actionTypes.reset,
  };
};
// action creators

const reportError = (dispatch, error) => {
  dispatch({
    type: actionTypes.showModal,
    modalType: 'API_ERROR',
    modalProps: { error: error.message },
  });
};

const handleError = (dispatch, error, requestFailureAction) => {
  if (error.message !== SessionError) {
    reportError(dispatch, error);
    if (requestFailureAction) {
      dispatch(requestFailureAction);
    }
  }
};

const initialise = () => async (dispatch, getState) => {
  await fetchAccount()(dispatch, getState);
  let projects = getState().account.projection.account.projects;
  if (projects.length > 0) {
    await fetchProjectIfNeeded(projects[0].id)(dispatch, getState);
  }
  dispatch(initialisedAction());
};

const fetchAccount = () => async (dispatch) => {
  try {
    dispatch(requestAccountAction());
    dispatch(receiveAccountAction(await Api.getProjects()));
  } catch (error) {
    handleError(dispatch, error, receiveAccountErrorAction(error));
  }
};

const fetchProjectIfNeeded = (projectId) => async (dispatch, getState) => {
  if (shouldFetchProject(projectId, getState)) {
    await fetchProject(projectId)(dispatch);
  }
};

const shouldFetchProject = (projectId, getState) => {
  return !getState()?.project?.projects[projectId];
};

const fetchProject = (projectId) => async (dispatch) => {
  try {
    dispatch(requestProjectAction(projectId));
    dispatch(receiveProjectAction(projectId, await Api.getProject(projectId)));
  } catch (error) {
    handleError(dispatch, error, receiveProjectErrorAction(projectId, error));
  }
};

const fetchEnvironment = (projectId, environmentKey) => async (dispatch) => {
  try {
    dispatch(requestEnvironmentAction(projectId, environmentKey));
    dispatch(
      receiveEnvironmentAction(
        projectId,
        environmentKey,
        await Api.getEnvironment(projectId, environmentKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      receiveEnvironmentActionError(projectId, environmentKey, error)
    );
  }
};

const fetchEnvironmentState = (projectId, environmentKey) => async (
  dispatch
) => {
  try {
    dispatch(requestEnvironmentStateAction(projectId, environmentKey));
    dispatch(
      receiveEnvironmentStateAction(
        projectId,
        environmentKey,
        await Api.getEnvironmentState(projectId, environmentKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      receiveEnvironmentStateErrorAction(projectId, environmentKey, error)
    );
  }
};

const fetchToggle = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(requestToggleAction(projectId, toggleKey));
    dispatch(
      receiveToggleAction(
        projectId,
        toggleKey,
        await Api.getToggle(projectId, toggleKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      receiveToggleErrorAction(projectId, toggleKey, error)
    );
  }
};

const fetchToggleState = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(requestToggleStateAction(projectId, toggleKey));
    dispatch(
      receiveToggleStateAction(
        projectId,
        toggleKey,
        await Api.getToggleState(projectId, toggleKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      receiveToggleStateErrorAction(projectId, toggleKey, error)
    );
  }
};

const fetchX509Certificate = (projectId, strategyId) => async (dispatch) => {
  try {
    dispatch(requestClientAccessStrategyAction(projectId, strategyId));
    dispatch(
      receiveClientAccessStrategyAction(
        projectId,
        strategyId,
        await Api.getX509Certificate(projectId, strategyId)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      receiveClientAccessStrategyErrorAction(projectId, strategyId, error)
    );
  }
};

const setToggleEnvironmentState = (
  projectId,
  environmentKey,
  toggleKey,
  value
) => async (dispatch) => {
  try {
    let newValue = value ? 'True' : 'False';
    dispatch(
      toggleEnvironmentStateUpdateRequestedAction(
        projectId,
        environmentKey,
        toggleKey
      )
    );
    await Api.setToggleEnvironmentState(
      projectId,
      environmentKey,
      toggleKey,
      newValue
    );
    dispatch(
      toggleEnvironmentStateUpdateSucceededAction(
        projectId,
        environmentKey,
        toggleKey,
        newValue
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      toggleEnvironmentStateUpdateFailedAction(
        projectId,
        environmentKey,
        toggleKey,
        error
      )
    );
  }
};

const hideModal = () => async (dispatch) => {
  dispatch(hideModalAction());
};

const addProject = (name) => async (dispatch) => {
  try {
    let id = uuidv1();
    dispatch(projectAddRequestedAction());
    await Api.addProject(id, name);
    dispatch(projectAddSucceededAction(id, name));
  } catch (error) {
    handleError(dispatch, error, projectAddFailedAction(error));
  }
};

const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch(projectDeleteRequestedAction());
    await Api.deleteProject(projectId);
    dispatch(projectDeletedSucceededAction(projectId));
  } catch (error) {
    handleError(dispatch, error, projectDeleteFailedAction(projectId, error));
  }
};

const addToggle = (projectId, toggleKey, toggleName) => async (dispatch) => {
  try {
    dispatch(toggleAddRequestedAction());
    await Api.addToggle(projectId, toggleKey, toggleName);
    dispatch(toggleAddSucceededAction(projectId, toggleKey, toggleName));
  } catch (error) {
    handleError(
      dispatch,
      error,
      toggleAddFailedAction(projectId, toggleKey, error)
    );
  }
};

const deleteToggle = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(toggleDeleteRequestedAction());
    await Api.deleteToggle(projectId, toggleKey);
    dispatch(toggleDeleteSucceededAction(projectId, toggleKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      toggleDeleteFailedAction(projectId, toggleKey, error)
    );
  }
};

const addEnvironment = (projectId, environmentKey, environmentName) => async (
  dispatch
) => {
  try {
    dispatch(environmentAddRequestedAction());
    await Api.addEnvironment(projectId, environmentKey, environmentName);
    dispatch(
      environmentAddSucceededAction(projectId, environmentKey, environmentName)
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      environmentAddFailedAction(projectId, environmentKey, error)
    );
  }
};

const deleteEnvironment = (projectId, environmentKey) => async (dispatch) => {
  try {
    dispatch(environmentDeleteRequestedAction());
    await Api.deleteEnvironment(projectId, environmentKey);
    dispatch(environmentDeleteSucceededAction(projectId, environmentKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      environmentDeleteFailedAction(projectId, environmentKey, error)
    );
  }
};

const createClientAccesStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  dispatch(clientAccessStrategyX509AddRequestedAction(projectId, strategyId));
  dispatch(push(`/projects/${projectId}/certificates/${strategyId}`));
};

const addClientAccessStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  try {
    let response = await Api.addClientAccessStrategyX509(projectId, strategyId);
    dispatch(clientAccessStrategyX509AddSucceededAction(projectId, strategyId));
    return response;
  } catch (error) {
    handleError(
      dispatch,
      error,
      clientAccessStrategyX509AddFailedAction(projectId, strategyId, error)
    );
  }
};

const deleteClientAccesStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  try {
    dispatch(clientAccessStrategyX509DeleteRequestedAction());
    await Api.deleteClientAccessStrategyX509(projectId, strategyId);
    dispatch(
      clientAccessStrategyX509DeleteSucceededAction(projectId, strategyId)
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      clientAccessStrategyX509DeleteFailedAction(projectId, strategyId, error)
    );
  }
};

const signOut = () => async (dispatch) => {
  dispatch(resetAction());
};

export const actionCreators = {
  initialise,

  // api queries
  fetchAccount,
  fetchProjectIfNeeded,
  fetchProject,
  fetchEnvironment,
  fetchEnvironmentState,
  fetchToggle,
  fetchToggleState,
  fetchX509Certificate,

  // api commands
  setToggleEnvironmentState,
  addProject,
  deleteProject,
  addToggle,
  deleteToggle,
  addEnvironment,
  deleteEnvironment,
  addClientAccessStrategyX509,
  deleteClientAccesStrategyX509,

  // ui
  hideModal,
  createClientAccesStrategyX509,
  signOut,
};
