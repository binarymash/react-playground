import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as actions from '../actions/actions';
import * as Account from './Account';
import * as Project from './Project';
import * as Environment from './Environment';
import * as Toggle from './Toggle';
import * as Strategy from './ClientAccessStrategy';
import * as Ui from './Ui';

const createRootReducer = (history) => {
  const appReducer = combineReducers({
    router: connectRouter(history),

    account: Account.reducer,
    project: Project.reducer,
    environment: Environment.reducer,
    toggle: Toggle.reducer,
    strategy: Strategy.reducer,
    ui: Ui.reducer,
  });

  return (state, action) => {
    if (action.type === actions.reset) {
      const { router } = state;
      state = { router };
    }
    return appReducer(state, action);
  };
};

export default createRootReducer;
