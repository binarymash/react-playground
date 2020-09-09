import * as account from './Account';
import * as actions from '../actions/actions';

const nominalState = () => {
  return {
    account: {
      projection: {
        account: {
          projects: [
            {
              id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
              name: 'My First Project',
            },
            {
              id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
              name: 'my new environment',
            },
          ],
          accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
          audit: {
            created: '2018-12-27T11:48:19.5302129+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T12:01:20.7401734+00:00',
            lastModifiedBy: 'AnonymousUser',
            version: 2,
          },
        },
        audit: {
          generated: '2018-12-31T16:36:12.5757663+00:00',
          streamPosition: 13,
        },
      },
      isLoading: false,
    },
  };
};

it('should return projects', () => {
  const currentState = nominalState();

  const expectedResult = [
    {
      id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      name: 'My First Project',
    },
    {
      id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
      name: 'my new environment',
    },
  ];

  expect(account.getProjects(currentState)).toEqual(expectedResult);
});

it('should return audit', () => {
  const currentState = nominalState();
  const expectedResult = {
    created: '2018-12-27T11:48:19.5302129+00:00',
    createdBy: 'SystemUser',
    lastModified: '2018-12-27T12:01:20.7401734+00:00',
    lastModifiedBy: 'AnonymousUser',
    version: 2,
  };
  expect(account.getAudit(currentState)).toEqual(expectedResult);
});

it('should return isInitialised', () => {
  const currentState = nominalState();
  expect(account.getIsInitialised(currentState)).toEqual(false);

  currentState.account.isInitialised = true;
  expect(account.getIsInitialised(currentState)).toEqual(true);
});

it('should return isLoading', () => {
  const currentState = nominalState();
  expect(account.getIsLoading(currentState)).toEqual(false);

  currentState.account.isLoading = true;
  expect(account.getIsLoading(currentState)).toEqual(true);
});

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle INITIALISED', () => {
  const currentState = undefined;

  const action = actions.initialised();

  const expectedNewState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: false,
    isInitialised: true,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_ACCOUNT', () => {
  const currentState = undefined;

  const action = actions.requestAccount();

  const expectedNewState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: true,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ACCOUNT', () => {
  const currentState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: true,
  };

  const action = actions.receiveAccount({
    account: {
      projects: [
        {
          id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          name: 'My First Project',
        },
        {
          id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
          name: 'my new environment',
        },
      ],
      accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
      audit: {
        created: '2018-12-27T11:48:19.5302129+00:00',
        createdBy: 'SystemUser',
        lastModified: '2018-12-27T12:01:20.7401734+00:00',
        lastModifiedBy: 'AnonymousUser',
        version: 2,
      },
    },
    audit: {
      generated: '2018-12-31T16:36:12.5757663+00:00',
      streamPosition: 13,
    },
  });

  const expectedNewState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
          {
            id: '1fbde650-09cf-11e9-8a6f-775854a0b1e9',
            name: 'my new environment',
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2,
        },
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13,
      },
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_ACCOUNT_ERROR', () => {
  const currentState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: true,
  };

  const action = actions.receiveAccountError('some error');

  const expectedNewState = {
    projection: {
      account: {
        projects: [],
      },
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_ADD_REQUESTED', () => {
  const currentState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2,
        },
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13,
      },
    },
    isLoading: false,
  };

  const action = actions.projectAddRequested(
    '8960F481-E25C-442A-AA8B-67A772658D37',
    'Another project'
  );

  const expectedNewState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
          {
            id: '8960F481-E25C-442A-AA8B-67A772658D37',
            name: 'Another project',
            isCreating: true,
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined,
        },
      },
      audit: undefined,
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_ADD_SUCCEEDED', () => {
  const currentState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
          {
            id: '8960F481-E25C-442A-AA8B-67A772658D37',
            name: 'Another project',
            isCreating: true,
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T12:01:20.7401734+00:00',
          lastModifiedBy: 'AnonymousUser',
          version: 2,
        },
      },
      audit: {
        generated: '2018-12-31T16:36:12.5757663+00:00',
        streamPosition: 13,
      },
    },
    isLoading: false,
  };

  const action = actions.projectAddSucceeded(
    '8960F481-E25C-442A-AA8B-67A772658D37'
  );

  const expectedNewState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
          {
            id: '8960F481-E25C-442A-AA8B-67A772658D37',
            name: 'Another project',
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined,
        },
      },
      audit: undefined,
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle PROJECT_DELETE_SUCCEEDED', () => {
  const currentState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
          {
            id: '8960F481-E25C-442A-AA8B-67A772658D37',
            name: 'Another project',
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined,
        },
      },
      audit: undefined,
    },
    isLoading: false,
  };

  const action = actions.projectDeletedSucceeded(
    '8960F481-E25C-442A-AA8B-67A772658D37'
  );

  const expectedNewState = {
    projection: {
      account: {
        projects: [
          {
            id: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            name: 'My First Project',
          },
        ],
        accountId: 'e70fd009-22c4-44e0-ab13-2b6edaf0bbdb',
        audit: {
          created: '2018-12-27T11:48:19.5302129+00:00',
          createdBy: 'SystemUser',
          lastModified: undefined,
          lastModifiedBy: undefined,
          version: undefined,
        },
      },
      audit: undefined,
    },
    isLoading: false,
  };

  expect(account.reducer(currentState, action)).toEqual(expectedNewState);
});
