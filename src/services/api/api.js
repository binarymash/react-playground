import Config from './config.js';

export const Api = {
  // Read

  getProjects: () => {
    const url = `${Config.query.baseUrl}/projects`;
    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getProject: (projectId) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getEnvironment: (projectId, environmentKey) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}/environments/${environmentKey}`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getEnvironmentState: (projectId, environmentKey) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}/environments/${environmentKey}/state`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getToggle: (projectId, toggleKey) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}/toggles/${toggleKey}`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getToggleState: (projectId, toggleKey) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}/toggles/${toggleKey}/state`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  // Write

  addProject: (id, name) => {
    const url = `${Config.command.baseUrl}/projects/create`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        projectId: id,
        name: name,
      }),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteProject: (projectId) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  addToggle: (projectId, toggleKey, toggleName) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/toggles/add`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        key: toggleKey,
        name: toggleName,
      }),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteToggle: (projectId, toggleKey) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/toggles/${toggleKey}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  addEnvironment: (projectId, environmentKey, environmentName) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/environments/add`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        key: environmentKey,
        name: environmentName,
      }),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteEnvironment: (projectId, environmentKey) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/environments/${environmentKey}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  setToggleEnvironmentState: (projectId, environmentKey, toggleKey, value) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        state: value,
      }),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  getX509Certificate: (projectId, strategyId) => {
    const url = `${Config.query.baseUrl}/projects/${projectId}/certificates/${strategyId}`;

    return fetch(url).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  addClientAccessStrategyX509: (projectId, strategyId) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/certificates/add`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        clientAccessStrategyId: strategyId,
      }),
    };

    return fetch(url, request).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  deleteClientAccessStrategyX509: (projectId, strategyId) => {
    const url = `${Config.command.baseUrl}/projects/${projectId}/certificates/${strategyId}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    };

    return fetch(url, request).then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },
};
