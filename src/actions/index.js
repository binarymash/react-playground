import { Api } from '../services/api/api.js';
import { v1 as uuidv1 } from 'uuid';
import * as actionTypes from './types';
import { push } from 'connected-react-router';

const getAccount = (dispatch, getState) => {
  dispatch({ type: actionTypes.requestAccount });

  return Api.getProjects()
    .then(function (json) {
      dispatch({ type: actionTypes.receiveAccount, json });
    })
    .catch(function (error) {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({ type: actionTypes.receiveAccountError, error });
    });
};

const getLatestProject = (projectId, dispatch, getState) => {
  dispatch({ type: actionTypes.requestProject, projectId });

  return Api.getProject(projectId)
    .then(function (json) {
      dispatch({ type: actionTypes.receiveProject, projectId, json });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({ type: actionTypes.receiveProjectError, projectId, error });
    });
};

const getLatestEnvironment = (
  projectId,
  environmentKey,
  dispatch,
  getState
) => {
  dispatch({ type: actionTypes.requestEnvironment, projectId, environmentKey });

  return Api.getEnvironment(projectId, environmentKey)
    .then((json) => {
      dispatch({
        type: actionTypes.receiveEnvironment,
        projectId,
        environmentKey,
        json,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({
        type: actionTypes.receiveEnvironmentError,
        projectId,
        environmentKey,
        error,
      });
    });
};

const getLatestEnvironmentState = (
  projectId,
  environmentKey,
  dispatch,
  getState
) => {
  dispatch({
    type: actionTypes.requestEnvironmentState,
    projectId,
    environmentKey,
  });

  return Api.getEnvironmentState(projectId, environmentKey)
    .then((json) => {
      dispatch({
        type: actionTypes.receiveEnvironmentState,
        projectId,
        environmentKey,
        json,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({
        type: actionTypes.receiveEnvironmentStateError,
        projectId,
        environmentKey,
        error,
      });
    });
};

const getLatestToggle = (projectId, toggleKey, dispatch, getState) => {
  dispatch({ type: actionTypes.requestToggle, projectId, toggleKey });

  return Api.getToggle(projectId, toggleKey)
    .then((json) => {
      dispatch({ type: actionTypes.receiveToggle, projectId, toggleKey, json });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({
        type: actionTypes.receiveToggleError,
        projectId,
        toggleKey,
        error,
      });
    });
};

const getLatestToggleState = (projectId, toggleKey, dispatch, getState) => {
  dispatch({
    type: actionTypes.requestToggleState,
    projectId,
    toggleKey,
  });

  return Api.getToggleState(projectId, toggleKey)
    .then((json) => {
      dispatch({
        type: actionTypes.receiveToggleState,
        projectId,
        toggleKey,
        json,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({
        type: actionTypes.receiveToggleStateError,
        projectId,
        toggleKey,
        error,
      });
    });
};

const getLatestX509Certificate = (
  projectId,
  strategyId,
  dispatch,
  getState
) => {
  dispatch({
    type: actionTypes.requestClientAccessStrategy,
    projectId,
    strategyId,
  });

  return Api.getX509Certificate(projectId, strategyId)
    .then((json) => {
      dispatch({
        type: actionTypes.receiveClientAccessStrategy,
        projectId,
        strategyId,
        json,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionTypes.showModal,
        modalType: 'API_ERROR',
        modalProps: { error: error.message },
      });
      dispatch({
        type: actionTypes.receiveClientAccessStrategyError,
        projectId,
        strategyId,
        error,
      });
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
        dispatch({ type: actionTypes.initialised });
      });
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

    await getLatestEnvironment(projectId, environmentKey, dispatch, getState);
    await getLatestEnvironmentState(
      projectId,
      environmentKey,
      dispatch,
      getState
    );
  },

  selectToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    if (!getState().project.projects[projectId]) {
      await getLatestProject(projectId, dispatch, getState);
    }
    await getLatestToggle(projectId, toggleKey, dispatch, getState);
    await getLatestToggleState(projectId, toggleKey, dispatch, getState);
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
  ) => async (dispatch, getState) => {
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
    )
      .then(() => {
        dispatch({
          type: actionTypes.toggleEnvironmentStateUpdateSucceeded,
          projectId,
          environmentKey,
          toggleKey,
          value: newValue,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.toggleEnvironmentStateUpdateFailed,
          projectId,
          environmentKey,
          toggleKey,
          error,
        });
      });
  },

  hideModal: () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.hideModal });
  },

  addProject: (name) => async (dispatch, getState) => {
    let id = uuidv1();
    dispatch({ type: actionTypes.projectAddRequested });

    await Api.addProject(id, name)
      .then(() => {
        dispatch({
          type: actionTypes.projectAddSucceeded,
          id: id,
          name: name,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({ type: actionTypes.projectAddFailed, error });
      });
  },

  deleteProject: (projectId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.projectDeleteRequested });

    await Api.deleteProject(projectId)
      .then(() => {
        dispatch({
          type: actionTypes.projectDeleteSucceeded,
          projectId: projectId,
        });
      })
      .catch(function (error) {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.projectDeleteFailed,
          projectId,
          error,
        });
      });
  },

  addToggle: (projectId, toggleKey, toggleName) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: actionTypes.toggleAddRequested });

    await Api.addToggle(projectId, toggleKey, toggleName)
      .then(() => {
        dispatch({
          type: actionTypes.toggleAddSucceeded,
          projectId,
          toggleKey,
          toggleName,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.toggleAddFailed,
          projectId,
          toggleKey,
          error,
        });
      });
  },

  deleteToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.toggleDeleteRequested });

    await Api.deleteToggle(projectId, toggleKey)
      .then(() => {
        dispatch({
          type: actionTypes.toggleDeleteSucceeded,
          projectId,
          toggleKey,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.toggleDeleteFailed,
          projectId,
          toggleKey,
          error,
        });
      });
  },

  addEnvironment: (projectId, environmentKey, environmentName) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: actionTypes.environmentAddRequested });

    await Api.addEnvironment(projectId, environmentKey, environmentName)
      .then(() => {
        dispatch({
          type: actionTypes.environmentAddSucceeded,
          projectId,
          environmentKey,
          environmentName,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.environmentAddFailed,
          projectId,
          environmentKey,
          error,
        });
      });
  },

  deleteEnvironment: (projectId, environmentKey) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: actionTypes.environmentDeleteRequested });

    await Api.deleteEnvironment(projectId, environmentKey)
      .then(() => {
        dispatch({
          type: actionTypes.environmentDeleteSucceeded,
          projectId: projectId,
          environmentKey: environmentKey,
        });
      })
      .catch(function (error) {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.environmentDeleteFailed,
          projectId,
          environmentKey,
          error,
        });
      });
  },

  createClientAccesStrategyX509: (projectId, strategyId) => async (
    dispatch,
    getState
  ) => {
    dispatch({
      type: actionTypes.clientAccessStrategyX509AddRequested,
      projectId,
      strategyId,
    });
    dispatch(push(`/projects/${projectId}/certificates/${strategyId}`));
  },

  addClientAccessStrategyX509: (projectId, strategyId) => async (
    dispatch,
    getState
  ) => {
    return await Api.clientAccessStrategyAddX509(projectId, strategyId)
      .then((response) => {
        dispatch({
          type: actionTypes.clientAccessStrategyX509AddSucceeded,
          projectId,
          strategyId,
        });

        return response;
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.showModal,
          modalType: 'API_ERROR',
          modalProps: { error: error.message },
        });
        dispatch({
          type: actionTypes.clientAccessStrategyX509AddFailed,
          projectId,
          strategyId,
          error,
        });
      });
  },
};
