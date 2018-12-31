import { reducer } from './Account';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false
  });
});

it('should handle INITIALISED', () => {
  expect(
    reducer(undefined, {
      type: 'INITIALISED'
    })
  ).toEqual({
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false,
    isInitialised: true
  });
});

it('should handle REQUEST_ACCOUNT', () => {
  expect(
    reducer(undefined, {
      type: 'REQUEST_ACCOUNT'
    })
  ).toEqual({
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: true
  });
});

it('should handle RECEIVE_ACCOUNT', () => {
  expect(
    reducer(undefined, {
      type: 'RECEIVE_ACCOUNT',
      json: {
        account: {
          projects: [
            {
              id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
              name: 'My First Project'
            },
            {
              id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
              name: 'my new environment'
            }
          ],
          accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
          audit: {
            created: '2018-12-27T11:48:19.5302129+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T12:01:20.7401734+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 2
          }
        },
        audit: {
          generated: '2018-12-31T16:36:12.5757663+00:00',
          streamPosition: 13
        }
      }
    })
  ).toEqual({
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project'
          },
          {
            id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
            name: 'my new environment'
          }
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2
        }
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13
      }
    },
    isLoading: false
  });
});

it('should handle RECEIVE_ACCOUNT_ERROR', () => {
  expect(
    reducer(undefined, {
      type: 'RECEIVE_ACCOUNT_ERROR'
    })
  ).toEqual({
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false
  });
});

it('should handle PROJECT_ADD_SUCCEEDED', () => {
  expect(
    reducer(
      {
        projection: {
          account: {
            projects: [
              {
                id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
                name: 'My First Project'
              }
            ],
            accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
            audit: {
              created: '2018-12-27T11:48:19.5302129+00:00',
              createdBy: 'SystemUser',
              lastModified: '2018-12-27T12:01:20.7401734+00:00',
              lastModifiedBy: 'AnonymousUser',
              version: 2
            }
          },
          audit: {
            generated: '2018-12-31T16:36:12.5757663+00:00',
            streamPosition: 13
          }
        },
        isLoading: false
      },
      {
        type: 'PROJECT_ADD_SUCCEEDED',
        id: '8960F481-E25C-442A-AA8B-67A772658D37',
        name: 'Another project'
      }
    )
  ).toEqual({
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project'
          },
          {
            id: '8960F481-E25C-442A-AA8B-67A772658D37',
            name: 'Another project'
          }
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2
        }
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13
      }
    },
    isLoading: false
  });
});

it('should handle PROJECT_DELETE_SUCCEEDED', () => {
  expect(
    reducer(
      {
        projection: {
          account: {
            projects: [
              {
                id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
                name: 'My First Project'
              },
              {
                id: '8960F481-E25C-442A-AA8B-67A772658D37',
                name: 'Another project'
              }
            ],
            accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
            audit: {
              created: '2018-12-27T11:48:19.5302129+00:00',
              createdBy: 'SystemUser',
              lastModified: '2018-12-27T12:01:20.7401734+00:00',
              lastModifiedBy: 'AnonymousUser',
              version: 2
            }
          },
          audit: {
            generated: '2018-12-31T16:36:12.5757663+00:00',
            streamPosition: 13
          }
        },
        isLoading: false
      },
      {
        type: 'PROJECT_DELETE_SUCCEEDED',
        id: '8960F481-E25C-442A-AA8B-67A772658D37'
      }
    )
  ).toEqual({
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project'
          }
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2
        }
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13
      }
    },
    isLoading: false
  });
});
