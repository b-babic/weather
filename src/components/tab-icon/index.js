import React, {Component} from 'react';
// Components
import {IconWithBadge} from 'components';
// Hocs
import {withTheme} from 'hocs';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class TabIcon extends Component {
  render() {
    const isHomeScreen = icon === 'weather-hail';
    const {icon, theme, focused} = this.props;
    const tintColor = focused
      ? theme.colors.activeText
      : theme.colors.inactiveText;
    if (!isHomeScreen) {
      return <MaterialCommunityIcon color={tintColor} size={24} name={icon} />;
    } else {
    }
    return (
      <IconWithBadge
        MainIcon={
          <MaterialCommunityIcon name={icon} size={24} color={tintColor} />
        }
      />
    );
  }
}

export default withTheme(TabIcon);
