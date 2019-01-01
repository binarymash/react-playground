import { reducer } from './Project';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    projects: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_PROJECT', () => {
  const currentState = undefined;

  const action = {
    type: 'REQUEST_PROJECT',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_PROJECT', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true
      }
    }
  };

  const action = {
    type: 'RECEIVE_PROJECT',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    json: {
      project: {
        id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        name: 'My First Project',
        audit: {
          created: '2018-12-27T11:48:19.6625847+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:50:03.1484767+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 5
        },
        environments: [
          {
            key: 'my-first-environment',
            name: 'My First Environment'
          }
        ],
        toggles: [
          {
            key: 'my-first-toggle',
            name: 'My First Toggle'
          }
        ]
      },
      audit: {
        generated: '2018-12-31T18:09:15.8431617+00:00',
        streamPosition: 10
      }
    }
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          },
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ]
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_PROJECT_ERROR', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true
      }
    }
  };

  const action = {
    type: 'RECEIVE_PROJECT_ERROR',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    error: {}
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_ADD_SUCCEEDED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: 'TOGGLE_ADD_SUCCEEDED',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-second-toggle',
    toggleName: 'My Second Toggle'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined
          }
        },
        audit: undefined,
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_DELETE_SUCCEEDED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: 'TOGGLE_DELETE_SUCCEEDED',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-first-toggle'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined
          }
        },
        audit: undefined,
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_ADD_SUCCEEDED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: 'ENVIRONMENT_ADD_SUCCEEDED',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'another-environment',
    environmentName: 'This is my other environment'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            },
            {
              key: 'another-environment',
              name: 'This is my other environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined
          }
        },
        audit: undefined,
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_DELETE_SUCCEEDED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            },
            {
              key: 'another-environment',
              name: 'This is my other environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: 'ENVIRONMENT_DELETE_SUCCEEDED',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'another-environment'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined
          }
        },
        audit: undefined,
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_DELETE_SUCCEEDED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment'
            }
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle'
            }
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: 'PROJECT_DELETE_SUCCEEDED',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b'
  };

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': undefined
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
