import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const S = StyleSheet.create({
  container: {flexDirection: 'row', height: 52, elevation: 2},
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const BottomTabBar = props => {
  const {
    renderIcon,
    getLabelText,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;
  return (
    <View style={StyleSheet.flatten([S.container, {backgroundColor: '#333'}])}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        // const tintColor = isRouteActive
        //   ? theme.colors.text
        //   : theme.colors.inactiveText;
        const tintColor = 'white';

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            {renderIcon({
              route,
              focused: isRouteActive,
              tintColor: tintColor,
            })}

            <Text style={{color: tintColor, fontSize: 12, marginTop: 8}}>
              {getLabelText({route})}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
