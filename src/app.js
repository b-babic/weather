import React, {Component} from 'react';
import {Provider} from 'mobx-react';
// Screens
import Screens from 'screens';
// Store
import store from 'store';

class AppContainer extends Component {
  render() {
    return (
      <Provider {...store}>
        <Screens />
      </Provider>
    );
  }
}

export default AppContainer;
