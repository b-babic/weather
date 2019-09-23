import React, {Component} from 'react';
import {ToastAndroid, Dimensions} from 'react-native';
// Components
import {ForecastData, ProgressiveImage} from 'components';
// Primitives
import {Box} from 'primitives';
// Store
import {inject, observer} from 'mobx-react';
// Storage
import AsyncStorage from '@react-native-community/async-storage';
// Dimensions
const {width, height} = Dimensions.get('screen');

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
      forecast: {temperature, weatherCondition, humidity, tempMin, tempMax},
      error,
    } = this.props.forecastStore;
    const {isLoading} = this.props.uiStore;
    return (
      <Box flex={1}>
        <Box style={{height: height / 3, width: width}}>
          <ProgressiveImage
            source={{
              uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${width *
                2}&buster=${Math.random()}`,
            }}
            thumbnailSource={{
              uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}`,
            }}
            style={{width: width, height: width * 0.7}}
            resizeMode="cover"
          />
        </Box>
        <ForecastData
          isLoading={isLoading}
          error={error}
          name={name}
          longitude={longitude}
          latitude={latitude}
          temperature={temperature}
          weatherCondition={weatherCondition}
          humidity={humidity}
          tempMax={tempMax}
          tempMin={tempMin}
        />
      </Box>
    );
  }
}

export default HomeScreen;
