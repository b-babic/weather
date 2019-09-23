import React, {Component} from 'react';
import {FlatList, Dimensions, ToastAndroid} from 'react-native';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Components
import {CityStatus} from 'components';
// State hook and theme
import {observer, inject} from 'mobx-react';
import {withTheme} from 'hocs';
// Dimensions
const {width, height} = Dimensions.get('screen');
// Icons
import FeatherIcon from 'react-native-vector-icons/Feather';
// Utils
import isEqual from 'lodash.isequal';
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

  _renderHeader = () => {
    const {theme} = this.props;
    return (
      <Box
        bg={theme.colors.bg}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        height={height * 0.1}
        width={width}
        px="2">
        <Box flex={1}>
          <Touchable>
            <FeatherIcon
              name="arrow-left"
              size={theme.fontSizes[4]}
              color={theme.colors.text}
            />
          </Touchable>
        </Box>

        <Box flex={1} alignItems="center">
          <Text fontSize={2} color={theme.colors.text}>
            Filter
          </Text>
        </Box>
        <Box flex={1} alignItems="flex-end">
          <Touchable disabled activeOpacity={0.2}>
            <FeatherIcon
              name="plus"
              color={theme.colors.text}
              size={theme.fontSizes[4]}
            />
          </Touchable>
        </Box>
      </Box>
    );
  };

  _handleCityCardPress = (toBecomeActiveId, oldActiveId) => {
    this.props.forecastStore.setNewActiveLocationByCityId(
      toBecomeActiveId,
      oldActiveId,
    );
    ToastAndroid.show('New city selected.', 500);

    // if (state.thereIsNewData) {
    //   ToastAndroid.show('New city selected.', 500);
    // } else {
    //   ToastAndroid.show('Error selecting new city', 500);
    // }
  };

  render() {
    const {locations, activeLocation} = this.props.forecastStore;
    const {theme} = this.props;
    return (
      <Box flex={1}>
        {this._renderHeader()}
        <Box mx={3} flex={1} pt={3} pb={3} justifyContent="center">
          <FlatList
            data={locations}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginRight: 2}}
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
                      <FeatherIcon
                        name="home"
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
