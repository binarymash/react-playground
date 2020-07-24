import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const enhancers = [];
  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
