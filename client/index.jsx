import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './reducer';

import App from './app';

ReactDom.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <App />
        </Switch>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root')
);
