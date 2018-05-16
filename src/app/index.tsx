import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import schema from 'canner-schema';

import IndexPage from 'app/containers/indexPage';
import CMSApp from 'app/containers/app';
import Dashboard from 'app/containers/dashboard';

export const App = () => (
  <Switch>
    <Route path="/" exact component={IndexPage}/>
    <Route path="/login" component={CMSApp} />
    <Route path="/dashboard" exact component={(props) => (
      <Redirect to={`/dashboard/${Object.keys(schema.cannerSchema)[0]}`}/>
    )}/>
    <Route path="/dashboard/*" component={Dashboard} />
  </Switch>
);
