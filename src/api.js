const baseUrl = 'http://localhost:2316/management-api';

export const Api = {
  // Read

  getProjects: () => {
    const url = `${baseUrl}/projects`;
    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getProject: projectId => {
    const url = `${baseUrl}/projects/${projectId}`;

    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getEnvironment: (projectId, environmentKey) => {
    const url = `${baseUrl}/projects/${projectId}/environments/${environmentKey}/definition`;

    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getEnvironmentState: (projectId, environmentKey) => {
    const url = `${baseUrl}/projects/${projectId}/environments/${environmentKey}/state`;

    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getToggle: (projectId, toggleKey) => {
    const url = `${baseUrl}/projects/${projectId}/toggles/${toggleKey}/definition`;

    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  getToggleState: (projectId, toggleKey) => {
    const url = `${baseUrl}/projects/${projectId}/toggles/${toggleKey}/state`;

    return fetch(url).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    });
  },

  // Write

  addProject: (id, name) => {
    const url = baseUrl + `/projects/create`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        projectId: id,
        name: name
      })
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteProject: projectId => {
    const url = baseUrl + `/projects/${projectId}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({})
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  addToggle: (projectId, toggleKey, toggleName) => {
    const url = baseUrl + `/projects/${projectId}/toggles/add`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        key: toggleKey,
        name: toggleName
      })
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteToggle: (projectId, toggleKey) => {
    const url = baseUrl + `/projects/${projectId}/toggles/${toggleKey}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({})
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  addEnvironment: (projectId, environmentKey, environmentName) => {
    const url = baseUrl + `/projects/${projectId}/environments/add`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        key: environmentKey,
        name: environmentName
      })
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  deleteEnvironment: (projectId, environmentKey) => {
    const url =
      baseUrl + `/projects/${projectId}/environments/${environmentKey}/delete`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({})
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  },

  setToggleEnvironmentState: (projectId, environmentKey, toggleKey, value) => {
    const url =
      baseUrl +
      `/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        state: value
      })
    };

    return fetch(url, request).then(function(response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
    });
  }
};
