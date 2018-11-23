import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import common from './common';
import auth from './auth';

const history = createHistory();

const reducer = combineReducers({
  auth,
  common,
  router: connectRouter(history)
});

const routeMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(routeMiddleware, thunk, createLogger());
const store = createStore(reducer, composeWithDevTools(middleware));

export {
  history,
  store
};
