import * as React from 'react';
import * as firebase from 'firebase';
import LockScreenLoading from './lockScreenLoading';

export default class IndexPage extends React.Component {
  static async getInitialProps () {
    return {}
  }

  UNSAFE_componentWillMount() {
    if (typeof window !== `undefined`) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          window.location.href = "/login";
        } else {
          window.location.href = "/dashboard";
        }
      });
    }
  }

  render() {
    return (
      <LockScreenLoading/>
    );
  }
}
