import React, {Component} from 'react';
import {FlatList, ToastAndroid} from 'react-native';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Components
import {CityStatus, PageHeader} from 'components';
// State hook and theme
import {observer, inject} from 'mobx-react';
import {withTheme} from 'hocs';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// Utils
import isEqual from 'lodash.isequal';
// Storage
import AsyncStorage from '@react-native-community/async-storage';

@inject('forecastStore')
@observer
class ForecastScreen extends Component {
  async componentDidMount() {
    const value = await AsyncStorage.getItem('@WeatherApp:locations');
    if (value) {
      const parsedValue = JSON.parse(value);
      this.props.forecastStore.setLocations(parsedValue);
    }
  }

  _handleCityCardPress = (toBecomeActiveId, oldActiveId) => {
    this.props.forecastStore.setNewActiveLocationByCityId(
      toBecomeActiveId,
      oldActiveId,
    );
    ToastAndroid.show('New city selected.', 500);
  };

  render() {
    const {locations, activeLocation} = this.props.forecastStore;
    const {theme} = this.props;
    return (
      <Box flex={1} bg={theme.colors.bg}>
        <PageHeader />
        <Box mx={3} flex={1} pt={3} pb={3} justifyContent="center">
          <FlatList
            data={locations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginRight: theme.space['2']}}
            renderItem={({item}) => (
              <Box py={2} px={2} mr={2} mb={4} border={0} borderRadius={0}>
                <Touchable
                  onPress={() =>
                    isEqual(item, activeLocation)
                      ? undefined
                      : this._handleCityCardPress(item.id, activeLocation.id)
                  }>
                  <Box alignItems="center" flexDirection="row">
                    <Box mr={4} flex={1}>
                      <MaterialCommunityIcon
                        name="earth"
                        size={32}
                        color={theme.colors.text}
                      />
                    </Box>
                    <Box
                      flex={4}
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection="row">
                      <Box>
                        <Text>{item.name}</Text>
                      </Box>
                      <Box alignItems="center" flex-direction="row">
                        <Box mr={2}>
                          <Text>{item.latitude}</Text>
                        </Box>
                        <Text>{item.longitude}</Text>
                      </Box>
                    </Box>
                    <Box
                      flex={1}
                      justifyContent="flex-end"
                      alignItems="flex-end">
                      <CityStatus isActive={item.active} />
                    </Box>
                  </Box>
                </Touchable>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </Box>
    );
  }
}

export default withTheme(ForecastScreen);
