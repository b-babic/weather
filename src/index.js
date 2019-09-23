import React, {Component} from 'react';
import AppContainer from './app';
// Splash
import SplashScreen from 'react-native-splash-screen';

export default class Root extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return <AppContainer />;
  }
}
