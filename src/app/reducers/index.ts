import { RootState } from './state';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export { RootState };

export default combineReducers<RootState>({
  router: routerReducer as any
});
