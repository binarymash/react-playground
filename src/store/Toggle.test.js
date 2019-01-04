import * as toggle from './Toggle';
import * as actionTypes from '../actions/types';

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
    }
  };
};

it('should return isLoading', () => {
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

it('should return toggle', () => {
  const currentState = nominalState();
  const projectId = '8f73d020-96c4-407e-8602-74fd4e2ed08b';
  const toggleKey = 'my-first-toggle';
  const expectedResult = {
    key: 'my-first-toggle',
    name: 'My First Toggle',
    projectId: '8f73d020-96c4-407e-8602-74fd4e2ed08b',
    audit: {
      created: '2018-12-27T11:48:19.8836223+00:00',
      createdBy: 'SystemUser',
      lastModified: '2018-12-27T11:48:19.8836223+00:00',
      lastModifiedBy: 'SystemUser',
      version: 3
    }
  };

  expect(toggle.getToggle(currentState, projectId, toggleKey)).toEqual(
    expectedResult
  );
});

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    toggles: {}
  };

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle REQUEST_TOGGLE', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.requestToggle,
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

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
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
    type: actionTypes.receiveToggle,
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

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
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
    type: actionTypes.receiveToggleError,
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

  expect(toggle.reducer(currentState, action)).toEqual(expectedNewState);
});
