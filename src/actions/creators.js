import { Api, SessionError } from '../services/api/api.js';
import { v1 as uuidv1 } from 'uuid';
import * as actions from './actions';
import * as modalTypes from '../containers/modals/types';
import { push } from 'connected-react-router';

const handleError = (dispatch, error, requestFailureAction) => {
  if (error.message !== SessionError) {
    showModal(modalTypes.API_ERROR, { error: error.message });
    if (requestFailureAction) {
      dispatch(requestFailureAction);
    }
  }
};

const initialise = () => async (dispatch, getState) => {
  await fetchAccountIfNeeded()(dispatch, getState);
  let projects = getState().account.projection.account.projects;
  if (projects.length > 0) {
    await selectProject(projects[0].id)(dispatch, getState);
  }
  dispatch(actions.initialised());
};

const shouldFetchAccount = (state) => {
  return !state?.account?.isLoading;
};

const fetchAccountIfNeeded = () => async (dispatch, getState) => {
  if (shouldFetchAccount(getState())) {
    await fetchAccount()(dispatch);
  }
};

const fetchAccount = () => async (dispatch) => {
  try {
    dispatch(actions.requestAccount());
    dispatch(actions.receiveAccount(await Api.getProjects()));
  } catch (error) {
    handleError(dispatch, error, actions.receiveAccountError(error));
  }
};

const fetchProjectIfNeeded = (projectId) => async (dispatch, getState) => {
  if (shouldFetchProject(projectId, getState())) {
    await fetchProject(projectId)(dispatch);
  }
};

const shouldFetchProject = (projectId, state) => {
  return !state?.project?.projects[projectId];
};

const fetchProject = (projectId) => async (dispatch) => {
  try {
    dispatch(actions.requestProject(projectId));
    dispatch(
      actions.receiveProject(projectId, await Api.getProject(projectId))
    );
  } catch (error) {
    handleError(dispatch, error, actions.receiveProjectError(projectId, error));
  }
};

