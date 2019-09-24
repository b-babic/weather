// @flow
import React from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
// Primitives
// import {Text, Touchable} from 'primitives';
// import {useTheme} from 'hooks';
// Dimensions
const {width, height} = Dimensions.get('screen');

const FallbackComponent = props => {
  //   const theme = useTheme();
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={require('assets/images/access-denied.png')}
          style={imageStyles}
        />
        {/* <Text fontSize={14} letterSpacing={1}>
          Opps.Something went wrong!
        </Text> */}
        <Text>Oops</Text>
        {/* {props.error && <Text fontSize={14}>{props.error.toString()}</Text>}
        <Touchable
          onPress={props.resetError}
          justifyContent="center"
          alignItems="center"
          bg={theme.colors.yellow['600']}
          p={3}>
          <Text fontSize={2} color={theme.colors.yellow['300']}>
            Try again
          </Text>
        </Touchable> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const imageStyles = StyleSheet.create({
  width: width,
  height: height / 3,
});

export default FallbackComponent;
