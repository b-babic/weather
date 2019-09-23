import React from 'react';
import {Scene, Router, Stack, Tab} from 'react-native-router-flux';
// Store
import {inject, observer} from 'mobx-react';
// Screens
import Home from './home';
import Cities from './city';
import AddCity from './city/add';
import Settings from './settings';

// ThemeProvider
import theme from 'theme/theme';
import {ThemeProvider} from 'theme/context';

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

@inject('uiStore')
@observer
class Screens extends React.Component {
  render() {
    const {themeVariant} = this.props.uiStore;
    const themeValue = theme[themeVariant] || theme['light'];
    console.warn('theme::: ', themeValue);
    return (
      <>
        <ThemeProvider theme={themeValue}>
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
                  hideNavBar={true}
                />
                <Scene
                  key="addCity"
                  component={AddCity}
                  title="Add city"
                  icon={TabIcon}
                  showLabel={false}
                  hideNavBar={true}
                />
                <Scene
                  key="settings"
                  component={Settings}
                  title="Settings"
                  icon={TabIcon}
                  hideNavBar={true}
                />
              </Scene>
              {/* <Screne key="error" component={Error} hideNavBar/> */}
            </Scene>
          </Router>
        </ThemeProvider>
      </>
    );
  }
}

export default Screens;
