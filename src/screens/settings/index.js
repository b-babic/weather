import React, {Component, useCallback} from 'react';
import {ScrollView, Switch, Dimensions, ToastAndroid} from 'react-native';
// Store
import {inject, observer} from 'mobx-react';
// Components
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Icons
import Icon from 'react-native-vector-icons/Feather';
// Theme
import {withTheme} from 'hocs';
// Dimensions
const {width, height} = Dimensions.get('screen');
// Get app data from app.json
const appData = require('../../../app.json');

@inject('uiStore')
@observer
class SettingsScreen extends Component {
  _navigateBack = () => {
    console.warn('goback');
  };
  //TODO: If time, extract this into separate component (using on almost all of the screens)
  renderHeader = () => {
    const {theme} = this.props;
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        height={height * 0.1}
        width={width}
        px="2">
        <Box flex={1}>
          <Touchable onPress={this._navigateBack}>
            <Icon
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
            <Icon
              name="search"
              color={theme.colors.text}
              size={theme.fontSizes[4]}
            />
          </Touchable>
        </Box>
      </Box>
    );
  };

  _memoizedThemeToggle = () => {
    this.props.uiStore.toggleThemeVariant();
  };

  render() {
    const {theme} = this.props;
    const {themeVariant} = this.props.uiStore;
    return (
      <Box flex={1} bg={theme.colors.bg}>
        {this.renderHeader()}
        <ScrollView>
          <Box flex={1} flexDirection="column" mx="3" mb="5">
            <Box mb="3">
              <Text fontSize="3" color={theme.colors.title}>
                Application info
              </Text>
            </Box>
            <Box justifyContent="flex-end">
              <Box
                mb="2"
                pt="1"
                pb="2"
                borderBottom={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text color={theme.colors.subtitle}>Name</Text>
                <Text color={theme.colors.text}>{appData['name']}</Text>
              </Box>
              <Box
                mb="2"
                pt="1"
                pb="2"
                borderBottom={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text color={theme.colors.subtitle}>Author</Text>
                <Text color={theme.colors.text}>{appData['author']}</Text>
              </Box>
              <Box
                pt="1"
                pb="2"
                borderBottom={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text color={theme.colors.subtitle}>Version</Text>
                <Text color={theme.colors.text}>{appData['version']}</Text>
              </Box>
            </Box>
          </Box>

          <Box flex={1} flexDirection="column" mx="3" mb="3">
            <Box mb="2">
              <Text color={theme.colors.title} fontSize="3">
                Bottom bar
              </Text>
            </Box>
            <Box
              pt="1"
              pb="2"
              borderBottom={0}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text color={theme.colors.subtitle}>Light Theme</Text>
              <Switch
                thumbColor={theme.colors.yellow['400']}
                value={themeVariant !== 'light'}
                onValueChange={this._memoizedThemeToggle}
              />
            </Box>
          </Box>
        </ScrollView>
      </Box>
    );
  }
}

export default withTheme(SettingsScreen);
