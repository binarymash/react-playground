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

export const actionCreators = {

  requestProjects: () => async (dispatch, getState) => {
    dispatch({ type: requestProjectsType });
    await Api.getProjects().then(function(json){
      dispatch({ type: receiveProjectsType, json});      
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: receiveProjectsErrorType, error});  
    });
  },

  selectProject: projectId => async (dispatch, getState) => {
    dispatch({ type: requestProjectType });
    await Api.getProject(projectId).then(function(json){
      dispatch({ type: receiveProjectType, json});
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: receiveProjectErrorType, error});  
    });
  },

  selectEnvironment: r => async (dispatch, getState) => {

    if(!getState().project.projects[r.projectId]){
      dispatch({ type: requestProjectType });
      await Api.getProject(r.projectId).then(function(json){
        dispatch({ type: receiveProjectType, json});
      }).catch(function(error){
        dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
        dispatch({ type: receiveProjectErrorType, error});  
      });
    }

    dispatch({ type: requestEnvironmentType });

    await Api.getEnvironment(r.projectId, r.environmentKey).then((json) => {
      dispatch({ type: receiveEnvironmentType, projectId: r.projectId, environmentKey: r.environmentKey, json});
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: receiveEnvironmentErrorType, error});  
    });    
    
    dispatch({ type: requestEnvironmentStateType });

    await Api.getEnvironmentState(r.projectId, r.environmentKey).then((json) => {
      dispatch({ type: receiveEnvironmentStateType, projectId: r.projectId, environmentKey: r.environmentKey, json});
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: receiveEnvironmentStateErrorType, error});  
    });
  },

  selectToggle: r => async (dispatch, getState) => {
    dispatch({ type: requestToggleType });

    await Api.getToggle(r.projectId, r.toggleKey).then(function(json){
      dispatch({ type: receiveToggleType, json});
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});
      dispatch({ type: receiveToggleErrorType, error});  
    });
  },

  setToggleValue: (projectId, environmentKey, toggleKey, version, value) => async(dispatch, getState) => {
    dispatch({type: toggleStateUpdateRequested});

    let newValue = value ? "True" : "False";
    
    await Api.setToggleState(projectId, environmentKey, toggleKey, version, newValue).then(() => {
      dispatch({ 
        type: toggleStateUpdateSucceeded,
        projectId: projectId,
        environmentKey: environmentKey,
        toggleKey: toggleKey,
        version: version+1,
        value: newValue
      });
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleStateUpdateFailed, error});  
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
    }).catch(function(error){
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
        projectId: projectId,
        toggleKey: toggleKey,
        toggleName: toggleName,
        version: version+1,
      });
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleAddFailed, error});  
    });    
  },

  deleteToggle: (projectId, toggleKey) => async(dispatch, getState) => {

    dispatch({type: toggleDeleteRequested});

    let version = getState().project.projects[projectId].version;

    await Api.deleteToggle(projectId, toggleKey, version).then(() => {
      dispatch({ 
        type: toggleDeleteSucceeded,
        projectId: projectId,
        toggleKey: toggleKey,
        version: version+1,
      });
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: toggleDeleteFailed, error});  
    });    
  },

  addEnvironment: (projectId, environmentKey) => async(dispatch, getState) => {

    dispatch({type: environmentAddRequested});

    let version = getState().project.projects[projectId].version;

    await Api.addEnvironment(projectId, environmentKey, version).then(() => {
      dispatch({ 
        type: environmentAddSucceeded,
        projectId: projectId,
        environmentKey: environmentKey,
        version: version+1,
      });
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: environmentAddFailed, error});  
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
      dispatch({ type: environmentDeleteFailed, error});  
    });    
  },  
};