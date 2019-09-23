import React, {Component} from 'react';
import {FlatList, Dimensions, ToastAndroid} from 'react-native';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Components
import Search from 'components/search';
// State hook and theme
import {observer, inject} from 'mobx-react';
import {withTheme} from 'hocs';
// Dimensions
const {width, height} = Dimensions.get('screen');
// Icons
import FeatherIcon from 'react-native-vector-icons/Feather';
// Utils
import algoliasearch from 'algoliasearch/reactnative';
import {keys, uuid, containsObject} from 'utils';

@inject('forecastStore')
@observer
class CityAddScreen extends Component {
  constructor(props) {
    super(props);
    // Local state
    this.state = {textSearch: '', search: {hits: []}};
    // Bind methods and initialize search with algolia
    this._searchResults = this._searchResults.bind(this);
    this.places = algoliasearch.initPlaces(keys.algoliaAppId, keys.algoliaKey);
    this._searchResults(this.state.textSearch);
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

  _searchResults = term => {
    var finalOptions = {};
    // If user set options we use them
    if (this.props.options) {
      finalOptions = this.props.options;
    }

    // Add query item to options
    finalOptions.query = term;

    this.places
      .search(finalOptions)
      .then(res => {
        console.warn('hits:: ', res.hits);
        this.setState({search: {hits: res.hits}, textSearch: term});
      })
      .catch(err => {
        this.onSearchError(err);
      });
  };

  async onSearchError(err) {
    if (this.props.onSearchError) {
      await this.props.onSearchError(err);
    }
  }

  _handleAddingNewCity = (name, latitude, longitude, id) => {
    debugger;
    const {forecastStore} = this.props;
    const cityObjectToAppend = {
      name: name,
      latitude: latitude,
      longitude: longitude,
      active: false,
      id: id,
    };
    if (containsObject(cityObjectToAppend, forecastStore.locations)) {
      console.warn('City already exists::: ');
      return;
    }

    this.props.forecastStore.appendNewCityToTheLocations(cityObjectToAppend);
    ToastAndroid.show(
      `${name} successfully added to the list!`,
      ToastAndroid.SHORT,
    );
  };

  _returnListItemName = item => {
    if (item.locale_names instanceof Array) {
      return item.locale_names[0] || item.locale_names.default[0];
    } else if (item.city !== undefined && item.city.length > 0) {
      return item.city.default;
    } else if (item.administrative !== undefined) {
      return item.administrative[0];
    } else if (typeof item.country === 'string') {
      return item.country || item.country.default;
    }
  };

  render() {
    const {theme} = this.props;
    const {
      search: {hits},
    } = this.state;
    const haveData = hits && hits.length > 0;
    return (
      <Box flex={1}>
        {this._renderHeader()}
        <Box mx={3} flex={1} pt={3} pb={3}>
          <Search
            placeholder="Type a message to search"
            onChangeText={term => {
              this._searchResults(term);
            }}
          />
          {haveData && (
            <FlatList
              data={hits}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginRight: 2}}
              renderItem={({item}) => {
                const itemName = this._returnListItemName(item);
                if (!itemName) return;
                console.warn('passing to press', itemName);
                return (
                  <Box
                    py={2}
                    px={2}
                    mr={2}
                    mb={4}
                    border={0}
                    borderRadius={0}
                    bg={theme.colors.white}>
                    <Touchable
                      onPress={() =>
                        this._handleAddingNewCity(
                          itemName,
                          item._geoloc.lat,
                          item._geoloc.lng,
                          item.objectID,
                        )
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
                          alignItems="center">
                          <Box>
                            <Text textColor={theme.colors.text}>
                              {item.locale_names instanceof Array
                                ? item.locale_names[0]
                                : item.locale_names.default[0]}
                            </Text>
                            <Text textColor={theme.colors.inactiveText}>
                              {'  -  ' +
                                (item.city !== undefined
                                  ? item.city[0] + ', '
                                  : '') +
                                (item.administrative !== undefined
                                  ? item.administrative[0] + ', '
                                  : '') +
                                (typeof item.country === 'string'
                                  ? item.country
                                  : item.country.default)}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Touchable>
                  </Box>
                );
              }}
              keyExtractor={item => item.id}
            />
          )}

          {!haveData && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text fontSize={4} textColor={theme.colors.text}>
                No data yet. Please search something.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default withTheme(CityAddScreen);
