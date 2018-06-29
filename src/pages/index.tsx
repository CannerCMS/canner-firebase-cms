import * as React from 'react';
import {Helmet} from 'react-helmet';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
// import { Route, Switch, Redirect } from 'react-router';
// import schema from 'canner-schema';

// import Helmet from 'react-helmet';

// import CMSApp from 'app/containers/app';
// import Dashboard from 'app/containers/dashboard';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

// prepare store
const history = createBrowserHistory();
const store = configureStore(history);

export default ({ data }: IndexPageProps) => {
  return (
    <div>
      <Helmet>
        {/* General tags */}
        <meta name="description" content="Canner CMS demo" />
        <meta charSet="utf-8"/>
        <title>Canner + Firebase demo</title>
      </Helmet>

      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </div>
  );
};

// <Switch>
//     <Route path="/" exact component={Dashboard}/>
//     <Route path="/login" component={CMSApp} />
//     <Route path="/dashboard" exact component={() => (
//       <Redirect to={`/dashboard/${Object.keys(schema.schema)[0]}`}/>
//     )}/>
//     <Route path="/dashboard/:activeKey" component={Dashboard} />
//   </Switch>
