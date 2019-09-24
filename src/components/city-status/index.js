import React from 'react';
// Primitives
import {Box} from 'primitives';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// Theme
import {useTheme} from 'hooks';

const CityStatus = ({isActive}) => {
  const theme = useTheme();
  const iconColor = isActive
    ? theme.colors.activeIcon
    : theme.colors.inactiveIcon;

  return (
    <Box>
      <MaterialCommunityIcon name="marker-check" size={16} color={iconColor} />
    </Box>
  );
};

export default CityStatus;
