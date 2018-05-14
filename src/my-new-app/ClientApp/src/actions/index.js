import {Api} from '../api.js';

export const requestProjectsType = 'REQUEST_PROJECTS';
export const receiveProjectsType = 'RECEIVE_PROJECTS';
export const receiveProjectsErrorType = 'RECEIVE_PROJECTS_ERROR';

export const requestProjectType = 'REQUEST_PROJECT';
export const receiveProjectType = 'RECEIVE_PROJECT';
export const receiveProjectErrorType = 'RECEIVE_PROJECT_ERROR';

export const requestEnvironmentType = 'REQUEST_ENVIRONMENT';
export const receiveEnvironmentType = 'RECEIVE_ENVIRONMENT';
export const receiveEnvironmentErrorType = 'RECEIVE_ENVIRONMENT_ERROR';

export const requestToggleType = 'REQUEST_TOGGLE';
export const receiveToggleType = 'RECEIVE_TOGGLE';
export const receiveToggleErrorType = 'RECEIVE_TOGGLE_ERROR';

export const toggleStateUpdateRequested = 'TOGGLESTATE_UPDATE_REQUESTED';
export const toggleStateUpdateSucceeded = 'TOGGLESTATE_UPDATE_SUCCEEDED';
export const toggleStateUpdateFailed = 'TOGGLESTATE_UPDATE_FAILED';

export const toggleAddRequested = 'TOGGLE_ADD_REQUESTED';
export const toggleAddSucceeded = 'TOGGLE_ADD_SUCCEEDED';
export const toggleAddFailed = 'TOGGLE_ADD_FAILED';

export const toggleDeleteRequested = 'TOGGLE_DELETE_REQUESTED';
export const toggleDeleteSucceeded = 'TOGGLE_DELETE_SUCCEEDED';
export const toggleDeleteFailed = 'TOGGLE_DELETE_FAILED';

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
    dispatch({ type: requestEnvironmentType });

    let promises = [
      Api.getEnvironment(r.projectId, r.environmentKey), 
      Api.getEnvironmentState(r.projectId, r.environmentKey)];
    
    Promise.all(promises).then(function([defJson, stateJson]){
      dispatch({ type: receiveEnvironmentType, defJson, stateJson});
    }).catch(function(error){
      dispatch({ type: showModal, modalType: 'API_ERROR', modalProps:{}});      
      dispatch({ type: receiveEnvironmentErrorType, error});  
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

  addToggle: (projectId, toggleKey, toggleName) => async(dispatch, getState) => {

    dispatch({type: toggleAddRequested});

    let version = getState().project.project.version;

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

    let version = getState().project.project.version;

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
  }

};