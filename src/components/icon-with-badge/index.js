import React from 'react';
import {View, StyleSheet} from 'react-native';
// State
import {useApp} from 'store';
// Icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const IconWithBadge = ({MainIcon}) => {
  const {state} = useApp();
  const {thereIsNewData} = state;
  const shouldHide = !thereIsNewData;
  return (
    <View>
      {MainIcon}
      {!shouldHide && (
        <View style={[styles.IconBadge, {backgroundColor: 'red'}]}>
          <MaterialIcon name="spa" size={12} color="red" />
        </View>
      )}
    </View>
  );
};

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

export default IconWithBadge;
