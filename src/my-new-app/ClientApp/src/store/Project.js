const requestProjectType = 'REQUEST_PROJECT';
const receiveProjectType = 'RECEIVE_PROJECT';
const receiveProjectErrorType = 'RECEIVE_PROJECT_ERROR';

const initialState = {
     requested: null,
     project: null,
     isLoading: false,
     error: false
};

export const actionCreators = {
  requestProject: p => async (dispatch, getState) => {
    let currentRequested = getState().project.requested;

    if (currentRequested && p.id === currentRequested.id && p.version === currentRequested.version) {
        return;
    }

    dispatch({ type: requestProjectType, p });

    const url = `http://localhost:5000/api/projects/${p.id}`;

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
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectType) {
    return {
      ...state,
      requested: action.p,
      isLoading: true
    };
  }

  if (action.type === receiveProjectType) {
    return {
      ...state,   
      requested: {id: action.json.id, version: action.json.version},
      project: action.json,
      isLoading: false
    };
  }

  if (action.type === receiveProjectErrorType) {
    return {
      ...state,  
      isLoading: false,       
      error: true
    };
  } 
  return state;
};
