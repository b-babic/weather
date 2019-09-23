import {observable, action, computed} from 'mobx';
// Storage persistance
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
// Utils
import {uuid} from 'utils';

export default class ForecastStore {
  constructor() {
    this.getPersistedActiveLocation();
    this.getPersistedLocations();
    AsyncStorage.getItem('@WeatherApp:activeLocation').then(item => {
      this.activeLocation = item;
    });
    console.warn('CONSTRUCTOR:::', this.activeLocation);
  }
  @observable isColdBoot = true;
  @observable value = 'cat';
  @observable persistedValue = 'motor';

  @observable locations = [
    {
      name: 'Zagreb',
      latitude: '45.8132',
      longitude: '15.977',
      active: false,
      id: uuid(),
    },
    {
      name: 'Osijek',
      latitude: '45.5549',
      longitude: '18.6954',
      active: false,
      id: uuid(),
    },
    {
      name: 'Rijeka',
      latitude: '45.3269',
      longitude: '14.441',
      active: false,
      id: uuid(),
    },
    {
      name: 'Zadar',
      latitude: '44.1188',
      longitude: '15.232',
      active: false,
      id: uuid(),
    },
    {
      name: 'Pula',
      latitude: '44.8696',
      longitude: '13.8455',
      active: false,
      id: uuid(),
    },
  ];

  @observable forecast = {
    temperature: '',
    weatherCondition: '',
  };

  @observable activeLocation = {
    name: '',
    latitude: '',
    longitude: '',
    id: '',
  };

  @observable error = '';

  @action setNewValue() {
    this.value = 'dog';
  }

  @action setIsColdBoot() {
    this.isColdBoot = true;
  }

  @action setNewActiveLocationByCityId(toBecomeActiveId, oldActiveId) {
    // Find old one and remove it
    const oldOne = this.locations.filter(item => item.id === oldActiveId)[0];
    if (oldOne) {
      oldOne.active = false;
    }
    // Handle setting new one
    const newOne = this.locations.filter(
      item => item.id === toBecomeActiveId,
    )[0];
    if (newOne) {
      this.fetchWeatherForCurrentActiveLocation();
      this.activeLocation = newOne;
      newOne.active = true;
    }
    this.setActiveLocationAndPersist();
    console.warn('new one selected:::', this.activeLocation, this.locations);
  }

  @action async setCurrentLocation() {
    try {
      await Geolocation.getCurrentPosition(
        position => {
          this.setInitialLocationAndPersist(position.coords);
        },
        error => (this.error = error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } catch (e) {
      console.warn('Error gps grant::: ', e);
    }
  }

  setInitialLocationAndPersist(coords) {
    this.activeLocation = {
      name: 'My current location',
      longitude: coords.longitude,
      latitude: coords.latitude,
      id: uuid(),
      active: true,
    };
    // If cold boot, add this item to the locations
    if (this.isColdBoot) {
      this.locations.push(this.activeLocation);
      this.isColdBoot = false;
    }

    this.setActiveLocationAndPersist();
  }

  async setActiveLocationAndPersist() {
    try {
      AsyncStorage.setItem(
        '@WeatherApp:activeLocation',
        JSON.stringify(this.activeLocation),
      );
      AsyncStorage.setItem(
        '@WeatherApp:locations',
        JSON.stringify(this.locations),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPersistedActiveLocation() {
    const persistedValue = await AsyncStorage.getItem(
      '@WeatherApp:activeLocation',
    );
    if (persistedValue) {
      const parsedValue = JSON.parse(persistedValue);
      this.activeLocation = parsedValue;
    }
  }

  async getPersistedLocations() {
    const persistedValue = await AsyncStorage.getItem('@WeatherApp:locations');
    if (persistedValue) {
      const parsedValue = JSON.parse(persistedValue);
      this.activeLocation = parsedValue;
    }
  }

  async setNewValueAndPersist() {
    this.persistedValue = this.persistedValue === 'bike' ? 'motor' : 'bike';
    try {
      await AsyncStorage.setItem(
        '@WeatherApp:persistedValue',
        JSON.stringify(this.persistedValue),
      );
    } catch (error) {
      console.log(error);
      this.error = error;
      this.isLoading = false;
    }
  }

  async getPersistedValue() {
    const persistedValue = await AsyncStorage.getItem(
      '@WeatherApp:persistedValue',
    );
    if (persistedValue) {
      this.persistedValue = persistedValue;
    }
  }

  @action fetchWeatherForCurrentActiveLocation() {
    const {latitude, longitude} = this.activeLocation;
    const API_KEY = '5817b972e7e6c3386e8c3e0d4d937f9a';
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`,
    )
      .then(resp => resp.json())
      .then(json => {
        this.forecast = {
          temperature: json.main.temp,
          weahterCondition: json.weather[0].main,
        };
      });
  }

  @computed get isActiveLocationEmpty() {
    return (
      this.activeLocation.longitude.length === 0 &&
      this.activeLocation.latitude.length === 0
    );
  }
}
