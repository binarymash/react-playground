const requestEnvironmentType = 'REQUEST_ENVIRONMENT';
const receiveEnvironmentType = 'RECEIVE_ENVIRONMENT';
const receiveEnvironmentErrorType = 'RECEIVE_ENVIRONMENT_ERROR';

const initialState = {
     requested: null,
     environment: null,
     isLoading: false,
     error: false
};

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
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestEnvironmentType) {
    return {
      ...state,
      requested: action.r,
      isLoading: true
    };
  }

  if (action.type === receiveEnvironmentType) {
    return {
      ...state,   
      requested: {projectId: action.json.projectId, environmentKey: action.json.key, version: action.json.version},
      environment: action.json,
      isLoading: false
    };
  }

  if (action.type === receiveEnvironmentErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  return state;
};
