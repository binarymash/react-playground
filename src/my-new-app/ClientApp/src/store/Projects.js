const requestProjectsType = 'REQUEST_PROJECTS';
const receiveProjectsType = 'RECEIVE_PROJECTS';
const receiveProjectsErrorType = 'RECEIVE_PROJECTS_ERROR';

const initialState = { 
  projects: [], 
  isLoading: false,
  error: true
};

export const actionCreators = {
  requestProjects: (p) => async (dispatch, getState) => {
    if (p.version === getState().projects.version) {
        return;
    }

    dispatch({ type: requestProjectsType });

    const url = `http://localhost:5000/api/projects`;

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
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestProjectsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveProjectsType) {
    return {
      ...state,
      projects: action.json.projects,
      version: action.json.version,
      lastModified: action.json.lastModified,
      lastModifiedBy: action.json.lastModifiedBy,
      isLoading: false,
      error: false
    };
  }

  if (action.type === receiveProjectsErrorType) {
    return {
      ...state,
      isLoading: false,
      error: true
    };
  }

  return state;
};
