import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
// Screens
import Home from './home';
import Cities from './city';
import AddCity from './city/add';
import Settings from './settings';
// Store
import {observer, inject} from 'mobx-react';
// Components
import {TabIcon} from 'components';
// ThemeProvider
import theme from 'theme/theme';
import {ThemeProvider} from 'theme/context';

@inject('uiStore')
@observer
class Screens extends React.Component {
  render() {
    const {themeVariant} = this.props.uiStore;
    const themeValue = theme[themeVariant] || theme['light'];
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
                  activeTintColor={themeValue.colors.activeIcon}
                  icon={({focused}) => (
                    <TabIcon icon="weather-hail" focused={focused} />
                  )}
                  hideNavBar={true}
                />
                <Scene
                  key="cities"
                  component={Cities}
                  title="Forecast"
                  activeTintColor={themeValue.colors.activeIcon}
                  icon={({focused}) => (
                    <TabIcon icon="playlist-plus" focused={focused} />
                  )}
                  hideNavBar={true}
                />
                <Scene
                  key="addCity"
                  component={AddCity}
                  title="Add city"
                  activeTintColor={themeValue.colors.activeIcon}
                  icon={({focused, title}) => (
                    <TabIcon icon="map-marker-plus" focused={focused} />
                  )}
                  showLabel={false}
                  hideNavBar={true}
                />
                <Scene
                  key="settings"
                  component={Settings}
                  title="Settings"
                  activeTintColor={themeValue.colors.activeIcon}
                  icon={({focused}) => (
                    <TabIcon
                      icon="cellphone-settings-variant"
                      focused={focused}
                    />
                  )}
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
