import {observable, action, computed} from 'mobx';

export default class UiStore {
  @observable isLoading = false;
  @observable error: '';
  @observable themeVariant = 'light';

  @action toggleThemeVariant() {
    this.themeVariant = this.themeVariant === 'light' ? 'dark' : 'light';
  }

  @action toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  @action setLoading() {
    this.isLoading = true;
  }

  @action setLoadingFalse() {
    this.isLoading = false;
  }

  @action setError(msg) {
    this.error = msg;
  }

  @computed get haveErrors() {
    return this.error ? this.error.length > 0 : false;
  }
}
