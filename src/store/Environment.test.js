import { reducer } from './Environment';
import * as actionTypes from '../actions/types';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    environments: {},
    environmentStates: {}
  });
});

it('should handle REQUEST_ENVIRONMENT', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.requestEnvironment,
      projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
      environmentKey: 'some-environment'
    })
  ).toEqual({
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: true
      }
    },
    environmentStates: {}
  });
});

it('should handle RECEIVE_ENVIRONMENT', () => {
  expect(
    reducer(
      {
        environments: {
          '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
            isLoading: true
          }
        },
        environmentStates: {}
      },
      {
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
      }
    )
  ).toEqual({
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
  });
});

it('should handle RECEIVE_ENVIRONMENT_ERROR', () => {
  expect(
    reducer(
      {
        environments: {
          '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
            isLoading: true
          }
        },
        environmentStates: {}
      },
      {
        type: actionTypes.receiveEnvironmentError,
        projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
        environmentKey: 'some-environment',
        error: 'some error'
      }
    )
  ).toEqual({
    environments: {
      '2DBE229D-5318-4AD5-A62E-3F3D260C850F/some-environment': {
        isLoading: false
      }
    },
    environmentStates: {}
  });
});

it('should handle REQUEST_ENVIRONMENTSTATE', () => {
  expect(
    reducer(undefined, {
      type: actionTypes.requestEnvironmentState,
      projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      environmentKey: 'my-first-environment'
    })
  ).toEqual({
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: true
      }
    }
  });
});

it('should handle RECEIVE_ENVIRONMENTSTATE', () => {
  expect(
    reducer(
      {
        environments: {},
        environmentStates: {
          '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
            isLoading: true
          }
        }
      },
      {
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
      }
    )
  ).toEqual({
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
  });
});

it('should handle RECEIVE_ENVIRONMENTSTATE_ERROR', () => {
  expect(
    reducer(
      {
        environments: {},
        environmentStates: {
          '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
            isLoading: true
          }
        }
      },
      {
        type: actionTypes.receiveEnvironmentStateError,
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        environmentKey: 'my-first-environment',
        error: 'some error'
      }
    )
  ).toEqual({
    environments: {},
    environmentStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-environment': {
        isLoading: false
      }
    }
  });
});

it('should handle TOGGLESTATE_UPDATE_SUCCEEDED', () => {
  expect(
    reducer(
      {
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
      },
      {
        type: actionTypes.toggleStateUpdateSucceeded,
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        environmentKey: 'my-first-environment',
        toggleKey: 'my-first-toggle',
        value: 'True'
      }
    )
  ).toEqual({
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
  });
});
