import React, {PureComponent} from 'react';
import {Dimensions} from 'react-native';
// Router actions
import {Actions} from 'react-native-router-flux';
// Primitives
import {Box, Text, Touchable} from 'primitives';
// Theme
import {withTheme} from 'hocs';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Dimensions
const {width, height} = Dimensions.get('screen');

class PageHeader extends PureComponent {
  _goBack = () => {
    Actions.pop();
  };

  render() {
    const {theme, title} = this.props;
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
          <Touchable onPress={this._goBack}>
            <MaterialCommunityIcon
              name="arrow-left"
              size={theme.fontSizes[4]}
              color={theme.colors.text}
            />
          </Touchable>
        </Box>

        <Box flex={1} alignItems="center">
          <Text fontSize={2} color={theme.colors.text}>
            {title}
          </Text>
        </Box>
      </Box>
    );
  }
}

export default withTheme(PageHeader);
