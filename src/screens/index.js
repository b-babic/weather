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
                  icon={() => <TabIcon icon="weather-hail" />}
                  hideNavBar={true}
                />
                <Scene
                  key="cities"
                  component={Cities}
                  title="Forecast"
                  icon={() => <TabIcon icon="playlist-plus" />}
                  hideNavBar={true}
                />
                <Scene
                  key="addCity"
                  component={AddCity}
                  title="Add city"
                  icon={() => <TabIcon icon="map-marker-plus" />}
                  showLabel={false}
                  hideNavBar={true}
                />
                <Scene
                  key="settings"
                  component={Settings}
                  title="Settings"
                  icon={() => <TabIcon icon="cellphone-settings-variant" />}
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
