import * as React from 'react';
import * as firebase from 'firebase';
import schema from 'canner-schema';
import {RouteComponentProps} from 'react-router';

interface Props extends RouteComponentProps<void> {
}

export default class IndexPage extends React.Component<Props> {

  componentDidMount() {
    const {history, location} = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push({
          pathname: `/dashboard/${Object.keys(schema.cannerSchema)[0]}`,
          state: { from: location }
        })
      } else {
        history.push({
          pathname: "/login",
          state: { from: location }
        })
      }
    })
  }

  render() {
    return null;
  }
}
