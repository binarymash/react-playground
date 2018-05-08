export const requestEnvironmentType = 'REQUEST_ENVIRONMENT';
export const receiveEnvironmentType = 'RECEIVE_ENVIRONMENT';
export const receiveEnvironmentErrorType = 'RECEIVE_ENVIRONMENT_ERROR';

export const requestProjectType = 'REQUEST_PROJECT';
export const receiveProjectType = 'RECEIVE_PROJECT';
export const receiveProjectErrorType = 'RECEIVE_PROJECT_ERROR';

export const requestProjectsType = 'REQUEST_PROJECTS';
export const receiveProjectsType = 'RECEIVE_PROJECTS';
export const receiveProjectsErrorType = 'RECEIVE_PROJECTS_ERROR';

export const requestToggleType = 'REQUEST_TOGGLE';
export const receiveToggleType = 'RECEIVE_TOGGLE';
export const receiveToggleErrorType = 'RECEIVE_TOGGLE_ERROR';

const baseUrl = 'http://localhost:2316/api';

export const actionCreators = {

    requestEnvironment: r => async (dispatch, getState) => {
      let currentRequested = getState().environment.requested;
  
      if (currentRequested && 
        r.environmentKey === currentRequested.environmentKey && 
        r.projectId === currentRequested.projectId &&
        r.version === currentRequested.version) {
          return;
      }
  
      dispatch({ type: requestEnvironmentType, r });
  
      const url = baseUrl + `/projects/${r.projectId}/environments/${r.environmentKey}`;
  
      await fetch(url).then(function(response){
        if (response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then(function(json){
        dispatch({ type: receiveEnvironmentType, r, json});
      }).catch(function(error){
        dispatch({ type: receiveEnvironmentErrorType, error});  
      });
    },
 
    requestProject: p => async (dispatch, getState) => {
      let currentRequested = getState().project.requested;
  
      if (currentRequested && p.id === currentRequested.id && p.version === currentRequested.version) {
          return;
      }
  
      dispatch({ type: requestProjectType, p });
  
      const url = baseUrl + `/projects/${p.id}`;
  
      await fetch(url).then(function(response){
        if (response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then(function(json){
        dispatch({ type: receiveProjectType, p, json});
      }).catch(function(error){
        dispatch({ type: receiveProjectErrorType, error});  
      });
    },

    requestProjects: (p) => async (dispatch, getState) => {
      if (p.version === getState().projects.version) {
          return;
      }
  
      dispatch({ type: requestProjectsType });
  
      const url = baseUrl + `/projects`;
  
      await fetch(url).then(function(response){
        if (response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.');      
      }).then(function(json){
        dispatch({ type: receiveProjectsType, json});      
      }).catch(function(error){
        dispatch({ type: receiveProjectsErrorType, error});  
      });
    },

    requestToggle: r => async (dispatch, getState) => {
      let currentRequested = getState().toggle.requested;
  
      if (currentRequested && 
        r.toggleKey === currentRequested.toggleKey && 
        r.projectId === currentRequested.projectId &&
        r.version === currentRequested.version) {
          return;
      }
  
      dispatch({ type: requestToggleType, r });
  
      const url = baseUrl + `/projects/${r.projectId}/toggles/${r.toggleKey}`;
  
      await fetch(url).then(function(response){
        if (response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then(function(json){
        dispatch({ type: receiveToggleType, r, json});
      }).catch(function(error){
        dispatch({ type: receiveToggleErrorType, error});  
      });
    }

  };