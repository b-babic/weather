import React, {Component} from 'react';
import {FlatList, ToastAndroid, ActivityIndicator} from 'react-native';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Components
import {SearchInput} from 'components';
import {PageHeader} from 'components';
// State hook and theme
import {observer, inject} from 'mobx-react';
import {withTheme} from 'hocs';
// Utils
import algoliasearch from 'algoliasearch/reactnative';
import {keys, containsObject} from 'utils';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

@inject('forecastStore')
@observer
class CityAddScreen extends Component {
  constructor(props) {
    super(props);
    // Local state
    this.state = {
      textSearch: '',
      search: {hits: []},
      isLoading: false,
      error: '',
    };
    // Bind methods and initialize search with algolia
    this._searchResults = this._searchResults.bind(this);
    this.places = algoliasearch.initPlaces(keys.algoliaAppId, keys.algoliaKey);
    this._searchResults(this.state.textSearch);
  }
  _searchResults = term => {
    var finalOptions = {};
    // If user set options we use them
    if (this.props.options) {
      finalOptions = this.props.options;
    }

    // Add query item to options
    finalOptions.query = term;
    this.setState({isLoading: true});
    this.places
      .search(finalOptions)
      .then(res => {
        console.warn('hits:: ', res.hits);
        this.setState({
          search: {hits: res.hits},
          textSearch: term,
          isLoading: false,
        });
      })
      .catch(err => {
        this.onSearchError(err);
      });
  };

  async onSearchError(err) {
    this.setState({error: err});
    if (this.props.onSearchError) {
      await this.props.onSearchError(err);
    }
  }

  _handleAddingNewCity = (name, latitude, longitude, id) => {
    const {forecastStore} = this.props;
    const cityObjectToAppend = {
      name: name,
      latitude: latitude,
      longitude: longitude,
      active: false,
      id: id,
    };
    if (
      containsObject(forecastStore.locations, 'id', cityObjectToAppend) !== -1
    ) {
      ToastAndroid.show(
        `${name} already exists in your locations!`,
        ToastAndroid.SHORT,
      );
    } else {
      this.props.forecastStore.appendNewCityToTheLocations(cityObjectToAppend);
      ToastAndroid.show(
        `${name} successfully added to the list!`,
        ToastAndroid.SHORT,
      );
    }
  };

  render() {
    const {theme} = this.props;
    const {
      search: {hits},
      isLoading,
      error,
    } = this.state;
    const haveData = hits && hits.length > 0 && !isLoading;

    return (
      <Box flex={1} bg={theme.colors.bg}>
        <PageHeader />
        <Box mx={3} flex={1} pt={3} pb={3}>
          <SearchInput
            placeholder="Type a message to search"
            onChangeText={term => {
              this._searchResults(term);
            }}
          />
          {haveData && (
            <FlatList
              data={hits}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginRight: theme.space[1]}}
              renderItem={({item}) => {
                const itemName =
                  item.locale_names instanceof Array
                    ? item.locale_names[0]
                    : item.locale_names.default[0];
                if (!itemName) return;
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
                          item.locale_names instanceof Array
                            ? item.locale_names[0]
                            : item.locale_names.default[0],
                          item._geoloc.lat,
                          item._geoloc.lng,
                          item.objectID,
                        )
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
                          alignItems="center">
                          <Box>
                            <Text color={theme.colors.text}>
                              {item.locale_names instanceof Array
                                ? item.locale_names[0]
                                : item.locale_names.default[0]}
                            </Text>
                            <Text color={theme.colors.inactiveText}>
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

          {isLoading && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator size="large" color={theme.colors.activeIcon} />
            </Box>
          )}

          {!haveData && !isLoading && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text fontSize={4} color={theme.colors.text}>
                No data yet. Please search something.
              </Text>
            </Box>
          )}

          {error.length > 0 && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text fontSize={4} color={theme.colors.text}>
                Oops. Seems to be an error with algolia.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default withTheme(CityAddScreen);
