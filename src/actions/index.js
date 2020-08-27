import { Api, SessionError } from '../services/api/api.js';
import { v1 as uuidv1 } from 'uuid';
import * as actionTypes from './types';
import { push } from 'connected-react-router';

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

const getAccount = async (dispatch) => {
  try {
    dispatch({ type: actionTypes.requestAccount });
    let account = await Api.getProjects();
    dispatch({ type: actionTypes.receiveAccount, data: account });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveAccountError,
      error,
    });
  }
};

const getLatestProject = async (projectId, dispatch) => {
  try {
    dispatch({ type: actionTypes.requestProject, projectId });
    let project = await Api.getProject(projectId);
    dispatch({
      type: actionTypes.receiveProject,
      projectId,
      data: project,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveProjectError,
      projectId,
      error,
    });
  }
};

const getLatestEnvironment = async (projectId, environmentKey, dispatch) => {
  try {
    dispatch({
      type: actionTypes.requestEnvironment,
      projectId,
      environmentKey,
    });
    let environment = await Api.getEnvironment(projectId, environmentKey);
    dispatch({
      type: actionTypes.receiveEnvironment,
      projectId,
      environmentKey,
      data: environment,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveEnvironmentError,
      projectId,
      environmentKey,
      error,
    });
  }
};

const getLatestEnvironmentState = async (
  projectId,
  environmentKey,
  dispatch
) => {
  try {
    dispatch({
      type: actionTypes.requestEnvironmentState,
      projectId,
      environmentKey,
    });
    let environmentState = await Api.getEnvironmentState(
      projectId,
      environmentKey
    );
    dispatch({
      type: actionTypes.receiveEnvironmentState,
      projectId,
      environmentKey,
      data: environmentState,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveEnvironmentStateError,
      projectId,
      environmentKey,
      error,
    });
  }
};

const getLatestToggle = async (projectId, toggleKey, dispatch) => {
  try {
    dispatch({ type: actionTypes.requestToggle, projectId, toggleKey });
    let toggle = await Api.getToggle(projectId, toggleKey);
    dispatch({
      type: actionTypes.receiveToggle,
      projectId,
      toggleKey,
      data: toggle,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveToggleError,
      projectId,
      toggleKey,
      error,
    });
  }
};

const getLatestToggleState = async (projectId, toggleKey, dispatch) => {
  try {
    dispatch({
      type: actionTypes.requestToggleState,
      projectId,
      toggleKey,
    });
    let toggleState = await Api.getToggleState(projectId, toggleKey);
    dispatch({
      type: actionTypes.receiveToggleState,
      projectId,
      toggleKey,
      data: toggleState,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveToggleStateError,
      projectId,
      toggleKey,
      error,
    });
  }
};

const getLatestX509Certificate = async (projectId, strategyId, dispatch) => {
  try {
    dispatch({
      type: actionTypes.requestClientAccessStrategy,
      projectId,
      strategyId,
    });
    let x509 = await Api.getX509Certificate(projectId, strategyId);
    dispatch({
      type: actionTypes.receiveClientAccessStrategy,
      projectId,
      strategyId,
      data: x509,
    });
  } catch (error) {
    handleError(dispatch, error, {
      type: actionTypes.receiveClientAccessStrategyError,
      projectId,
      strategyId,
      error,
    });
  }
};