const fetchEnvironment = (projectId, environmentKey) => async (dispatch) => {
  try {
    dispatch(actions.requestEnvironment(projectId, environmentKey));
    dispatch(
      actions.receiveEnvironment(
        projectId,
        environmentKey,
        await Api.getEnvironment(projectId, environmentKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.receiveEnvironmentError(projectId, environmentKey, error)
    );
  }
};

const fetchEnvironmentState = (projectId, environmentKey) => async (
  dispatch
) => {
  try {
    dispatch(actions.requestEnvironmentState(projectId, environmentKey));
    dispatch(
      actions.receiveEnvironmentState(
        projectId,
        environmentKey,
        await Api.getEnvironmentState(projectId, environmentKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.receiveEnvironmentStateError(projectId, environmentKey, error)
    );
  }
};

const fetchToggle = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(actions.requestToggle(projectId, toggleKey));
    dispatch(
      actions.receiveToggle(
        projectId,
        toggleKey,
        await Api.getToggle(projectId, toggleKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.receiveToggleError(projectId, toggleKey, error)
    );
  }
};

const fetchToggleState = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(actions.requestToggleState(projectId, toggleKey));
    dispatch(
      actions.receiveToggleState(
        projectId,
        toggleKey,
        await Api.getToggleState(projectId, toggleKey)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.receiveToggleStateError(projectId, toggleKey, error)
    );
  }
};

const fetchX509Certificate = (projectId, strategyId) => async (dispatch) => {
  try {
    dispatch(actions.requestClientAccessStrategy(projectId, strategyId));
    dispatch(
      actions.receiveClientAccessStrategy(
        projectId,
        strategyId,
        await Api.getX509Certificate(projectId, strategyId)
      )
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.receiveClientAccessStrategyError(projectId, strategyId, error)
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
      actions.toggleEnvironmentStateUpdateRequested(
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
      actions.toggleEnvironmentStateUpdateSucceeded(
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
      actions.toggleEnvironmentStateUpdateFailed(
        projectId,
        environmentKey,
        toggleKey,
        error
      )
    );
  }
};

const addProject = (name) => async (dispatch) => {
  let id = uuidv1();
  try {
    dispatch(actions.projectAddRequested(id, name));
    await Api.addProject(id, name);
    dispatch(actions.projectAddSucceeded(id));
  } catch (error) {
    handleError(dispatch, error, actions.projectAddFailed(id, error));
  }
};

const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch(actions.projectDeleteRequested(projectId));
    await Api.deleteProject(projectId);
    dispatch(actions.projectDeletedSucceeded(projectId));
  } catch (error) {
    handleError(dispatch, error, actions.projectDeleteFailed(projectId, error));
  }
};

const addToggle = (projectId, toggleKey, toggleName) => async (dispatch) => {
  try {
    dispatch(actions.toggleAddRequested(projectId, toggleKey, toggleName));
    await Api.addToggle(projectId, toggleKey, toggleName);
    dispatch(actions.toggleAddSucceeded(projectId, toggleKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.toggleAddFailed(projectId, toggleKey, error)
    );
  }
};

const deleteToggle = (projectId, toggleKey) => async (dispatch) => {
  try {
    dispatch(actions.toggleDeleteRequested(projectId, toggleKey));
    await Api.deleteToggle(projectId, toggleKey);
    dispatch(actions.toggleDeleteSucceeded(projectId, toggleKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.toggleDeleteFailed(projectId, toggleKey, error)
    );
  }
};

const addEnvironment = (projectId, environmentKey, environmentName) => async (
  dispatch
) => {
  try {
    dispatch(
      actions.environmentAddRequested(
        projectId,
        environmentKey,
        environmentName
      )
    );
    await Api.addEnvironment(projectId, environmentKey, environmentName);
    dispatch(actions.environmentAddSucceeded(projectId, environmentKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.environmentAddFailed(projectId, environmentKey, error)
    );
  }
};

const deleteEnvironment = (projectId, environmentKey) => async (dispatch) => {
  try {
    dispatch(actions.environmentDeleteRequested(projectId, environmentKey));
    await Api.deleteEnvironment(projectId, environmentKey);
    dispatch(actions.environmentDeleteSucceeded(projectId, environmentKey));
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.environmentDeleteFailed(projectId, environmentKey, error)
    );
  }
};

const createClientAccessStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  dispatch(actions.clientAccessStrategyX509AddRequested(projectId, strategyId));
  dispatch(push(`/projects/${projectId}/certificates/${strategyId}`));
};

const addClientAccessStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  try {
    let response = await Api.addClientAccessStrategyX509(projectId, strategyId);
    dispatch(
      actions.clientAccessStrategyX509AddSucceeded(projectId, strategyId)
    );
    return response;
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.clientAccessStrategyX509AddFailed(projectId, strategyId, error)
    );
  }
};

const deleteClientAccessStrategyX509 = (projectId, strategyId) => async (
  dispatch
) => {
  try {
    dispatch(
      actions.clientAccessStrategyX509DeleteRequested(projectId, strategyId)
    );
    await Api.deleteClientAccessStrategyX509(projectId, strategyId);
    dispatch(
      actions.clientAccessStrategyX509DeleteSucceeded(projectId, strategyId)
    );
  } catch (error) {
    handleError(
      dispatch,
      error,
      actions.clientAccessStrategyX509DeleteFailed(projectId, strategyId, error)
    );
  }
};

const showModal = (modalType, modalProps) => (dispatch) => {
  dispatch(actions.showModal(modalType, modalProps));
};

const hideModal = () => (dispatch) => {
  dispatch(actions.hideModal());
};

const selectProject = (projectId) => async (dispatch) => {
  try {
    dispatch(actions.selectProjectRequested(projectId));
    await fetchProject(projectId)(dispatch);
    dispatch(actions.selectProjectSucceeded(projectId));
  } catch (error) {
    handleError(dispatch, error, actions.selectProjectFailed(projectId));
  }
};

const signOut = () => (dispatch) => {
  dispatch(actions.reset());
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
  deleteClientAccessStrategyX509,

  // ui
  showModal,
  hideModal,
  createClientAccessStrategyX509,
  selectProject,
  signOut,
};
