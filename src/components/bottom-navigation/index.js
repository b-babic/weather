import React, {PureComponent} from 'react';
// Router
import {Actions} from 'react-native-router-flux';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Components
import {TabIcon} from 'components';
// Hocs
import {withTheme} from 'hocs';
// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class BottomNavigation extends PureComponent {
  _handleIconName = index => {
    switch (index) {
      case 0:
        return 'weather-hail';
      case 1:
        return 'playlist-plus';
      case 2:
        return 'map-marker-plus';
      case 3:
        return 'cellphone-settings-variant';
      default:
        return null;
    }
  };
  render() {
    const {state} = this.props.navigation;
    const activeTabIndex = state.index;
    const {theme} = this.props;

    return (
      <Box
        py={2}
        flexDirection="row"
        justifyContent="space-around"
        bg={theme.colors.bg}
        style={{borderTopWidth: 1, borderTopColor: theme.colors.inactiveText}}>
        {state.routes.map((element, index) => {
          const isActive = activeTabIndex === index;
          return (
            <Touchable key={element.key} onPress={() => Actions[element.key]()}>
              <Box alignItems="center">
                <TabIcon
                  icon={this._handleIconName(index)}
                  focused={isActive}
                  tintColor={
                    isActive
                      ? theme.colors.activeIcon
                      : theme.colors.inactiveText
                  }
                />
                <Text
                  color={
                    isActive
                      ? theme.colors.activeIcon
                      : theme.colors.inactiveText
                  }>
                  {element.key}
                </Text>
              </Box>
            </Touchable>
          );
        })}
      </Box>
    );
  }
}
export default withTheme(BottomNavigation);
