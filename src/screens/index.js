import React from 'react';
import {View, Text} from 'react-native';
import {Scene, Router, Stack, Tab} from 'react-native-router-flux';
import Home from './home';
import Cities from './city';
import AddCity from './city/add';
import Settings from './settings';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const TabIcon = ({selected, title}) => {
  //TODO: replace with theme colors later
  const tintColor = selected ? '#999999' : '#333';
  function _handleIconName() {
    switch (title) {
      case 'Home':
        return 'wb-sunny';
      case 'Forecast':
        return 'map';
      case 'Settings':
        return 'perm-device-information';
      default:
        return null;
    }
  }
  return <MaterialIcon color={tintColor} size={24} name={_handleIconName()} />;
};

export default class Screens extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Scene key="root" hideNavBar>
            {/* Tab Container */}
            <Scene key="tabBar" tabBarPosition="bottom" tabs={true}>
              <Scene
                key="home"
                component={Home}
                title="Home"
                icon={TabIcon}
                hideNavBar={true}
              />
              <Scene
                key="cities"
                component={Cities}
                title="Forecast"
                icon={TabIcon}
              />
              <Scene
                key="addCity"
                component={AddCity}
                title="Add city"
                icon={TabIcon}
                showLabel={false}
              />
              <Scene
                key="settings"
                component={Settings}
                title="Settings"
                icon={TabIcon}
              />
            </Scene>
            {/* <Screne key="error" component={Error} hideNavBar/> */}
          </Scene>
        </Router>
      </>
    );
  }
}
