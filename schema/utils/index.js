import firebase from 'firebase';
import {FirebaseClientStorage} from '@canner/storage';
import * as GraphQLinterface from 'canner-graphql-interface';

if (!firebase.apps.length) {
  // Setup connector to connect your services
  firebase.initializeApp({
    apiKey: "AIzaSyDU3UUHg9T2Bu-YqUaYAZIKETpLelLjhPk",
    authDomain: "fir-cms-15f83.firebaseapp.com",
    databaseURL: "https://fir-cms-15f83.firebaseio.com",
    projectId: "fir-cms-15f83",
    storageBucket: "fir-cms-15f83.appspot.com",
    messagingSenderId: "12548835933"
  });
}
const defaultApp = firebase.app();
const connector = new GraphQLinterface.FirebaseRtdbClientConnector({
  database: defaultApp.database()
});

const imageStorage = new FirebaseClientStorage({
  firebase
});



export default {connector, resolver: {}, imageStorage};

