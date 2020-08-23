import { API } from 'aws-amplify';
import { QueriesApi, CommandsApi } from './config';
import { Auth } from 'aws-amplify';

export const SessionError = 'SESSION_ERROR';

const authorization = () => {
  return Auth.currentSession()
    .then((session) => {
      return {
        headers: {
          Authorization: `Bearer ${session.getAccessToken().getJwtToken()}`,
          // Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
        },
      };
    })
    .catch((error) => {
      Auth.signOut();
      throw new Error(SessionError);
    });
};

export const Api = {
  // Read

  getProjects: async () => {
    const path = `/projects`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getProject: async (projectId) => {
    const path = `/projects/${projectId}`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getEnvironment: async (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getEnvironmentState: async (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/state`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getToggle: async (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getToggleState: async (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}/state`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  getX509Certificate: async (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/${strategyId}`;
    const init = await authorization();

    return API.get(QueriesApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  // Write

  addProject: async (id, name) => {
    const path = `/projects/create`;
    const auth = await authorization();

    const init = {
      body: {
        projectId: id,
        name: name,
      },
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteProject: async (projectId) => {
    const path = `/projects/${projectId}/delete`;
    const auth = await authorization();

    let init = {
      body: {},
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addToggle: async (projectId, toggleKey, toggleName) => {
    const path = `/projects/${projectId}/toggles/add`;
    const auth = await authorization();

    let init = {
      body: {
        key: toggleKey,
        name: toggleName,
      },
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteToggle: async (projectId, toggleKey) => {
    const path = `/projects/${projectId}/toggles/${toggleKey}/delete`;
    const auth = await authorization();

    let init = {
      body: {},
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addEnvironment: async (projectId, environmentKey, environmentName) => {
    const path = `/projects/${projectId}/environments/add`;
    const auth = await authorization();

    let init = {
      body: {
        key: environmentKey,
        name: environmentName,
      },
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteEnvironment: async (projectId, environmentKey) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/delete`;
    const auth = await authorization();

    let init = {
      body: {},
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  setToggleEnvironmentState: async (
    projectId,
    environmentKey,
    toggleKey,
    value
  ) => {
    const path = `/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;
    const auth = await authorization();

    let init = {
      body: {
        state: value,
      },
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  addClientAccessStrategyX509: async (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/add`;
    const auth = await authorization();

    let init = {
      body: {
        clientAccessStrategyId: strategyId,
      },
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },

  deleteClientAccessStrategyX509: async (projectId, strategyId) => {
    const path = `/projects/${projectId}/certificates/${strategyId}/delete`;
    const auth = await authorization();

    let init = {
      body: {},
      ...auth,
    };

    return API.post(CommandsApi, path, init).catch((error) => {
      throw new Error(error.response.status);
    });
  },
};
