import * as environment from './Environment';
import * as actionTypes from '../actions/types';

const nominalState = () => {
  return {
    environment: {
      environments: {
        '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
          environment: {
            projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            key: 'my-first-environment',
            name: 'My First Environment',
            audit: {
              created: '2018-12-27T11:48:19.7507748+00:00',
              createdBy: 'SystemUser',
              lastModified: '2018-12-27T11:48:19.7507748+00:00',
              lastModifiedBy: 'SystemUser',
              version: 1,
            },
          },
          audit: {
            generated: '2018-12-31T18:09:15.6839632+00:00',
            streamPosition: 6,
          },
          isLoading: false,
        },
      },
      environmentStates: {
        '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
          environmentState: {
            toggleStates: [
              {
                key: 'my-first-toggle',
                value: 'True',
                version: undefined,
              },
            ],
          },
          audit: undefined,
          isLoading: false,
        },
      },
    },
  };
};

it('should return isLoading for environment', () => {
  let currentState = nominalState();
  expect(
    environment.getIsEnvironmentLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-environment'
    )
  ).toEqual(false);

  currentState.environment.environments[
    '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment'
  ].isLoading = true;
  expect(
    environment.getIsEnvironmentLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-environment'
    )
  ).toEqual(true);
});

it('should return isLoading for environment state', () => {
  let currentState = nominalState();
  expect(
    environment.getIsEnvironmentStateLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-environment'
    )
  ).toEqual(false);

  currentState.environment.environmentStates[
    '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment'
  ].isLoading = true;
  expect(
    environment.getIsEnvironmentStateLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-environment'
    )
  ).toEqual(true);
});

it('should return environment', () => {
  let currentState = nominalState();
  //todo: funky stuff going on with needing project to get toggle names
  currentState.project = {
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

  const expectedResult = {
    key: 'my-first-environment',
    name: 'My First Environment',
    toggles: [
      {
        key: 'my-first-toggle',
        name: 'My First Toggle',
        value: true,
        version: undefined, //todo: fix
      },
    ],
    audit: {
      created: '2018-12-27T11:48:19.7507748+00:00',
      createdBy: 'SystemUser',
      lastModified: '2018-12-27T11:48:19.7507748+00:00',
      lastModifiedBy: 'SystemUser',
    },
  };

  expect(
    environment.getEnvironment(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-environment'
    )
  ).toEqual(expectedResult);
});

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    environments: {},
    environmentStates: {},
  };
  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ENVIRONMENT', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestEnvironment,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'some-environment',
  };

  const expectedNewState = {
    environments: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/some-environment': {
        isLoading: true,
      },
    },
    environmentStates: {},
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENT', () => {
  const currentState = {
    environments: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/some-environment': {
        isLoading: true,
      },
    },
    environmentStates: {},
  };

  const action = {
    type: actionTypes.receiveEnvironment,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'some-environment',
    data: {
      environment: {
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        key: 'some-environment',
        name: 'My First Environment',
        audit: {
          created: '2018-12-27T11:48:19.7507748+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:48:19.7507748+00:00',
          lastModifiedBy: 'SystemUser',
          version: 1,
        },
      },
      audit: {
        generated: '2018-12-31T18:09:15.6839632+00:00',
        streamPosition: 6,
      },
    },
  };

  const expectedNewState = {
    environments: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/some-environment': {
        environment: {
          projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          key: 'some-environment',
          name: 'My First Environment',
          audit: {
            created: '2018-12-27T11:48:19.7507748+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:48:19.7507748+00:00',
            lastModifiedBy: 'SystemUser',
            version: 1,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.6839632+00:00',
          streamPosition: 6,
        },
        isLoading: false,
      },
    },
    environmentStates: {},
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENT_ERROR', () => {
  const currentState = {
    environments: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/some-environment': {
        isLoading: true,
      },
    },
    environmentStates: {},
  };

  const action = {
    type: actionTypes.receiveEnvironmentError,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'some-environment',
    error: 'some error',
  };

  const expectedNewState = {
    environments: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/some-environment': {
        isLoading: false,
      },
    },
    environmentStates: {},
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ENVIRONMENTSTATE', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestEnvironmentState,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true,
      },
    },
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENTSTATE', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true,
      },
    },
  };

  const actions = {
    type: actionTypes.receiveEnvironmentState,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    data: {
      environmentState: {
        toggleStates: [
          {
            key: 'my-first-toggle',
            value: 'False',
            version: 12,
          },
        ],
      },
      audit: {
        generated: '2018-12-31T18:09:15.8617841+00:00',
        streamPosition: 19,
      },
    },
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        environmentState: {
          toggleStates: [
            {
              key: 'my-first-toggle',
              value: 'False',
              version: 12,
            },
          ],
        },
        audit: {
          generated: '2018-12-31T18:09:15.8617841+00:00',
          streamPosition: 19,
        },
        isLoading: false,
      },
    },
  };

  expect(environment.reducer(currentState, actions)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENTSTATE_ERROR', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true,
      },
    },
  };

  const action = {
    type: actionTypes.receiveEnvironmentStateError,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    error: 'some error',
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: false,
      },
    },
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLEENVIRONMENTSTATE_UPDATE_SUCCEEDED', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        environmentState: {
          toggleStates: [
            {
              key: 'my-first-toggle',
              value: 'False',
              version: 12,
            },
          ],
        },
        audit: {
          generated: '2018-12-31T18:09:15.8617841+00:00',
          streamPosition: 19,
        },
        isLoading: false,
      },
    },
  };

  const action = {
    type: actionTypes.toggleEnvironmentStateUpdateSucceeded,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    toggleKey: 'my-first-toggle',
    value: 'True',
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        environmentState: {
          toggleStates: [
            {
              key: 'my-first-toggle',
              value: 'True',
              version: undefined,
            },
          ],
        },
        audit: undefined,
        isLoading: false,
      },
    },
  };

  expect(environment.reducer(currentState, action)).toEqual(expectedNewState);
});
