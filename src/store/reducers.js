import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as Account from './Account';
import * as Project from './Project';
import * as Environment from './Environment';
import * as Toggle from './Toggle';
import * as Strategy from './ClientAccessStrategy';
import * as Modal from './Modal';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),

    account: Account.reducer,
    project: Project.reducer,
    environment: Environment.reducer,
    toggle: Toggle.reducer,
    modal: Modal.reducer,
    strategy: Strategy.reducer
  });

export default createRootReducer;
