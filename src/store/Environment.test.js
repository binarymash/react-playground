import { reducer } from './Environment';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    environments: {},
    environmentStates: {}
  });
});

it('should handle REQUEST_ENVIRONMENT', () => {
  expect(
    reducer(undefined, {
      type: 'REQUEST_ENVIRONMENT',
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
        type: 'RECEIVE_ENVIRONMENT',
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
        type: 'RECEIVE_ENVIRONMENT_ERROR',
        projectId: '2DBE229D-5318-4AD5-A62E-3F3D260C850F',
        environmentKey: 'some-environment',
        error: {}
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
