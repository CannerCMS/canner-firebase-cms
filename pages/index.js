import * as React from 'react';
import * as firebase from 'firebase';
import IndexPage from '../components/indexPage';
import firebaseConfig from '../config-firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default IndexPage;
