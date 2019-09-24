import React from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// Primitives
import Box, {getStyleSheetFromBoxProps} from '../box';
// Hooks
import {useTheme} from 'hooks';

const Feedback = {
  opacity: 'opacity',
  highlight: 'highlight',
  none: 'none',
};

const Touchable = ({children, style, ...props}) => {
  if (React.Children.count(children) > 1) {
    throw new Error('Touchable expects one single React element as children');
  }

  const theme = useTheme();

  if (
    props.native &&
    props.feedback !== Feedback.none &&
    Platform.OS === 'android'
  ) {
    return (
      <TouchableNativeFeedback {...props}>
        <Box style={[getStyleSheetFromBoxProps(props, theme).box, style]}>
          {children}
        </Box>
      </TouchableNativeFeedback>
    );
  }

  switch (props.feedback) {
    case Feedback.Highlight:
      return (
        <TouchableHighlight
          style={[getStyleSheetFromBoxProps(props, theme).box, style]}
          {...props}>
          {children}
        </TouchableHighlight>
      );
    case Feedback.Opacity:
      return (
        <TouchableOpacity
          style={[getStyleSheetFromBoxProps(props, theme).box, style]}
          {...props}>
          {children}
        </TouchableOpacity>
      );
    case Feedback.None:
      return (
        <TouchableWithoutFeedback {...props}>
          <Box style={[getStyleSheetFromBoxProps(props, theme).box, style]}>
            {children}
          </Box>
        </TouchableWithoutFeedback>
      );
    default:
      throw new Error('Touchable expects a known feedback type');
  }
};

Touchable.defaultProps = {
  feedback: Feedback.opacity,
  native: true,
};

export default Touchable;
