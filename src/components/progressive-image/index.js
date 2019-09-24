import React from 'react';
import {StyleSheet, Image, Animated} from 'react-native';
// Primitives
import {Box} from 'primitives';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);
  render() {
    const {thumbnailSource, source, style, ...props} = this.props;
    return (
      <Box style={styles.container}>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={style}
          blurRadius={2}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, style]}
        />
      </Box>
    );
  }
}
export default ProgressiveImage;
