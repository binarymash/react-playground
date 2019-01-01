import { reducer } from './Environment';
import * as actionTypes from '../actions/types';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    environments: {},
    environmentStates: {}
  };
  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ENVIRONMENT', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestEnvironment,
    projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
    environmentKey: 'some-environment'
  };

  const expectedNewState = {
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: true
      }
    },
    environmentStates: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENT', () => {
  const currentState = {
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: true
      }
    },
    environmentStates: {}
  };

  const action = {
    type: actionTypes.receiveEnvironment,
    projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
    environmentKey: 'some-environment',
    json: {
      environment: {
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        key: 'some-environment',
        name: 'My First Environment',
        audit: {
          created: '2018-12-27T11:48:19.7507748+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:48:19.7507748+00:00',
          lastModifiedBy: 'SystemUser',
          version: 1
        }
      },
      audit: {
        generated: '2018-12-31T18:09:15.6839632+00:00',
        streamPosition: 6
      }
    }
  };

  const expectedNewState = {
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        environment: {
          projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          key: 'some-environment',
          name: 'My First Environment',
          audit: {
            created: '2018-12-27T11:48:19.7507748+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:48:19.7507748+00:00',
            lastModifiedBy: 'SystemUser',
            version: 1
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.6839632+00:00',
          streamPosition: 6
        },
        isLoading: false
      }
    },
    environmentStates: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENT_ERROR', () => {
  const currentState = {
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: true
      }
    },
    environmentStates: {}
  };

  const action = {
    type: actionTypes.receiveEnvironmentError,
    projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
    environmentKey: 'some-environment',
    error: 'some error'
  };

  const expectedNewState = {
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: false
      }
    },
    environmentStates: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ENVIRONMENTSTATE', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestEnvironmentState,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment'
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENTSTATE', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true
      }
    }
  };

  const actions = {
    type: actionTypes.receiveEnvironmentState,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    json: {
      environmentState: {
        toggleStates: [
          {
            key: 'my-first-toggle',
            value: 'False',
            version: 12
          }
        ]
      },
      audit: {
        generated: '2018-12-31T18:09:15.8617841+00:00',
        streamPosition: 19
      }
    }
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
              version: 12
            }
          ]
        },
        audit: {
          generated: '2018-12-31T18:09:15.8617841+00:00',
          streamPosition: 19
        },
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, actions)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ENVIRONMENTSTATE_ERROR', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true
      }
    }
  };

  const action = {
    type: actionTypes.receiveEnvironmentStateError,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    error: 'some error'
  };

  const expectedNewState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle TOGGLESTATE_UPDATE_SUCCEEDED', () => {
  const currentState = {
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        environmentState: {
          toggleStates: [
            {
              key: 'my-first-toggle',
              value: 'False',
              version: 12
            }
          ]
        },
        audit: {
          generated: '2018-12-31T18:09:15.8617841+00:00',
          streamPosition: 19
        },
        isLoading: false
      }
    }
  };

  const action = {
    type: actionTypes.toggleStateUpdateSucceeded,
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environmentKey: 'my-first-environment',
    toggleKey: 'my-first-toggle',
    value: 'True'
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
              version: undefined
            }
          ]
        },
        audit: undefined,
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
