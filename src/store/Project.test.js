import * as project from './Project';
import * as actions from '../actions/actions';

const nominalState = () => {
  return {
    project: {
      projects: {
        '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
          project: {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
            environments: [
              {
                key: 'my-first-environment',
                name: 'My First Environment',
              },
            ],
            toggles: [
              {
                key: 'my-first-toggle',
                name: 'My First Toggle',
              },
            ],
            audit: {
              created: '2018-12-27T11:48:19.6625847+00:00',
              createdBy: 'SystemUser',
              lastModified: '2018-12-27T11:50:03.1484767+00:00',
              lastModifiedBy: 'AnonymousUser',
              version: 5,
            },
          },
          audit: {
            generated: '2018-12-31T18:09:15.8431617+00:00',
            streamPosition: 10,
          },
          isLoading: false,
        },
      },
    },
  };
};

it('should return isLoading', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';

  expect(project.getIsLoading(currentState, projectId)).toEqual(false);

  currentState.project.projects[projectId].isLoading = true;

  expect(project.getIsLoading(currentState, projectId)).toEqual(true);
});

it('should return project', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const expectedResult = {
    id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    name: 'My First Project',
    clientAccessStrategies: [],
    environments: [
      {
        key: 'my-first-environment',
        name: 'My First Environment',
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      },
    ],
    toggles: [
      {
        key: 'my-first-toggle',
        name: 'My First Toggle',
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      },
    ],
    audit: {
      created: '2018-12-27T11:48:19.6625847+00:00',
      createdBy: 'SystemUser',
      lastModified: '2018-12-27T11:50:03.1484767+00:00',
      lastModifiedBy: 'AnonymousUser',
      version: 5,
    },
  };

  expect(project.getProject(currentState, projectId)).toEqual(expectedResult);
});

it('should return project name', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const expectedResult = 'My First Project';

  expect(project.getProjectName(currentState, projectId)).toEqual(
    expectedResult
  );
});

it('should return environment name', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const environmentKey = 'my-first-environment';
  const expectedResult = 'My First Environment';

  expect(
    project.getEnvironmentName(currentState, projectId, environmentKey)
  ).toEqual(expectedResult);
});

it('should return toggle name', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const toggleKey = 'my-first-toggle';
  const expectedResult = 'My First Toggle';

  expect(project.getToggleName(currentState, projectId, toggleKey)).toEqual(
    expectedResult
  );
});

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    projects: {},
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_PROJECT', () => {
  const currentState = undefined;

  const action = actions.requestProject('8f73d020-96c4-407e-8602-74fd4e2ed08b');

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_PROJECT', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveProject(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    {
      project: {
        id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        name: 'My First Project',
        audit: {
          created: '2018-12-27T11:48:19.6625847+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:50:03.1484767+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 5,
        },
        environments: [
          {
            key: 'my-first-environment',
            name: 'My First Environment',
          },
        ],
        toggles: [
          {
            key: 'my-first-toggle',
            name: 'My First Toggle',
          },
        ],
      },
      audit: {
        generated: '2018-12-31T18:09:15.8431617+00:00',
        streamPosition: 10,
      },
    }
  );

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
            version: 5,
          },
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_PROJECT_ERROR', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveProjectError(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'some error'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_ADD_REQUESTED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleAddRequested(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-second-toggle',
    'My Second Toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
              isCreating: true,
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
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
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
              isCreating: true,
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleAddSucceeded(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-second-toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
              isCreating: false,
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined,
          },
        },
        audit: undefined,
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_ADD_FAILED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
              isCreating: true,
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleAddFailed(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-second-toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_DELETE_REQUESTED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleDeleteRequested(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
              isDeleting: true,
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
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
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleDeleteSucceeded(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined,
          },
        },
        audit: undefined,
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLE_DELETE_FAILED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
              isDeleting: true,
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.toggleDeleteFailed(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
              isDeleting: false,
            },
            {
              key: 'my-second-toggle',
              name: 'My Second Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_ADD_REQUESTED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentAddRequested(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment',
    'This is my other environment'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isCreating: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
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
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isCreating: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentAddSucceeded(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isCreating: false,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined,
          },
        },
        audit: undefined,
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_ADD_FAILED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isCreating: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentAddFailed(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment',
    'some error'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_DELETE_REQUESTED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentDeleteRequested(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isDeleting: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
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
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isDeleting: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentDeleteSucceeded(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: undefined,
            lastModifiedBy: undefined,
            version: undefined,
          },
        },
        audit: undefined,
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle ENVIRONMENT_DELETE_FAILED', () => {
  const currentState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isDeleting: true,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.environmentDeleteFailed(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'another-environment'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': {
        project: {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
          environments: [
            {
              key: 'my-first-environment',
              name: 'My First Environment',
            },
            {
              key: 'another-environment',
              name: 'This is my other environment',
              isDeleting: false,
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
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
              name: 'My First Environment',
            },
          ],
          toggles: [
            {
              key: 'my-first-toggle',
              name: 'My First Toggle',
            },
          ],
          audit: {
            created: '2018-12-27T11:48:19.6625847+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:50:03.1484767+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 5,
          },
          isDeleting: true,
        },
        audit: {
          generated: '2018-12-31T18:09:15.8431617+00:00',
          streamPosition: 10,
        },
        isLoading: false,
      },
    },
  };

  const action = actions.projectDeletedSucceeded(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b'
  );

  const expectedNewState = {
    projects: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b': undefined,
    },
  };

  expect(project.reducer(currentState, action)).toEqual(expectedNewState);
});
