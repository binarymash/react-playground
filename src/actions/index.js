import { Api } from '../api.js';
import uuidv1 from 'uuid/v1';

export const initialised = 'INITIALISED';

export const requestAccountType = 'REQUEST_ACCOUNT';
export const receiveAccountType = 'RECEIVE_ACCOUNT';
export const receiveProjectsErrorType = 'RECEIVE_PROJECTS_ERROR';

export const requestProjectType = 'REQUEST_PROJECT';
export const receiveProjectType = 'RECEIVE_PROJECT';
export const receiveProjectErrorType = 'RECEIVE_PROJECT_ERROR';

export const requestEnvironmentType = 'REQUEST_ENVIRONMENT';
export const receiveEnvironmentType = 'RECEIVE_ENVIRONMENT';
export const receiveEnvironmentErrorType = 'RECEIVE_ENVIRONMENT_ERROR';

export const requestEnvironmentStateType = 'REQUEST_ENVIRONMENTSTATE';
export const receiveEnvironmentStateType = 'RECEIVE_ENVIRONMENTSTATE';
export const receiveEnvironmentStateErrorType =
  'RECEIVE_ENVIRONMENTSTATE_ERROR';

export const requestToggleType = 'REQUEST_TOGGLE';
export const receiveToggleType = 'RECEIVE_TOGGLE';
export const receiveToggleErrorType = 'RECEIVE_TOGGLE_ERROR';

export const toggleStateUpdateRequested = 'TOGGLESTATE_UPDATE_REQUESTED';
export const toggleStateUpdateSucceeded = 'TOGGLESTATE_UPDATE_SUCCEEDED';
export const toggleStateUpdateFailed = 'TOGGLESTATE_UPDATE_FAILED';

export const projectAddRequested = 'PROJECT_ADD_REQUESTED';
export const projectAddSucceeded = 'PROJECT_ADD_SUCCEEDED';
export const projectAddFailed = 'PROJECT_ADD_FAILED';

export const projectDeleteRequested = 'PROJECT_DELETE_REQUESTED';
export const projectDeleteSucceeded = 'PROJECT_DELETE_SUCCEEDED';
export const projectDeleteFailed = 'PROJECT_DELETE_FAILED';

export const toggleAddRequested = 'TOGGLE_ADD_REQUESTED';
export const toggleAddSucceeded = 'TOGGLE_ADD_SUCCEEDED';
export const toggleAddFailed = 'TOGGLE_ADD_FAILED';

export const toggleDeleteRequested = 'TOGGLE_DELETE_REQUESTED';
export const toggleDeleteSucceeded = 'TOGGLE_DELETE_SUCCEEDED';
export const toggleDeleteFailed = 'TOGGLE_DELETE_FAILED';

export const environmentAddRequested = 'ENVIRONMENT_ADD_REQUESTED';
export const environmentAddSucceeded = 'ENVIRONMENT_ADD_SUCCEEDED';
export const environmentAddFailed = 'ENVIRONMENT_ADD_FAILED';

export const environmentDeleteRequested = 'ENVIRONMENT_DELETE_REQUESTED';
export const environmentDeleteSucceeded = 'ENVIRONMENT_DELETE_SUCCEEDED';
export const environmentDeleteFailed = 'ENVIRONMENT_DELETE_FAILED';

export const showModal = 'SHOW_MODAL';
export const hideModal = 'HIDE_MODAL';

const getAccount = (dispatch, getState) => {
  dispatch({ type: requestAccountType });

  return Api.getProjects()
    .then(function(json) {
      dispatch({ type: receiveAccountType, json });
    })
    .catch(function(error) {
      dispatch({
        type: showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message }
      });
      dispatch({ type: receiveProjectsErrorType, error });
    });
};

const getLatestProject = (projectId, dispatch, getState) => {
  dispatch({ type: requestProjectType, projectId });

  return Api.getProject(projectId)
    .then(function(json) {
      dispatch({ type: receiveProjectType, projectId, json });
    })
    .catch(error => {
      dispatch({
        type: showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message }
      });
      dispatch({ type: receiveProjectErrorType, projectId, error });
    });
};

const getLatestEnvironment = (
  projectId,
  environmentKey,
  dispatch,
  getState
) => {
  dispatch({ type: requestEnvironmentType, projectId, environmentKey });

  return Api.getEnvironment(projectId, environmentKey)
    .then(json => {
      dispatch({
        type: receiveEnvironmentType,
        projectId,
        environmentKey,
        json
      });
    })
    .catch(error => {
      dispatch({
        type: showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message }
      });
      dispatch({
        type: receiveEnvironmentErrorType,
        projectId,
        environmentKey,
        error
      });
    });
};

