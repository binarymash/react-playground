import * as toggle from './Toggle';
import * as actions from '../actions/types';

const nominalState = () => {
  return {
    toggle: {
      toggles: {
        '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
          toggle: {
            projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
            key: 'my-first-toggle',
            name: 'My First Toggle',
            audit: {
              created: '2018-12-27T11:48:19.8836223+00:00',
              createdBy: 'SystemUser',
              lastModified: '2018-12-27T11:48:19.8836223+00:00',
              lastModifiedBy: 'SystemUser',
              version: 3,
            },
          },
          audit: {
            generated: '2018-12-31T18:09:15.782011+00:00',
            streamPosition: 8,
          },
          isLoading: false,
        },
      },
      toggleStates: {
        '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
          toggleState: {
            environmentStates: [
              {
                key: 'my-first-environment',
                value: 'False',
                version: 4,
              },
            ],
          },
          audit: {
            generated: '2019-01-27T16:41:57.24491+00:00',
            streamPosition: 9,
          },
          isLoading: false,
        },
      },
    },
  };
};

it('should return isLoading for toggle', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const toggleKey = 'my-first-toggle';

  expect(toggle.getIsToggleLoading(currentState, projectId, toggleKey)).toEqual(
    false
  );

  currentState.toggle.toggles[
    '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle'
  ].isLoading = true;

  expect(toggle.getIsToggleLoading(currentState, projectId, toggleKey)).toEqual(
    true
  );
});

it('should return isLoading for toggle state', () => {
  let currentState = nominalState();
  expect(
    toggle.getIsToggleStateLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-toggle'
    )
  ).toEqual(false);

  currentState.toggle.toggleStates[
    '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle'
  ].isLoading = true;

  expect(
    toggle.getIsToggleStateLoading(
      currentState,
      '8f73d020-96c4-407e-8602-74fd4e2ed08b',
      'my-first-toggle'
    )
  ).toEqual(true);
});

it('should return toggle', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  //todo: funky stuff going on with needing project to get toggle names
  const toggleKey = 'my-first-toggle';
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
    key: 'my-first-toggle',
    name: 'My First Toggle',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    environments: [
      {
        key: 'my-first-environment',
        name: 'My First Environment',
        value: false,
        version: 4,
      },
    ],
    audit: {
      created: '2018-12-27T11:48:19.8836223+00:00',
      createdBy: 'SystemUser',
      lastModified: '2018-12-27T11:48:19.8836223+00:00',
      lastModifiedBy: 'SystemUser',
      version: 3,
    },
  };

  expect(toggle.getToggle(currentState, projectId, toggleKey)).toEqual(
    expectedResult
  );
});

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    toggles: {},
    toggleStates: {},
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_TOGGLE', () => {
  const currentState = undefined;

  const action = actions.requestToggle(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle'
  );

  const expectedNewState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
    toggleStates: {},
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLE', () => {
  const currentState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveToggle(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle',
    {
      toggle: {
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        key: 'my-first-toggle',
        name: 'My First Toggle',
        audit: {
          created: '2018-12-27T11:48:19.8836223+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:48:19.8836223+00:00',
          lastModifiedBy: 'SystemUser',
          version: 3,
        },
      },
      audit: {
        generated: '2018-12-31T18:09:15.782011+00:00',
        streamPosition: 8,
      },
    }
  );

  const expectedNewState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        toggle: {
          projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
          key: 'my-first-toggle',
          name: 'My First Toggle',
          audit: {
            created: '2018-12-27T11:48:19.8836223+00:00',
            createdBy: 'SystemUser',
            lastModified: '2018-12-27T11:48:19.8836223+00:00',
            lastModifiedBy: 'SystemUser',
            version: 3,
          },
        },
        audit: {
          generated: '2018-12-31T18:09:15.782011+00:00',
          streamPosition: 8,
        },
        isLoading: false,
      },
    },
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLE_ERROR', () => {
  const currentState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveToggleError(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle',
    'some error'
  );

  const expectedNewState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: false,
      },
    },
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_TOGGLESTATE', () => {
  const currentState = undefined;

  const action = actions.requestToggleState(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle'
  );

  const expectedNewState = {
    toggles: {},
    toggleStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLESTATE', () => {
  const currentState = {
    toggles: {},
    toggleStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveToggleState(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle',
    {
      toggleState: {
        environmentStates: [
          {
            key: 'my-first-environment',
            value: 'False',
            version: 4,
          },
        ],
      },
      audit: {
        generated: '2019-01-27T16:41:57.24491+00:00',
        streamPosition: 9,
      },
    }
  );

  const expectedNewState = {
    toggles: {},
    toggleStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        toggleState: {
          environmentStates: [
            {
              key: 'my-first-environment',
              value: 'False',
              version: 4,
            },
          ],
        },
        audit: {
          generated: '2019-01-27T16:41:57.24491+00:00',
          streamPosition: 9,
        },
        isLoading: false,
      },
    },
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLESTATE_ERROR', () => {
  const currentState = {
    toggles: {},
    toggleStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true,
      },
    },
  };

  const action = actions.receiveToggleStateError(
    '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    'my-first-toggle',
    'some error'
  );

  const expectedNewState = {
    toggles: {},
    toggleStates: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: false,
      },
    },
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});
