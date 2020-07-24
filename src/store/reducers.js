import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as Account from './Account';
import * as Project from './Project';
import * as Environment from './Environment';
import * as Toggle from './Toggle';
import * as Strategy from './ClientAccessStrategy';
import * as Modal from './Modal';

const createRootReducer = () =>
  combineReducers({
    routing: routerReducer,
    account: Account.reducer,
    project: Project.reducer,
    environment: Environment.reducer,
    toggle: Toggle.reducer,
    modal: Modal.reducer,
    strategy: Strategy.reducer
  });

export default createRootReducer;
