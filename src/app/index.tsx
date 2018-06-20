import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import schema from 'canner-schema';

import CMSApp from 'app/containers/app';
import Dashboard from 'app/containers/dashboard';

export const App = () => (
  <Switch>
    <Route path="/" exact component={Dashboard}/>
    <Route path="/login" component={CMSApp} />
    <Route path="/dashboard" exact component={() => (
      <Redirect to={`/dashboard/${Object.keys(schema.schema)[0]}`}/>
    )}/>
    <Route path="/dashboard/:activeKey" component={Dashboard} />
  </Switch>
);
