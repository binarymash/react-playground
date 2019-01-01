import { reducer } from './Modal';
import * as actionTypes from '../actions/types';

it('should return the initial state', () => {
  const currentState = undefined;
  const action = {};
  const expectedNewState = {
    modalType: null,
    modalProps: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle SHOW_MODAL', () => {
  const currentState = undefined;

  const action = {
    type: actionTypes.showModal,
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456'
    }
  };

  const expectedNewState = {
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456'
    }
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});

it('should handle SHOW_MODAL', () => {
  const currentState = {
    modalType: 'SOME_MODAL_TYPE',
    modalProps: {
      a: '123',
      b: '456'
    }
  };

  const action = {
    type: actionTypes.hideModal
  };

  const expectedNewState = {
    modalType: null,
    modalProps: {}
  };

  expect(reducer(currentState, action)).toEqual(expectedNewState);
});
