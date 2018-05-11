import produce from 'immer';
import { requestProjectsType, receiveProjectsType, receiveProjectsErrorType } from '../actions/index';

const INITIAL_STATE = { 
  projectList: [],
  isLoading: false,
  error: true
};

export const getProjectList = (state) => {
  return state.account.projectList.map(project => {
    return {
      id: project.id,
      name: project.name
    }
  });
}

export const reducer = produce(
  (draft, action) => {   

    if (action.type === requestProjectsType) {
      draft.isLoading = true;
      draft.isError = false;
    }

    if (action.type === receiveProjectsType) {
      draft.isLoading = false;
      draft.projectList = action.json.projects;
    }
  
    if (action.type ===receiveProjectsErrorType) {
      draft.isLoading = false;
      draft.isError = false;
    }

  }, 
  INITIAL_STATE
)