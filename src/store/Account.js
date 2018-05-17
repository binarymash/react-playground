import produce from 'immer';
import { requestProjectsType, receiveProjectsType, receiveProjectsErrorType, projectAddSucceeded } from '../actions/index';

const INITIAL_STATE = { 
  projectList: [],
  isLoading: false,
};

export const getProjectList = (state) => {
  return state.account.projectList.map(project => {
    return {
      id: project.id,
      name: project.name
    }
  });
}

export const getIsLoading = (state) => {
  return state.account.isLoading;
}

export const reducer = produce(
  (draft, action) => {   

    if (action.type === requestProjectsType) {
      draft.isLoading = true;
    }

    if (action.type === receiveProjectsType) {
      draft.isLoading = false;
      draft.projectList = action.json.projects;
    }
  
    if (action.type === receiveProjectsErrorType) {
      draft.isLoading = false;
    }

    if (action.type === projectAddSucceeded) {
      draft.projectList.push({
        'id': action.id,
        'name': action.name
      });     
    }    

  }, 
  INITIAL_STATE
)