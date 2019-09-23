import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
// State
import {inject, observer} from 'mobx-react';
// Theme
import {withTheme} from 'hocs';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

@inject('uiStore')
@observer
class IconWithBadge extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const theme = this.props;
    const {MainIcon} = this.props;
    const {hasNewData} = this.props.uiStore;
    return (
      <View>
        {MainIcon}
        {hasNewData && (
          <View
            style={
              (styles.IconBadge, {backgroundColor: theme.colors.red['400']})
            }>
            <MaterialCommunityIcon
              name="bell-ring"
              size={12}
              color={theme.colors.red['600']}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: -1,
    right: -10,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(IconWithBadge);
