import { Store, createStore, applyMiddleware } from 'redux';
import { firMiddleware } from 'redux-firebase-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import * as firebase from 'firebase';
import firebaseConfig from 'app/config/firebase';

firebase.initializeApp(firebaseConfig);

export function configureStore(history: History, initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger, routerMiddleware(history), firMiddleware(firebase))

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
