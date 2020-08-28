import { reducer } from './Modal';
import * as actions from '../actions/actions';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    modalType: null,
    modalProps: {},
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle SHOW_MODAL', () => {
  const currentState = undefined;

  const action = {
    type: actions.SHOW_MODAL,
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456',
    },
  };

  const expectedNewState = {
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456',
    },
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle SHOW_MODAL', () => {
  const currentState = {
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456',
    },
  };

  const action = actions.hideModal();

  const expectedNewState = {
    modalType: null,
    modalProps: {},
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
