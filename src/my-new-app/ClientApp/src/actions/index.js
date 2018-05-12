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

const baseUrl = 'http://localhost:2316/api';

export const actionCreators = {

  requestProjects: () => async (dispatch, getState) => {
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

  selectProject: projectId => async (dispatch, getState) => {

    dispatch({ type: requestProjectType });

    const url = baseUrl + `/projects/${projectId}`;

    await fetch(url).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then(function(json){
      dispatch({ type: receiveProjectType, json});
    }).catch(function(error){
      dispatch({ type: receiveProjectErrorType, error});  
    });
  },

  selectEnvironment: r => async (dispatch, getState) => {
    dispatch({ type: requestEnvironmentType });

    const defUrl = baseUrl + `/projects/${r.projectId}/environments/${r.environmentKey}`;
    const stateUrl = baseUrl + `/states/${r.projectId}/${r.environmentKey}`;

    var defPromise = fetch(defUrl).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });

    var statePromise = fetch(stateUrl).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });

    Promise.all([defPromise, statePromise]).then(function([defJson, stateJson]){
      dispatch({ type: receiveEnvironmentType, defJson, stateJson});
    }).catch(function(error){
      dispatch({ type: receiveEnvironmentErrorType, error});  
    });
  },

  selectToggle: r => async (dispatch, getState) => {
    dispatch({ type: requestToggleType });

    const url = baseUrl + `/projects/${r.projectId}/toggles/${r.toggleKey}`;

    await fetch(url).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then(function(json){
      dispatch({ type: receiveToggleType, json});
    }).catch(function(error){
      dispatch({ type: receiveToggleErrorType, error});  
    });
  },

  setToggleValue: (projectId, environmentKey, toggleKey, version, value) => async(dispatch, getState) => {
    dispatch({type: toggleStateUpdateRequested});

    const url = baseUrl + `/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;

    let newValue = value ? "True" : "False";

    let request = { 
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        "expectedToggleStateVersion": version,
        "state": newValue
      })};

    await fetch(url, request).then(function (response){
      if (response.ok){
        dispatch({ 
          type: toggleStateUpdateSucceeded,
          projectId: projectId,
          environmentKey: environmentKey,
          toggleKey: toggleKey,
          version: version+1,
          value: newValue
        });
        return;
      }
      throw new Error('Network response was not ok.');      
    }).catch(function(error){
      dispatch({ type: toggleStateUpdateFailed, error});  
    });
  }
};