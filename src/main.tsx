import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import * as Intl from 'react-intl';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { App } from './app';

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Intl.IntlProvider locale="en">
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Intl.IntlProvider>
  </Provider>
  ,
  document.getElementById('root')
);
