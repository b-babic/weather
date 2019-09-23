import React, {Component} from 'react';
import {ScrollView, Switch, Dimensions} from 'react-native';
// Store
import {inject, observer} from 'mobx-react';
// Components
import {PageHeader} from 'components';
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

  _memoizedThemeToggle = () => {
    this.props.uiStore.toggleThemeVariant();
  };

  render() {
    const {theme} = this.props;
    const {themeVariant} = this.props.uiStore;
    return (
      <Box flex={1} bg={theme.colors.bg}>
        <PageHeader title="Settings" />
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
