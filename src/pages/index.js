import * as React from 'react';
import * as firebase from 'firebase';
import {Helmet} from 'react-helmet';
import { graphql } from 'gatsby';
import IndexPage from '../components/indexPage';
import firebaseConfig from '../config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
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


export default ({ data }) => {
  const { siteName } = data.site.siteMetadata;
  return (
    <div>
      <Helmet>
        {/* General tags */}
        <meta name="description" content="Canner CMS demo" />
        <meta charSet="utf-8"/>
        <title>{siteName}</title>
      </Helmet>
      <IndexPage/>
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
