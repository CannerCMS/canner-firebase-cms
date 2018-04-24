import * as React from 'react';
import * as firebase from 'firebase';

export default class Dashboard extends React.Component<{}> {
  render() {
    console.log(firebase.auth().currentUser)
    return (
      <div>
        Dashboard
      </div>
    );
  }
}
