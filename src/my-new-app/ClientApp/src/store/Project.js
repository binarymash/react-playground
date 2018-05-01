const requestProjectType = 'REQUEST_PROJECT';
const receiveProjectType = 'RECEIVE_PROJECT';
const initialState = {
     requested: null,
     project: null,
     isLoading: false
};

export const actionCreators = {
  requestProject: p => async (dispatch, getState) => {
    let currentRequested = getState().project.requested;

    if (currentRequested && p.id === currentRequested.id && p.version === currentRequested.version) {
        return;
    }

    dispatch({ type: requestProjectType, p });

    const url = `http://localhost:5000/api/projects/${p.id}`;
    const response = await fetch(url);
    const responseJson = await response.json();

    dispatch({ type: receiveProjectType, p, responseJson});
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
      requested: {id: action.responseJson.id, version: action.responseJson.version},
      project: action.responseJson,
      isLoading: false
    };
  }

  return state;
};