const getLatestEnvironmentState = (
  projectId,
  environmentKey,
  dispatch,
  getState
) => {
  dispatch({ type: requestEnvironmentStateType, projectId, environmentKey });

  return Api.getEnvironmentState(projectId, environmentKey)
    .then(json => {
      dispatch({
        type: receiveEnvironmentStateType,
        projectId,
        environmentKey,
        json
      });
    })
    .catch(error => {
      dispatch({
        type: showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message }
      });
      dispatch({
        type: receiveEnvironmentStateErrorType,
        projectId,
        environmentKey,
        error
      });
    });
};

const getLatestToggle = (projectId, toggleKey, dispatch, getState) => {
  dispatch({ type: requestToggleType, projectId, toggleKey });

  return Api.getToggle(projectId, toggleKey)
    .then(json => {
      dispatch({ type: receiveToggleType, projectId, toggleKey, json });
    })
    .catch(error => {
      dispatch({
        type: showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message }
      });
      dispatch({ type: receiveToggleErrorType, projectId, toggleKey, error });
    });
};

export const actionCreators = {
  initialise: () => async (dispatch, getState) => {
    await getAccount(dispatch, getState)
      .then(() => {
        let projects = getState().account.projection.account.projects;
        if (projects.length > 0) {
          return getLatestProject(projects[0].id, dispatch, getState);
        }
      })
      .then(() => {
        dispatch({ type: initialised });
      });
  },

  requestAccount: () => async (dispatch, getState) => {
    await getAccount(dispatch, getState);
  },

  selectProject: projectId => async (dispatch, getState) => {
    await getLatestProject(projectId, dispatch, getState);
  },

  selectEnvironment: (projectId, environmentKey) => async (
    dispatch,
    getState
  ) => {
    if (!getState().project.projects[projectId]) {
      await getLatestProject(projectId, dispatch, getState);
    }

    await getLatestEnvironment(projectId, environmentKey, dispatch, getState);
    await getLatestEnvironmentState(
      projectId,
      environmentKey,
      dispatch,
      getState
    );
  },

  selectToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    await getLatestToggle(projectId, toggleKey, dispatch, getState);
  },

  setToggleValue: (projectId, environmentKey, toggleKey, value) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: toggleStateUpdateRequested });

    let newValue = value ? 'True' : 'False';

    await Api.setToggleState(projectId, environmentKey, toggleKey, newValue)
      .then(() => {
        dispatch({
          type: toggleStateUpdateSucceeded,
          projectId,
          environmentKey,
          toggleKey,
          value: newValue
        });
      })
      .catch(error => {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({
          type: toggleStateUpdateFailed,
          projectId,
          environmentKey,
          toggleKey,
          error
        });
      });
  },

  hideModal: () => async (dispatch, getState) => {
    dispatch({ type: hideModal });
  },

  addProject: name => async (dispatch, getState) => {
    let id = uuidv1();
    dispatch({ type: projectAddRequested });

    await Api.addProject(id, name)
      .then(() => {
        dispatch({
          type: projectAddSucceeded,
          id: id,
          name: name
        });
      })
      .catch(error => {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({ type: projectAddFailed, error });
      });
  },

  deleteProject: projectId => async (dispatch, getState) => {
    dispatch({ type: projectDeleteRequested });

    await Api.deleteProject(projectId)
      .then(() => {
        dispatch({
          type: projectDeleteSucceeded,
          projectId: projectId
        });
      })
      .catch(function(error) {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({
          type: projectDeleteFailed,
          projectId,
          error
        });
      });
  },

  addToggle: (projectId, toggleKey, toggleName) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: toggleAddRequested });

    await Api.addToggle(projectId, toggleKey, toggleName)
      .then(() => {
        dispatch({
          type: toggleAddSucceeded,
          projectId,
          toggleKey,
          toggleName
        });
      })
      .catch(error => {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({ type: toggleAddFailed, projectId, toggleKey, error });
      });
  },

  deleteToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    dispatch({ type: toggleDeleteRequested });

    await Api.deleteToggle(projectId, toggleKey)
      .then(() => {
        dispatch({
          type: toggleDeleteSucceeded,
          projectId,
          toggleKey
        });
      })
      .catch(error => {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({ type: toggleDeleteFailed, projectId, toggleKey, error });
      });
  },

  addEnvironment: (projectId, environmentKey, environmentName) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: environmentAddRequested });

    await Api.addEnvironment(projectId, environmentKey, environmentName)
      .then(() => {
        dispatch({
          type: environmentAddSucceeded,
          projectId,
          environmentKey,
          environmentName
        });
      })
      .catch(error => {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({
          type: environmentAddFailed,
          projectId,
          environmentKey,
          error
        });
      });
  },

  deleteEnvironment: (projectId, environmentKey) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: environmentDeleteRequested });

    await Api.deleteEnvironment(projectId, environmentKey)
      .then(() => {
        dispatch({
          type: environmentDeleteSucceeded,
          projectId: projectId,
          environmentKey: environmentKey
        });
      })
      .catch(function(error) {
        dispatch({
          type: showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message }
        });
        dispatch({
          type: environmentDeleteFailed,
          projectId,
          environmentKey,
          error
        });
      });
  }
};
