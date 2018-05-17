import produce from 'immer';
import { 
  requestProjectType, receiveProjectType, receiveProjectErrorType, 
  toggleAddSucceeded, toggleDeleteSucceeded,
  environmentAddSucceeded, environmentDeleteSucceeded } from '../actions/index';

// Read

export const getIsLoading = (state, projectId) => {
  return state.project.projectsLoading[projectId] === true;
}

export const getProject = (state, projectId) => {
  const project = state.project.projects[projectId];
  if (!project){
    return null;
  }

  return {
    id: project.id,
    name: project.name,
    environments: getEnvironments(project),
    toggles: getToggles(project),
    audit: getAudit(project)
  }
}

const getEnvironments = (project) => {
  if (!project.environments) {
    return [];
  }

  return project.environments.map(environment => getEnvironment(project.id, environment));
}

const getEnvironment = (projectId, environment) => {
  return {
    projectId: projectId,
    key: environment.key
  }
}

const getToggles = (project) => {
  if (!project.toggles) {
    return [];
  }

  return project.toggles.map(toggle => getToggle(project.id, toggle));
}

const getToggle = (projectId, toggle) => {
  return {
    projectId: projectId,
    key: toggle.key,
    name: toggle.name
  }
}

const getAudit = (project) => {
  return {
    created: project.created,
    createdBy: project.createdBy,
    lastModified: project.lastModified,
    lastModifiedBy: project.lastModifiedBy,
    version: project.version
  }
}

// Write

const INITIAL_STATE = {
  projects:{},
  projectsLoading:{},
};

export const reducer = produce(
  (draft, action) => {

    if (action.type === requestProjectType) {
      draft.projectsLoading[action.projectId] = true;
    }

    if (action.type === receiveProjectType) { 
      draft.projectsLoading[action.projectId] = undefined;
      draft.projects[action.json.id] = action.json;     
    }

    if (action.type === receiveProjectErrorType) {
      draft.projectsLoading[action.projectId] = undefined;
    }

    if (action.type === toggleAddSucceeded) {
      draft.projects[action.projectId].toggles.push({
        'key': action.toggleKey,
        'name': action.toggleName,
      });
      draft.projects[action.projectId].version = action.version;
    }

    if (action.type === toggleDeleteSucceeded) {
      draft.projects[action.projectId].toggles.splice(draft.projects[action.projectId].toggles.findIndex(toggle => toggle.key === action.toggleKey), 1);
      draft.projects[action.projectId].version = action.version;
    }

    if (action.type === environmentAddSucceeded) {
      draft.projects[action.projectId].environments.push({
        'key': action.environmentKey,
      });
      draft.projects[action.projectId].version = action.version;
    }

    if (action.type === environmentDeleteSucceeded) {
      draft.projects[action.projectId].environments.splice(draft.projects[action.projectId].environments.findIndex(environment => environment.key === action.environmentKey), 1);
      draft.projects[action.projectId].version = action.version;
    }    

  },
  INITIAL_STATE
)