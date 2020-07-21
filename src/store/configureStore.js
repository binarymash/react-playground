import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Account from './Account';
import * as Project from './Project';
import * as Environment from './Environment';
import * as Toggle from './Toggle';
import * as Strategy from './ClientAccessStrategy';
import * as Modal from './Modal';

export default function configureStore(history, initialState) {
  const reducers = {
    account: Account.reducer,
    project: Project.reducer,
    environment: Environment.reducer,
    toggle: Toggle.reducer,
    modal: Modal.reducer,
    strategy: Strategy.reducer
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
