import {Api} from '../api.js';
import uuidv1 from 'uuid/v1';

export const requestProjectsType = 'REQUEST_PROJECTS';
export const receiveProjectsType = 'RECEIVE_PROJECTS';
export const receiveProjectsErrorType = 'RECEIVE_PROJECTS_ERROR';

export const requestProjectType = 'REQUEST_PROJECT';
export const receiveProjectType = 'RECEIVE_PROJECT';
export const receiveProjectErrorType = 'RECEIVE_PROJECT_ERROR';

export const requestEnvironmentType = 'REQUEST_ENVIRONMENT';
export const receiveEnvironmentType = 'RECEIVE_ENVIRONMENT';
export const receiveEnvironmentErrorType = 'RECEIVE_ENVIRONMENT_ERROR';

export const requestEnvironmentStateType = 'REQUEST_ENVIRONMENTSTATE';
export const receiveEnvironmentStateType = 'RECEIVE_ENVIRONMENTSTATE';
export const receiveEnvironmentStateErrorType = 'RECEIVE_ENVIRONMENTSTATE_ERROR';

export const requestToggleType = 'REQUEST_TOGGLE';
export const receiveToggleType = 'RECEIVE_TOGGLE';
export const receiveToggleErrorType = 'RECEIVE_TOGGLE_ERROR';

export const toggleStateUpdateRequested = 'TOGGLESTATE_UPDATE_REQUESTED';
export const toggleStateUpdateSucceeded = 'TOGGLESTATE_UPDATE_SUCCEEDED';
export const toggleStateUpdateFailed = 'TOGGLESTATE_UPDATE_FAILED';

export const projectAddRequested = 'PROJECT_ADD_REQUESTED';
export const projectAddSucceeded = 'PROJECT_ADD_SUCCEEDED';
export const projectAddFailed = 'PROJECT_ADD_FAILED';

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

const getLatestProjects = (dispatch, getState) => {
  dispatch({ type: requestProjectsType });

  return  Api.getProjects().then(function(json){
    dispatch({ type: receiveProjectsType, json});      
  }).catch(function(error){
    dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
    dispatch({ type: receiveProjectsErrorType, error});  
  });
}

const getLatestProject = (projectId, dispatch, getState) => {
  dispatch({ type: requestProjectType });

  return Api.getProject(projectId).then(function(json){
    dispatch({ type: receiveProjectType, projectId, json});
  }).catch((error) => {
    dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
    dispatch({ type: receiveProjectErrorType, projectId, error});  
  });
}

const getLatestEnvironment = (projectId, environmentKey, dispatch, getState) => {
  dispatch({ type: requestEnvironmentType });

  return Api.getEnvironment(projectId, environmentKey).then((json) => {
    dispatch({ type: receiveEnvironmentType, projectId, environmentKey, json});
  }).catch((error) => {
    dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
    dispatch({ type: receiveEnvironmentErrorType, projectId, environmentKey, error});  
  });  
}

const getLatestEnvironmentState = (projectId, environmentKey, dispatch, getState) => {     
  dispatch({ type: requestEnvironmentStateType });

  return Api.getEnvironmentState(projectId, environmentKey).then((json) => {
    dispatch({ type: receiveEnvironmentStateType, projectId, environmentKey, json});
  }).catch((error) => {
    dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
    dispatch({ type: receiveEnvironmentStateErrorType, projectId, environmentKey, error});  
  }); 
}

const getLatestToggle = (projectId, toggleKey, dispatch, getState) => {
  dispatch({ type: requestToggleType });

  return Api.getToggle(projectId, toggleKey).then((json) => {
    dispatch({ type: receiveToggleType, projectId, toggleKey, json});
  }).catch((error) => {
    dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});
    dispatch({ type: receiveToggleErrorType, projectId, toggleKey, error});  
  });
}

export const actionCreators = {

  requestProjects: () => async (dispatch, getState) => {
    await getLatestProjects(dispatch, getState);
  },

  selectProject: (projectId) => async (dispatch, getState) => {
    await getLatestProject(projectId, dispatch, getState);
  },

  selectEnvironment: (projectId, environmentKey) => async (dispatch, getState) => {

    if(!getState().project.projects[projectId]){
      await getLatestProject(projectId, dispatch, getState);
    }

    await getLatestEnvironment(projectId, environmentKey, dispatch, getState);
    await getLatestEnvironmentState(projectId, environmentKey, dispatch, getState);
  },

  selectToggle: (projectId, toggleKey) => async (dispatch, getState) => {
    await getLatestToggle(projectId, toggleKey, dispatch, getState);
  },

  setToggleValue: (projectId, environmentKey, toggleKey, version, value) => async(dispatch, getState) => {
    dispatch({type: toggleStateUpdateRequested});

    let newValue = value ? "True" : "False";
    
    await Api.setToggleState(projectId, environmentKey, toggleKey, version, newValue).then(() => {
      dispatch({ 
        type: toggleStateUpdateSucceeded,
        projectId,
        environmentKey,
        toggleKey,
        version: version+1,
        value: newValue
      });
    }).catch((error) => {
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleStateUpdateFailed, projectId, environmentKey, toggleKey, error});  
    });
  },

  hideModal: () => async (dispatch, getState) => {
    dispatch({type: hideModal});
  },

  addProject: (name) => async(dispatch, getState) => {

    let id = uuidv1();
    dispatch({type: projectAddRequested});

    let version = getState().account.version;

    await Api.addProject(id, name, version).then(() => {
      dispatch({ 
        type: projectAddSucceeded,
        id: id,
        name: name,
        version: version+1,
      });
    }).catch((error) => {
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: projectAddFailed, error});  
    });    
  }, 

  addToggle: (projectId, toggleKey, toggleName) => async(dispatch, getState) => {

    dispatch({type: toggleAddRequested});

    let version = getState().project.projects[projectId].version;

    await Api.addToggle(projectId, toggleKey, toggleName, version).then(() => {
      dispatch({ 
        type: toggleAddSucceeded,
        projectId,
        toggleKey,
        toggleName,
        version: version+1,
      });
    }).catch((error) => {
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleAddFailed, projectId, toggleKey, error});  
    });    
  },

  deleteToggle: (projectId, toggleKey) => async(dispatch, getState) => {

    dispatch({type: toggleDeleteRequested});

    let version = getState().project.projects[projectId].version;

    await Api.deleteToggle(projectId, toggleKey, version).then(() => {
      dispatch({ 
        type: toggleDeleteSucceeded,
        projectId,
        toggleKey,
        version: version+1,
      });
    }).catch((error) => {
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleDeleteFailed, projectId, toggleKey, error});  
    });    
  },

  addEnvironment: (projectId, environmentKey) => async(dispatch, getState) => {

    dispatch({type: environmentAddRequested});

    let version = getState().project.projects[projectId].version;

    await Api.addEnvironment(projectId, environmentKey, version).then(() => {
      dispatch({ 
        type: environmentAddSucceeded,
        projectId,
        environmentKey,
        version: version+1,
      });
    }).catch((error) => {
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: environmentAddFailed, projectId, environmentKey, error});  
    });    
  }, 

  deleteEnvironment: (projectId, environmentKey) => async(dispatch, getState) => {

    dispatch({type: environmentDeleteRequested});

    let version = getState().project.projects[projectId].version;

    await Api.deleteEnvironment(projectId, environmentKey, version).then(() => {
      dispatch({ 
        type: environmentDeleteSucceeded,
        projectId: projectId,
        environmentKey: environmentKey,
        version: version+1,
      });
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: environmentDeleteFailed, projectId, environmentKey, error});  
    });    
  },  
};