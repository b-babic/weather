import {AppRegistry} from 'react-native';
import Root from './src';
import {name as appName} from './app.json';
// Disable yellow container
console.reportErrorsAsExceptions = false;

AppRegistry.registerComponent(appName, () => Root);
