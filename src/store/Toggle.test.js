import { reducer } from './Toggle';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    toggles: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_TOGGLE', () => {
  const currentState = undefined;

  const action = {
    type: 'REQUEST_TOGGLE',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-first-toggle'
  };

  const expectedNewState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLE', () => {
  const currentState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true
      }
    }
  };

  const action = {
    type: 'RECEIVE_TOGGLE',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-first-toggle',
    json: {
      toggle: {
        projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
        key: 'my-first-toggle',
        name: 'My First Toggle',
        audit: {
          created: '2018-12-27T11:48:19.8836223+00:00',
          createdBy: 'SystemUser',
          lastModified: '2018-12-27T11:48:19.8836223+00:00',
          lastModifiedBy: 'SystemUser',
          version: 3
        }
      },
      audit: {
        generated: '2018-12-31T18:09:15.782011+00:00',
        streamPosition: 8
      }
    }
  };

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
            version: 3
          }
        },
        audit: {
          generated: '2018-12-31T18:09:15.782011+00:00',
          streamPosition: 8
        },
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle RECEIVE_TOGGLE_ERROR', () => {
  const currentState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: true
      }
    }
  };

  const action = {
    type: 'RECEIVE_TOGGLE_ERROR',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    toggleKey: 'my-first-toggle',
    error: 'some error'
  };

  const expectedNewState = {
    toggles: {
      '8f73d020-96c4-407e-8602-74fd4e2ed08b/my-first-toggle': {
        isLoading: false
      }
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