export const actionCreators = {
  initialise: () => async (dispatch, getState) => {
    await getAccount(dispatch, getState);
    let projects = getState().account.projection.account.projects;
    if (projects.length > 0) {
      await getLatestProject(projects[0].id, dispatch, getState);
    }
    dispatch({ type: actionTypes.initialised });
  },

  requestAccount: () => async (dispatch, getState) => {
    await getAccount(dispatch, getState);
  },

  selectProject: (projectId) => async (dispatch, getState) => {
    await getLatestProject(projectId, dispatch, getState);
  },

  selectEnvironment: (projectId, environmentKey) => async (
    dispatch,
    getState
  ) => {
    if (!getState().project.projects[projectId]) {
      await getLatestProject(projectId, dispatch, getState);
    }
    await Promise.all([
      getLatestEnvironment(projectId, environmentKey, dispatch, getState),
      getLatestEnvironmentState(projectId, environmentKey, dispatch, getState),
    ]);
  },

  selectToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    if (!getState().project.projects[projectId]) {
      await getLatestProject(projectId, dispatch, getState);
    }
    await Promise.all([
      getLatestToggle(projectId, toggleKey, dispatch, getState),
      getLatestToggleState(projectId, toggleKey, dispatch, getState),
    ]);
  },

  selectClientAccessStrategy: (projectId, strategyId) => async (
    dispatch,
    getState
  ) => {
    if (!getState().project.projects[projectId]) {
      await getLatestProject(projectId, dispatch, getState);
    }

    await getLatestX509Certificate(projectId, strategyId, dispatch);
  },

  setToggleEnvironmentState: (
    projectId,
    environmentKey,
    toggleKey,
    value
  ) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.toggleEnvironmentStateUpdateRequested,
        projectId,
        environmentKey,
        toggleKey,
      });
      let newValue = value ? 'True' : 'False';
      await Api.setToggleEnvironmentState(
        projectId,
        environmentKey,
        toggleKey,
        newValue
      );

      dispatch({
        type: actionTypes.toggleEnvironmentStateUpdateSucceeded,
        projectId,
        environmentKey,
        toggleKey,
        value: newValue,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.toggleEnvironmentStateUpdateFailed,
        projectId,
        environmentKey,
        toggleKey,
        error,
      });
    }
  },

  hideModal: () => async (dispatch) => {
    dispatch({ type: actionTypes.hideModal });
  },

  addProject: (name) => async (dispatch) => {
    try {
      let id = uuidv1();
      dispatch({ type: actionTypes.projectAddRequested });
      await Api.addProject(id, name);
      dispatch({
        type: actionTypes.projectAddSucceeded,
        id: id,
        name: name,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.projectAddFailed,
        error,
      });
    }
  },

  deleteProject: (projectId) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.projectDeleteRequested });
      await Api.deleteProject(projectId);
      dispatch({
        type: actionTypes.projectDeleteSucceeded,
        projectId: projectId,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.projectDeleteFailed,
        projectId,
        error,
      });
    }
  },

  addToggle: (projectId, toggleKey, toggleName) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.toggleAddRequested });
      await Api.addToggle(projectId, toggleKey, toggleName);
      dispatch({
        type: actionTypes.toggleAddSucceeded,
        projectId,
        toggleKey,
        toggleName,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.toggleAddFailed,
        projectId,
        toggleKey,
        error,
      });
    }
  },

  deleteToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.toggleDeleteRequested });
      await Api.deleteToggle(projectId, toggleKey);
      dispatch({
        type: actionTypes.toggleDeleteSucceeded,
        projectId,
        toggleKey,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.toggleDeleteFailed,
        projectId,
        toggleKey,
        error,
      });
    }
  },

  addEnvironment: (projectId, environmentKey, environmentName) => async (
    dispatch
  ) => {
    try {
      dispatch({ type: actionTypes.environmentAddRequested });
      await Api.addEnvironment(projectId, environmentKey, environmentName);
      dispatch({
        type: actionTypes.environmentAddSucceeded,
        projectId,
        environmentKey,
        environmentName,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.environmentAddFailed,
        projectId,
        environmentKey,
        error,
      });
    }
  },

  deleteEnvironment: (projectId, environmentKey) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.environmentDeleteRequested });
      await Api.deleteEnvironment(projectId, environmentKey);
      dispatch({
        type: actionTypes.environmentDeleteSucceeded,
        projectId: projectId,
        environmentKey: environmentKey,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.environmentDeleteFailed,
        projectId,
        environmentKey,
        error,
      });
    }
  },

  createClientAccesStrategyX509: (projectId, strategyId) => async (
    dispatch
  ) => {
    dispatch({
      type: actionTypes.clientAccessStrategyX509AddRequested,
      projectId,
      strategyId,
    });
    dispatch(push(`/projects/${projectId}/certificates/${strategyId}`));
  },

  addClientAccessStrategyX509: (projectId, strategyId) => async (dispatch) => {
    try {
      let response = await Api.addClientAccessStrategyX509(
        projectId,
        strategyId
      );
      dispatch({
        type: actionTypes.clientAccessStrategyX509AddSucceeded,
        projectId,
        strategyId,
      });
      return response;
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.clientAccessStrategyX509AddFailed,
        projectId,
        strategyId,
        error,
      });
    }
  },

  deleteClientAccesStrategyX509: (projectId, strategyId) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({ type: actionTypes.clientAccessStrategyX509DeleteRequested });

      await Api.deleteClientAccessStrategyX509(projectId, strategyId);

      dispatch({
        type: actionTypes.clientAccessStrategyX509DeleteSucceeded,
        projectId: projectId,
        strategyId: strategyId,
      });
    } catch (error) {
      handleError(dispatch, error, {
        type: actionTypes.clientAccessStrategyX509DeleteFailed,
        projectId,
        strategyId,
        error,
      });
    }
  },

  signOut: () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.reset });
  },
};
