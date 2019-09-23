import React, {Component} from 'react';
import {View, Text} from 'react-native';
// Store
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

@inject('forecastStore', 'uiStore')
@observer
class HomeScreen extends Component {
  getAll = () => {
    return Promise.all(
      AsyncStorage.getAllKeys().then(ks => {
        console.warn('asyn keys', ks);
        ks.map(k => {
          AsyncStorage.getItem(k);
        });
      }),
    );
  };

  _fetchForecastData = () => {
    this.props.forecastStore
      .fetchWeatherForCurrentActiveLocation()
      .then(forecast => {
        // Call set forecast
      })
      .catch(err => {
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
      this.props.forecastStore.setCurrentLocation();
      this.props.forecastSTore.addCurrentLocationToList();
      const {activeLocation} = this.props.forecastStore;
      if (activeLocation) {
        this._fetchForecastData();
      }
    }

    // this.getAll()
    //   .then(items => {
    //     if (items.length === 0) {
    //       // Fetch current location and set as active
    //       this.props.forecastStore.setCurrentLocation();
    //     }
    //     console.warn('items generated from asnc storage on load::: ', items);
    //   })
    //   .catch(err => {
    //     console.warn('Error while getting items from the phone storage.');
    //   });
    // // Handle retrieveing data
    // // Check storage
    // const {isActiveLocationEmpty, error} = this.props.forecastStore;
    // try {
    //   await this.props.forecastStore.getPersistedActiveLocation();
    // } catch (err) {
    //   // hehe
    // }
    // // const location = await this.props.forecastStore.getPersistedActiveLocation();
    // // console.warn('CHECK NOW::: ', location);
    // // try {
    // //   await this.props.forecastStore.getPersistedActiveLocation();
    // // } catch (e) {
    // //   console.warn('error while running store actions');
    // // }
    // // try {
    // //   await this.props.forecastStore.getPersistedActiveLocation();
    // // } catch (e) {
    // //   this.props.uiStore.setError(
    // //     'Error while getting initial location. Please try again',
    // //   );
    // // }
    // console.warn('empty:: ', isActiveLocationEmpty);
    // console.warn('error::: ', error);
    // // There is no currently selected active location
    // // Could be cold boot or gps deny grant ?
    // // Either way try to get gps coordinates and set to active
    // if (isActiveLocationEmpty) {
    //   try {
    //     await this.props.forecastStore.setCurrentLocation();
    //   } catch (e) {
    //     this.props.uiStore.setError(
    //       'Error granting gps for current location. Please try again!',
    //     );
    //     console.warn('error while setting gps::: ', e);
    //   }
    // }
    // // If there is location in fact
    // // Just call forecast and fetch data
    // // this.props.forecastStore.getForecastData()
    // this.props.uiStore.setLoading();
    // this.props.forecastStore
    //   .fetchWeatherForCurrentActiveLocation()
    //   .then(resp => {
    //     this.props.uiStore.setLoadingFalse();
    //   })
    //   .catch(err => {
    //     this.props.forecastStore.setError(
    //       'Error while connecting to the api. Please try again',
    //     );
    //   });
  }

  _handleNewPersistedValue = async () => {
    this.props.uiStore.setLoading();
    await this.props.forecastStore.setNewValueAndPersist();
    this.props.uiStore.setLoadingFalse();
  };

  _handleNewValue = () => {
    this.props.uiStore.toggleLoading();
    this.props.forecastStore.setNewValue();
    this.props.uiStore.setLoadingFalse();
  };

  render() {
    const {
      activeLocation: {name, longitude, latitude},
      forecast,
      error,
    } = this.props.forecastStore;
    console.warn('store', this.props.forecastStore);
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
