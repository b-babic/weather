import {AppRegistry} from 'react-native';
import Root from './src';
import {name as appName} from './app.json';
// Disable yellow container
console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Root);
