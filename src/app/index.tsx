import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as CMSApp } from 'app/containers/App';

export const App = () => (
  <Switch>
    <Route path="/" component={CMSApp} />
  </Switch>
);
