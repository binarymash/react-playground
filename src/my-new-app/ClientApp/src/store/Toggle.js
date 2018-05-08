const requestToggleType = 'REQUEST_TOGGLE';
const receiveToggleType = 'RECEIVE_TOGGLE';
const receiveToggleErrorType = 'RECEIVE_TOGGLE_ERROR';

const initialState = {
     requested: null,
     toggle: null,
     isLoading: false,
     error: false
};

const baseUrl = 'http://localhost:2316/api';

export const actionCreators = {
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

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestToggleType) {
    return {
      ...state,
      requested: action.r,
      isLoading: true
    };
  }

  if (action.type === receiveToggleType) {
    return {
      ...state,   
      requested: {projectId: action.json.projectId, toggleKey: action.json.key, version: action.json.version},
      toggle: action.json,
      isLoading: false
    };
  }

  if (action.type === receiveToggleErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  return state;
};
