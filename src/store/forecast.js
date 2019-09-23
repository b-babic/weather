import {observable, action, computed} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

export default class ForecastStore {
  @observable value = 'cat';
  @observable persistedValue = 'motor';
  @observable error = '';
  @observable isLoading = false;

  @action setNewValue() {
    this.value = 'dog';
  }

  async setNewValueAndPersist() {
    this.isLoading = true;
    this.persistedValue = 'bike';
    try {
      await AsyncStorage.setItem(
        '@WeatherApp:persistedValue',
        JSON.stringify(this.persistedValue),
      );
      this.isLoading = false;
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
      this.isLoading = false;
    }
  }

  @action setError(msg) {
    this.error = msg;
  }

  //   @computed get isActive() {
  //     return this.fabAction;
  //   }

  //   @action setFabActive() {
  //     this.fabAction = !this.fabAction;
  //   }
}
