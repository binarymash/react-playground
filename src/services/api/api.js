import { API } from 'aws-amplify';
import { QueriesApi, CommandsApi } from './config';

export const Api = {
  // Read

  getProjects: () => {
    const path = `/projects`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getProject: (projectId) => {
    const path = `/projects/${projectId}`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getEnvironment: (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getEnvironmentState: (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/state`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getToggle: (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getToggleState: (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}/state`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getX509Certificate: (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/${strategyId}`;

    return API.get(QueriesApi, path).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  // Write

  addProject: (id, name) => {
    const path = `/projects/create`;

    const init = {
      body: {
        projectId: id,
        name: name,
      },
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteProject: (projectId) => {
    const path = `/projects/${projectId}/delete`;

    let init = {
      body: {},
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addToggle: (projectId, toggleKey, toggleName) => {
    const path = `/projects/${projectId}/toggles/add`;

    let init = {
      body: {
        key: toggleKey,
        name: toggleName,
      },
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteToggle: (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}/delete`;

    let init = {
      body: {},
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addEnvironment: (projectId, environmentKey, environmentName) => {
    const path = `/projects/${projectId}/environments/add`;

    let init = {
      body: {
        key: environmentKey,
        name: environmentName,
      },
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteEnvironment: (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/delete`;

    let init = {
      body: {},
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  setToggleEnvironmentState: (projectId, environmentKey, toggleKey, value) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;

    let init = {
      body: {
        state: value,
      },
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addClientAccessStrategyX509: (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/add`;

    let init = {
      body: {
        clientAccessStrategyId: strategyId,
      },
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteClientAccessStrategyX509: (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/${strategyId}/delete`;

    let init = {
      body: {},
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },
};
