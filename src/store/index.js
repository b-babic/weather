import ForecastStore from './forecast';
import UiStore from './ui';

export default {
  forecastStore: new ForecastStore(),
  uiStore: new UiStore(),
};
