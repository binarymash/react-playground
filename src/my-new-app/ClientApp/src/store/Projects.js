const requestProjectsType = 'REQUEST_PROJECTS';
const receiveProjectsType = 'RECEIVE_PROJECTS';
const initialState = { 
  projects: [], 
  isLoading: false };

export const actionCreators = {
  requestProjects: (p) => async (dispatch, getState) => {
    if (p.version === getState().projects.version) {
        return;
    }

    dispatch({ type: requestProjectsType });

    const url = `http://localhost:5000/api/projects`;
    const response = await fetch(url);
    const responseJson = await response.json();

    dispatch({ type: receiveProjectsType, responseJson });
  }
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
      projects: action.responseJson.projects,
      version: action.responseJson.version,
      lastModified: action.responseJson.lastModified,
      lastModifiedBy: action.responseJson.lastModifiedBy,
      isLoading: false
    };
  }

  return state;
};
