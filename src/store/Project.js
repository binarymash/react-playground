import produce from 'immer';
import {
  requestProjectType,
  receiveProjectType,
  receiveProjectErrorType,
  toggleAddSucceeded,
  toggleDeleteSucceeded,
  environmentAddSucceeded,
  environmentDeleteSucceeded,
  projectDeleteSucceeded
} from '../actions/index';

// Read

export const getIsLoading = (state, projectId) => {
  return state.project.projectsLoading[projectId] === true;
};

export const getProject = (state, projectId) => {
  const project = state.project.projects[projectId];
  if (!project) {
    return null;
  }

  return {
    id: project.id,
    name: project.name,
    environments: getEnvironments(project),
    toggles: getToggles(project),
    audit: getAudit(project)
  };
};

export const getProjectName = (state, projectId) => {
  let project = state.project.projects[projectId];
  if (project) {
    return project.name;
  }
  return null;
};

export const getEnvironmentName = (state, projectId, environmentKey) => {
  let project = state.project.projects[projectId];
  if (project) {
    let environment = project.environments.find(e => e.key === environmentKey);
    if (environment) {
      return environment.name;
    }
  }
  return null;
};

export const getToggleName = (state, projectId, toggleKey) => {
  let project = state.project.projects[projectId];
  if (project) {
    let toggle = project.toggles.find(t => t.key === toggleKey);
    if (toggle) {
      return toggle.name;
    }
  }
  return null;
};

const getEnvironments = project => {
  if (!project.environments) {
    return [];
  }

  return project.environments.map(environment =>
    getEnvironment(project.id, environment)
  );
};

const getEnvironment = (projectId, environment) => {
  return {
    projectId: projectId,
    key: environment.key,
    name: environment.name
  };
};

const getToggles = project => {
  if (!project.toggles) {
    return [];
  }

  return project.toggles.map(toggle => getToggle(project.id, toggle));
};

const getToggle = (projectId, toggle) => {
  return {
    projectId: projectId,
    key: toggle.key,
    name: toggle.name
  };
};

const getAudit = project => {
  return {
    created: project.created,
    createdBy: project.createdBy,
    lastModified: project.lastModified,
    lastModifiedBy: project.lastModifiedBy,
    version: project.version
  };
};

// Write

const INITIAL_STATE = {
  projects: {},
  projectsLoading: {}
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
    case requestProjectType:
      draft.projectsLoading[action.projectId] = true;
      break;

    case receiveProjectType:
      draft.projectsLoading[action.projectId] = undefined;
      draft.projects[action.json.id] = action.json;
      break;

    case receiveProjectErrorType:
      draft.projectsLoading[action.projectId] = undefined;
      break;

    case toggleAddSucceeded:
      draft.projects[action.projectId].toggles.push({
        key: action.toggleKey,
        name: action.toggleName
      });
      draft.projects[action.projectId].version = action.version;
      break;

    case toggleDeleteSucceeded:
      draft.projects[action.projectId].toggles.splice(
        draft.projects[action.projectId].toggles.findIndex(
          toggle => toggle.key === action.toggleKey
        ),
        1
      );
      draft.projects[action.projectId].version = action.version;
      break;

    case environmentAddSucceeded:
      draft.projects[action.projectId].environments.push({
        key: action.environmentKey,
        name: action.environmentName
      });
      draft.projects[action.projectId].version = action.version;
      break;

    case environmentDeleteSucceeded:
      draft.projects[action.projectId].environments.splice(
        draft.projects[action.projectId].environments.findIndex(
          environment => environment.key === action.environmentKey
        ),
        1
      );
      draft.projects[action.projectId].version = action.version;
      break;

    case projectDeleteSucceeded:
      draft.projects[action.projectId] = undefined;
      break;
  }
}, INITIAL_STATE);
