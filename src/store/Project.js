import produce from 'immer';
import * as actions from '../actions/types';

// Read

export const getActiveProjectId = (state) => {
  return state.project.activeProjectId;
};

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
    clientAccessStrategies: getClientAccessStrategies(project),
    audit: project.audit,
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
    let environment = project.environments.find(
      (e) => e.key === environmentKey
    );
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
    let toggle = project.toggles.find((t) => t.key === toggleKey);
    if (toggle) {
      return toggle.name;
    }
  }

  return null;
};

export const getClientAccessStrategyName = (state, projectId, strategyId) => {
  const projection = state.project.projects[projectId];
  let project = undefined;

  if (projection) {
    project = projection.project;
  }

  if (project) {
    let strategy = project.clientAccessStrategies.find(
      (t) => t.id === strategyId
    );
    if (strategy) {
      return strategy.id;
    }
  }

  return null;
};

const getEnvironments = (project) => {
  if (!project.environments) {
    return [];
  }

  return project.environments.map((environment) =>
    getEnvironment(project.id, environment)
  );
};

const getEnvironment = (projectId, environment) => {
  return {
    projectId: projectId,
    key: environment.key,
    name: environment.name,
  };
};

const getToggles = (project) => {
  if (!project.toggles) {
    return [];
  }

  return project.toggles.map((toggle) => getToggle(project.id, toggle));
};

const getToggle = (projectId, toggle) => {
  return {
    projectId: projectId,
    key: toggle.key,
    name: toggle.name,
  };
};

const getClientAccessStrategies = (project) => {
  if (!project.clientAccessStrategies) {
    return [];
  }

  return project.clientAccessStrategies.map((strategy) =>
    getStrategy(project.id, strategy)
  );
};

const getStrategy = (projectId, strategy) => {
  return {
    projectId: projectId,
    id: strategy.id,
    key: strategy.key,
    value: strategy.value,
  };
};

// Write

const INITIAL_STATE = {
  projects: {},
};

const updateAudit = (projection) => {
  projection.audit = undefined;
  projection.project.audit.lastModified = undefined;
  projection.project.audit.lastModifiedBy = undefined;
  projection.project.audit.version = undefined;
};

export const reducer = produce((draft, action) => {
  let projection = draft.projects[action.projectId];

  switch (action.type) {
    case actions.REQUEST_PROJECT:
      if (!projection) {
        projection = {};
        draft.projects[action.projectId] = projection;
      }
      projection.isLoading = true;
      break;

    case actions.RECEIVE_PROJECT:
      draft.projects[action.projectId] = action.data;
      draft.projects[action.projectId].isLoading = false;
      draft.activeProjectId = action.projectId;
      break;

    case actions.RECEIVE_PROJECT_ERROR:
      projection.isLoading = false;
      break;

    case actions.TOGGLE_ADD_SUCCEEDED:
      projection.project.toggles.push({
        key: action.toggleKey,
        name: action.toggleName,
      });

      updateAudit(projection);
      break;

    case actions.TOGGLE_DELETE_SUCCEEDED:
      projection.project.toggles.splice(
        projection.project.toggles.findIndex(
          (toggle) => toggle.key === action.toggleKey
        ),
        1
      );

      updateAudit(projection);
      break;

    case actions.ENVIRONMENT_ADD_SUCCEEDED:
      projection.project.environments.push({
        key: action.environmentKey,
        name: action.environmentName,
      });

      updateAudit(projection);
      break;

    case actions.ENVIRONMENT_DELETE_SUCCEEDED:
      projection.project.environments.splice(
        projection.project.environments.findIndex(
          (environment) => environment.key === action.environmentKey
        ),
        1
      );

      updateAudit(projection);
      break;

    case actions.PROJECT_DELETE_SUCCEEDED:
      draft.projects[action.projectId] = undefined;
      break;

    case actions.CLIENT_ACCESS_STRATEGY_X509_DELETE_SUCCEEDED:
      projection.project.clientAccessStrategies.splice(
        projection.project.clientAccessStrategies.findIndex(
          (strategy) => strategy.id === action.strategyId
        ),
        1
      );

      updateAudit(projection);
      break;

    default:
      break;
  }
}, INITIAL_STATE);
