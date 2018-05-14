const baseUrl = 'http://localhost:2316/api';

export const Api = {

// Read

    getProjects: () => {
        const url = baseUrl + `/projects`;
        return fetch(url).then(function(response){
            if (response.ok){
            return response.json();
            }
            throw new Error('Network response was not ok.');
        })
    },

    getProject: (projectId) => {
        const url = baseUrl + `/projects/${projectId}`;
        return fetch(url).then(function(response){
            if (response.ok){
            return response.json();
            }
            throw new Error('Network response was not ok.')
        });
    },

    getEnvironment: (projectId, environmentKey) => {
        const url = baseUrl + `/projects/${projectId}/environments/${environmentKey}`;
        return fetch(url).then(function(response){
            if (response.ok){
            return response.json();
            }
            throw new Error('Network response was not ok.');
        });  
    },

    getEnvironmentState : (projectId, environmentKey) => {
        const url = baseUrl + `/states/${projectId}/${environmentKey}`;
        return fetch(url).then(function(response){
            if (response.ok){
            return response.json();
            }
            throw new Error('Network response was not ok.');
        });
    },

    getToggle: (projectId, toggleKey) => {
        const url = baseUrl + `/projects/${projectId}/toggles/${toggleKey}`;
        return fetch(url).then(function(response){
            if (response.ok){
            return response.json();
            }
            throw new Error('Network response was not ok.');
        })
    },

// Write

    addToggle: (projectId, toggleKey, toggleName, version) => {
        const url = baseUrl + `/projects/${projectId}/toggles/add`;

        let request = { 
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            "key": toggleKey,
            "name": toggleName,
            "expectedProjectVersion": version
          })};

        return fetch(url, request).then(function (response){
        if (!response.ok){
            throw new Error('Network response was not ok.');      
        }});
    },

    deleteToggle: (projectId, toggleKey, version) => {
        const url = baseUrl + `/projects/${projectId}/toggles/${toggleKey}/delete`;

        let request = { 
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            "expectedProjectVersion": version
          })};

        return fetch(url, request).then(function (response){
        if (!response.ok){
            throw new Error('Network response was not ok.');      
        }});
    },   

    addEnvironment: (projectId, environmentKey, version) => {
        const url = baseUrl + `/projects/${projectId}/environments/add`;

        let request = { 
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            "key": environmentKey,
            "expectedProjectVersion": version
          })};

        return fetch(url, request).then(function (response){
        if (!response.ok){
            throw new Error('Network response was not ok.');      
        }});
    },

    setToggleState: (projectId, environmentKey, toggleKey, version, value) => {
        const url = baseUrl + `/projects/${projectId}/environments/${environmentKey}/toggles/${toggleKey}/change-state`;

        let request = { 
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body: JSON.stringify({
            "expectedToggleStateVersion": version,
            "state": value
          })};
    
        return fetch(url, request).then(function (response){
          if (!response.ok){
            throw new Error('Network response was not ok.');      
        }});
    }
}
