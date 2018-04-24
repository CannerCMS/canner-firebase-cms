import * as React from 'react';
import { Route, Switch } from 'react-router';

import IndexPage from 'app/containers/indexPage';
import CMSApp from 'app/containers/app';
import Dashboard from 'app/containers/dashboard';

export const App = () => (
  <Switch>
    <Route path="/" exact component={IndexPage}/>
    <Route path="/login" component={CMSApp} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
