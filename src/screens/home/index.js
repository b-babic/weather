import React, {Component} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
// Store
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

@inject('forecastStore', 'uiStore')
@observer
class HomeScreen extends Component {
  _fetchForecastData = () => {
    this.props.forecastStore
      .fetchWeatherForCurrentActiveLocation()
      .then(forecast => {
        ToastAndroid.show('Forecast data loaded.', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show(
          'Error while calling openWeather api!',
          ToastAndroid.SHORT,
        );
        console.warn('Error while calling openWeather api', err);
      });
  };

  async componentDidMount() {
    const value = await AsyncStorage.getItem('@WeatherApp:activeLocation');

    if (value) {
      const unStringifyValue = JSON.parse(value);
      this.props.forecastStore.setActiveLocation(unStringifyValue);
      const {activeLocation} = this.props.forecastStore;
      if (activeLocation) {
        this._fetchForecastData();
      } else {
        console.warn('No active location choosen. Please go pick a city.');
      }
    } else {
      console.warn('setting current location');
      const currentActive = await this.props.forecastStore.setCurrentLocationToActive();
      if (currentActive) {
        console.warn('current active:: ', currentActive);
        this.props.forecastSTore.addCurrentLocationToList();
        this._fetchForecastData();
      } else {
        console.warn('SOME ERROR::: ');
      }
    }
  }

  render() {
    const {
      activeLocation: {name, longitude, latitude},
      forecast,
      error,
    } = this.props.forecastStore;
    const {isLoading} = this.props.uiStore;
    return (
      <View>
        {isLoading && error.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Loading</Text>
          </View>
        )}

        {error.length > 0 && (
          <View>
            <Text>ERror : {error}</Text>
          </View>
        )}

        {!isLoading && (
          <>
            <View style={{marginBottom: 20}}>
              <Text>Fetching forecast for: {name}</Text>
              <Text>{longitude}</Text>
              <Text>{latitude}</Text>
              <Text>{forecast.temperature}</Text>
              <Text>{forecast.weatherCondition}</Text>
            </View>
          </>
        )}
      </View>
    );
  }
}

export default HomeScreen;
