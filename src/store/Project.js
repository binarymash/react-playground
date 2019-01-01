﻿import produce from 'immer';
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
  const projection = state.project.projects[projectId];
  if (projection) {
    return projection.isLoading;
  }
  return false;
};

export const getProject = (state, projectId) => {
  const projection = state.project.projects[projectId];
  let project = undefined;

  if (projection) {
    project = projection.project;
  }

  if (!project) {
    return null;
  }

  return {
    id: project.id,
    name: project.name,
    environments: getEnvironments(project),
    toggles: getToggles(project),
    audit: project.audit
  };
};

export const getProjectName = (state, projectId) => {
  const projection = state.project.projects[projectId];
  let project = undefined;

  if (projection) {
    project = projection.project;
  }

  if (project) {
    return project.name;
  }

  return undefined;
};

export const getEnvironmentName = (state, projectId, environmentKey) => {
  const projection = state.project.projects[projectId];
  let project = undefined;

  if (projection) {
    project = projection.project;
  }

  if (project) {
    let environment = project.environments.find(e => e.key === environmentKey);
    if (environment) {
      return environment.name;
    }
  }

  return undefined;
};

export const getToggleName = (state, projectId, toggleKey) => {
  const projection = state.project.projects[projectId];
  let project = undefined;

  if (projection) {
    project = projection.project;
  }

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
    created: project.audit.created,
    createdBy: project.audit.createdBy,
    lastModified: project.audit.lastModified,
    lastModifiedBy: project.audit.lastModifiedBy,
    version: project.audit.version
  };
};

// Write

const INITIAL_STATE = {
  projects: {}
};

export const reducer = produce((draft, action) => {
  let projection = undefined;
  let project = undefined;

  switch (action.type) {
    case requestProjectType:
      projection = draft.projects[action.projectId];
      if (!projection) {
        projection = {};
        draft.projects[action.projectId] = projection;
      }
      projection.isLoading = true;
      break;

    case receiveProjectType:
      draft.projects[action.projectId] = action.json;
      draft.projects[action.projectId].isLoading = false;
      break;

    case receiveProjectErrorType:
      draft.projects[action.projectId].isLoading = false;
      break;

    case toggleAddSucceeded:
      projection = draft.projects[action.projectId];
      projection.audit = undefined;
      project = projection.project;
      project.audit.lastModified = undefined;
      project.audit.lastModifiedBy = undefined;
      project.audit.version = undefined;
      project.toggles.push({
        key: action.toggleKey,
        name: action.toggleName
      });
      break;

    case toggleDeleteSucceeded:
      projection = draft.projects[action.projectId];
      projection.audit = undefined;
      project = projection.project;
      project.audit.lastModified = undefined;
      project.audit.lastModifiedBy = undefined;
      project.audit.version = undefined;
      project.toggles.splice(
        project.toggles.findIndex(toggle => toggle.key === action.toggleKey),
        1
      );
      break;

    case environmentAddSucceeded:
      projection = draft.projects[action.projectId];
      projection.audit = undefined;
      project = projection.project;
      project.audit.lastModified = undefined;
      project.audit.lastModifiedBy = undefined;
      project.audit.version = undefined;
      project.environments.push({
        key: action.environmentKey,
        name: action.environmentName
      });
      break;

    case environmentDeleteSucceeded:
      projection = draft.projects[action.projectId];
      projection.audit = undefined;
      project = projection.project;
      project.audit.lastModified = undefined;
      project.audit.lastModifiedBy = undefined;
      project.audit.version = undefined;
      project.environments.splice(
        project.environments.findIndex(
          environment => environment.key === action.environmentKey
        ),
        1
      );
      break;

    case projectDeleteSucceeded:
      draft.projects[action.projectId] = undefined;
      break;
  }
}, INITIAL_STATE);
