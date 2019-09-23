import {observable, action, computed} from 'mobx';

export default class UiStore {
  @observable isLoading = false;
  @observable error: '';

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
