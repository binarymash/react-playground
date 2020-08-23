import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as actionTypes from '../actions/types';
import * as Account from './Account';
import * as Project from './Project';
import * as Environment from './Environment';
import * as Toggle from './Toggle';
import * as Strategy from './ClientAccessStrategy';
import * as Modal from './Modal';

const createRootReducer = (history) => {
  const appReducer = combineReducers({
    router: connectRouter(history),

    account: Account.reducer,
    project: Project.reducer,
    environment: Environment.reducer,
    toggle: Toggle.reducer,
    modal: Modal.reducer,
    strategy: Strategy.reducer,
  });

  return (state, action) => {
    if (action.type === actionTypes.reset) {
      const { router } = state;
      state = { router };
    }
    return appReducer(state, action);
  };
};

export default createRootReducer;
