import { reducer } from './Account';
import * as actionTypes from '../actions/types';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle INITIALISED', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.initialised
  };

  const expectedNewState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false,
    isInitialised: true
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ACCOUNT', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestAccount
  };

  const expectedNewState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: true
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ACCOUNT', () => {
  const currentState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: true
  };

  const action = {
    type: actionTypes.receiveAccount,
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
  };

  const expectedNewState = {
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
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ACCOUNT_ERROR', () => {
  const currentState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: true
  };

  const action = {
    type: actionTypes.receiveAccountError,
    error: 'some error'
  };

  const expectedNewState = {
    projection: {
      account: {
        projects: []
      }
    },
    isLoading: false
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_ADD_SUCCEEDED', () => {
  const currentState = {
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
  };

  const action = {
    type: actionTypes.projectAddSucceeded,
    id: '8960F481-E25C-442A-AA8B-67A772658D37',
    name: 'Another project'
  };

  const expectedNewState = {
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
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined
        }
      },
      audit: undefined
    },
    isLoading: false
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_DELETE_SUCCEEDED', () => {
  const currentState = {
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
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined
        }
      },
      audit: undefined
    },
    isLoading: false
  };

  const action = {
    type: actionTypes.projectDeleteSucceeded,
    id: '8960F481-E25C-442A-AA8B-67A772658D37'
  };

  const expectedNewState = {
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
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined
        }
      },
      audit: undefined
    },
    isLoading: false
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
